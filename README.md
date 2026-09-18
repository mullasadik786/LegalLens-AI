# LegalLens AI — Legal Document Intelligence Platform

> **Turn Legal Complexity into Clarity.**  
> An AI-powered legal document intelligence platform designed to parse, explain, audit, and compare legal agreements with source-grounded evidence, strict safety guardrails, and consultation dossiers.

---

## 🌟 Overview

Legal agreements are notoriously opaque, dense, and risky to navigate without structured analysis. **LegalLens AI** transforms lengthy contracts into actionable, evidence-backed intelligence. It extracts key obligations, visualizes decision paths, tracks deadlines, highlights high-risk terms, and prepares structured briefs for legal counsel.

---

## 🚀 Key Features

### 1. 🧠 Document X-Ray & Executive Briefing
- **Core Answers Instantly**: Surfaces document classification, governing parties, business purpose, financial terms, and termination conditions.
- **Attention Items Radar**: Highlights critical clauses warranting professional review, categorized by risk level with exact page and section citations.

### 2. 🔍 Interactive Clause Explorer & Radar
- **Plain-Language Explanations**: Side-by-side view comparing raw legal provisions against clear, plain-language summaries.
- **Radial Clause Radar**: Visual density chart mapping contractual provisions across 8 dimensions (Payment, Obligations, Termination, IP, Confidentiality, Restrictions, Dispute Resolution, and Deadlines).

### 3. 🗺️ Legal Decision Map
- **Interactive Graph Visualizer**: Maps the lifecycle of the agreement from Execution through Performance, Milestones, and Dispute Resolution.
- **Node Dependency Inspection**: Click any node to review prerequisites, governing rules, and potential failure conditions.

### 4. 💬 Evidence-Grounded AI Chat
- **Source-Grounded Answers**: Every AI answer cites the exact Page, Section, and Quoted Text from the source document.
- **Hallucination Safeguards**: Explicitly flags incomplete or missing evidence if a query falls outside the contract.
- **Prompt Injection Hardening**: Isolates untrusted uploaded text from instructions using strict delimiter sandboxing.

### 5. ⚖️ Deep Contract Compare (v1 vs v2)
- **Version Delta Cards**: Identifies additions, deletions, financial variance, and modified notice periods across contract revisions.
- **Side-by-Side Synchronized Diff**: Compare clauses between initial drafts and amended versions.

### 6. ⏰ Obligation Timeline & Action Plan
- **Chronological Milestones**: Tracks effective dates, deliverables, review cycles, and renewal deadlines.
- **Interactive Checkable Plan**: Categorized checklist for Obligations, Verifications, and Questions for Counsel.

### 7. 👨‍⚖️ Lawyer Consultation Brief & Export Center
- **One-Click Attorney Dossier**: Compiles high-risk terms, ambiguous language, and prioritized questions for legal counsel.
- **Multi-Format Export**: Download formal PDF reports (`jsPDF`), export clean Markdown, or copy formatted text to clipboard.

### 8. 🔐 Private Legal Vault & In-Browser Viewer
- **Client-Side Session Storage**: Keeps confidential files private and isolated.
- **Interactive Document Viewer**: Keyword search, zoom controls, and instant evidence highlighting.

### 9. 🌐 Multilingual Intelligence & Theming
- **Languages**: Full UI and analysis support for **English**, **Telugu (తెలుగు)**, and **Hindi (हिन्दी)**.
- **Themes**: Seamless toggle between **Light Theme** (clean, high-contrast stationery) and **Dark Theme** (deep twilight focus).

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS v4, Motion
- **Icons & Visuals**: Lucide React
- **Export & PDF**: jsPDF
- **Backend / API**: Node.js, Express, esbuild
- **AI Engine**: Google Gemini API (`@google/genai`)

---

## 🏁 Getting Started

### Prerequisites
- Node.js 18+ or 20+
- npm (or yarn / pnpm)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/legallens-ai.git
   cd legallens-ai
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy `.env.example` to `.env` and set your Gemini API key:
   ```bash
   cp .env.example .env
   ```
   Edit `.env`:
   ```env
   GEMINI_API_KEY=your_actual_gemini_api_key_here
   ```

4. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Production Build & Deployment

### Build the Application
```bash
npm run build
```
This compiles the Vite frontend into `dist/` and bundles the Express server into `dist/server.cjs`.

### Start Production Server
```bash
npm start
```

---

## ☁️ Deployment Guide

### Deploying to Render.com

1. Create a new **Web Service** on [Render](https://render.com).
2. Connect your repository.
3. Configure the following service settings:
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
4. Under **Environment Variables**, add:
   - `NODE_ENV` = `production`
   - `GEMINI_API_KEY` = *your API key*
5. Alternatively, deploy using the included `render.yaml` Blueprint file.

### Deploying to Docker / Cloud Run

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

---

## 🧪 Automated Testing Suite

LegalLens AI includes a comprehensive test suite using Vitest (covering security, RAG retrieval, PII sanitization, IDOR protection, diff comparison, and accessibility):

```bash
# Run the automated test suite
npm test
```

### Test Coverage Highlights
- **`tests/security.test.ts`**: Prompt injection detection, boundary delimiter escaping, PII redaction (SSN, emails, phones, credit cards), file size/MIME validation, and sliding-window rate limiting.
- **`tests/ragEngine.test.ts`**: Section-aware chunking, query relevance scoring, and citation verification against document text.
- **`tests/documentStore.test.ts`**: Session-scoped document isolation and IDOR defense.
- **`tests/accessibility.test.ts`**: WCAG 2.2 AA contrast ratios (> 4.5:1), ARIA live regions, and 44px minimum touch targets.
- **`tests/diffEngine.test.ts`**: Clause comparison and risk shift detection.

---

## 🛡️ Security, Privacy & Safety Architecture

- **Strict IDOR Defense**: Documents are isolated per session/user ID in memory; cross-tenant document queries are strictly rejected with 403 Forbidden.
- **Prompt Injection Sandboxing**: Untrusted document text is fenced in `<UNTRUSTED_DOCUMENT_CONTENT>` tags with boundary tag escaping and adversarial phrase detection.
- **PII Redaction Engine**: Built-in redaction masks SSNs, phone numbers, email addresses, and credit card numbers before processing.
- **Sliding-Window Rate Limiting**: In-memory rate limiting prevents API abuse and denial-of-service attempts.
- **HTTP Security Headers**: Strict CSP, X-Content-Type-Options: nosniff, X-Frame-Options: SAMEORIGIN, and Referrer-Policy.
- **Evidence Verification**: AI responses are verified against exact source document page numbers and quotation snippets.
- **Human-in-the-Loop Safeguards**: Persistent disclaimers and explicit reminders that LegalLens AI provides educational document intelligence, not legal advice or attorney representation.

---

## 📄 License

This project is licensed under the MIT License.

