import { Request, Response, NextFunction } from 'express';

// ==========================================
// 1. IN-MEMORY SLIDING-WINDOW RATE LIMITER
// ==========================================
interface RateLimitRecord {
  timestamps: number[];
}

const rateLimitStore = new Map<string, RateLimitRecord>();

export function createRateLimiter(options: {
  windowMs: number;
  maxRequests: number;
  endpointName: string;
}) {
  return (req: Request, res: Response, next: NextFunction) => {
    // Generate client key using IP and optional session header
    const ip = req.ip || req.socket.remoteAddress || '127.0.0.1';
    const key = `${options.endpointName}:${ip}`;
    const now = Date.now();
    const windowStart = now - options.windowMs;

    let record = rateLimitStore.get(key);
    if (!record) {
      record = { timestamps: [] };
      rateLimitStore.set(key, record);
    }

    // Filter out timestamps outside window
    record.timestamps = record.timestamps.filter((ts) => ts > windowStart);

    if (record.timestamps.length >= options.maxRequests) {
      const retryAfterSeconds = Math.ceil((record.timestamps[0] + options.windowMs - now) / 1000);
      res.setHeader('Retry-After', retryAfterSeconds);
      return res.status(429).json({
        success: false,
        error: {
          code: 'RATE_LIMIT_EXCEEDED',
          message: `Too many requests to ${options.endpointName}. Please wait ${retryAfterSeconds} seconds before retrying.`
        }
      });
    }

    record.timestamps.push(now);
    next();
  };
}

// Reset rate limits for testing
export function clearRateLimits() {
  rateLimitStore.clear();
}

// ==========================================
// 2. HTTP SECURITY HEADERS MIDDLEWARE
// ==========================================
export function securityHeadersMiddleware(req: Request, res: Response, next: NextFunction) {
  // Prevent MIME type sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');
  
  // Prevent clickjacking within foreign frames, allow local iframe
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  
  // Restrict referrer information
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Block access to sensitive browser features
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  
  // Content Security Policy permitting Vite and application needs
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
    "font-src 'self' https://fonts.gstatic.com data:; " +
    "img-src 'self' data: https: blob:; " +
    "connect-src 'self' https: ws: wss:;"
  );

  next();
}

// ==========================================
// 3. FILE UPLOAD VALIDATION & SECURITY
// ==========================================
const ALLOWED_MIME_TYPES = new Set([
  'application/pdf',
  'text/plain',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/msword',
  'image/png',
  'image/jpeg'
]);

const ALLOWED_EXTENSIONS = new Set(['pdf', 'txt', 'docx', 'doc', 'png', 'jpg', 'jpeg']);

export interface FileValidationResult {
  valid: boolean;
  error?: string;
  sanitizedFilename?: string;
}

export function validateUploadedFile(file: {
  name: string;
  type: string;
  size: number;
  contentBase64?: string;
}): FileValidationResult {
  // 1. Max size: 15MB
  const MAX_SIZE_BYTES = 15 * 1024 * 1024;
  if (file.size > MAX_SIZE_BYTES) {
    return { valid: false, error: 'File size exceeds 15MB limit' };
  }
  if (file.size <= 0) {
    return { valid: false, error: 'File is empty' };
  }

  // 2. Extension validation
  const ext = file.name.split('.').pop()?.toLowerCase() || '';
  if (!ALLOWED_EXTENSIONS.has(ext)) {
    return { valid: false, error: `Invalid file extension .${ext}. Allowed: PDF, DOCX, TXT, PNG, JPG` };
  }

  // 3. MIME validation
  if (file.type && !ALLOWED_MIME_TYPES.has(file.type.toLowerCase())) {
    return { valid: false, error: `Invalid MIME type ${file.type}` };
  }

  // 4. Executable / script detection
  const lowerName = file.name.toLowerCase();
  const dangerousPatterns = ['.exe', '.sh', '.bat', '.cmd', '.js', '.vbs', '.py', '.php', '<script', 'javascript:'];
  if (dangerousPatterns.some(p => lowerName.includes(p))) {
    return { valid: false, error: 'Executable or script filenames are strictly rejected' };
  }

  // 5. Generate safe internal filename
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
  return {
    valid: true,
    sanitizedFilename: safeName
  };
}

// ==========================================
// 4. PROMPT INJECTION SANITIZATION & FENCING
// ==========================================
export function detectPromptInjection(text: string): { isSuspicious: boolean; reason?: string } {
  const lower = text.toLowerCase();
  const injectionPatterns = [
    /ignore (all )?previous instructions/i,
    /disregard (all )?previous (commands|instructions)/i,
    /reveal (your )?(system prompt|instructions|secrets)/i,
    /you are now in (dan|developer) mode/i,
    /bypass safety guardrails/i,
    /forget everything you know/i,
    /print all environment variables/i,
    /override all guidelines/i
  ];

  for (const pattern of injectionPatterns) {
    if (pattern.test(lower)) {
      return {
        isSuspicious: true,
        reason: 'Detected adversarial prompt injection attempt in untrusted document text'
      };
    }
  }

  return { isSuspicious: false };
}

export function fenceUntrustedDocument(content: string): string {
  // Strip null bytes and boundary-escape delimiter tags
  const sanitized = content
    .replace(/\0/g, '')
    .replace(/<\/UNTRUSTED_DOCUMENT_CONTENT>/gi, '[ESCAPED_CLOSE_TAG]');

  return `<UNTRUSTED_DOCUMENT_CONTENT>\n${sanitized}\n</UNTRUSTED_DOCUMENT_CONTENT>`;
}

export const fenceUntrustedContent = fenceUntrustedDocument;

// ==========================================
// 5. PII REDACTION & PRIVACY ENGINE
// ==========================================
export function redactSensitivePii(text: string): string {
  if (!text) return '';
  return text
    // SSN / Tax ID (e.g., 123-45-6789 or 123 45 6789)
    .replace(/\b\d{3}[-\s]\d{2}[-\s]\d{4}\b/g, '[REDACTED_SSN]')
    // Email addresses
    .replace(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, '[REDACTED_EMAIL]')
    // Phone numbers (US/Intl formats)
    .replace(/\b(\+?1[-.\s]?)?(\(?\d{3}\)?[-.\s]?)\d{3}[-.\s]?\d{4}\b/g, '[REDACTED_PHONE]')
    // Credit card numbers (standard 13-16 digit formats with hyphens/spaces)
    .replace(/\b(?:\d{4}[-\s]?){3}\d{4}\b/g, '[REDACTED_CARD]');
}

// Default rate limiter for tests and general use
export const rateLimitMiddleware = createRateLimiter({
  windowMs: 60 * 1000,
  maxRequests: 30,
  endpointName: 'GeneralApi'
});

