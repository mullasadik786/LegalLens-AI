import { LegalDocument, ComparisonDiff } from '../types/legal';

export const DEMO_DOCUMENT_V1: LegalDocument = {
  id: 'doc-acme-v1',
  title: 'Acme Technologies — Sample Employment Agreement',
  filename: 'Acme_Technologies_Employment_Agreement_v1.pdf',
  fileSize: '1.8 MB',
  documentType: 'Employment Agreement',
  uploadedAt: 'Sep 18, 2026',
  pageCount: 8,
  sectionsCount: 14,
  clausesCount: 18,
  obligationsCount: 13,
  datesCount: 8,
  paymentsCount: 6,
  questionsCount: 9,
  isDemo: true,
  overview: {
    title: 'Acme Technologies — Sample Employment Agreement',
    documentType: 'Employment Agreement',
    parties: ['Acme Technologies Inc. (Employer)', 'Alex Mercer (Employee)'],
    effectiveDate: 'October 1, 2026',
    expirationDate: 'Indefinite (At-Will subject to Section 8)',
    governingLaw: 'State of California, United States',
    documentLanguage: 'English (US)',
  },
  executiveSummary: {
    whatIsThis: 'A full-time employment agreement establishing terms of employment for Senior Software Systems Architect.',
    parties: 'Acme Technologies Inc. (Delaware Corporation) and Alex Mercer (Resident of San Francisco, CA).',
    purpose: 'To define job duties, compensation, intellectual property assignment, confidentiality obligations, and termination protocols.',
    obligations: 'The employee agrees to devote full business time, protect company trade secrets, assign patentable inventions created during employment, and adhere to company code of conduct.',
    financialTerms: 'Base annual salary of $125,000 paid bi-weekly, eligible for discretionary annual performance bonus up to 15%, plus standard medical and retirement benefits.',
    importantDates: 'Effective Date: October 1, 2026. First 90-day review: December 31, 2026. Annual compensation review: September 15 annually.',
    termination: 'Either party may terminate employment at any time with 30 days written notice pursuant to Section 8.2, or immediately by employer for Cause under Section 8.1.',
    reviewCarefully: 'Section 6 (IP Assignment), Section 7.2 (Post-employment non-solicitation scope of 12 months), and Section 8.2 (Early termination notification requirements).',
  },
  rawPages: [
    {
      pageNumber: 1,
      content: `FICTIONAL DEMO DOCUMENT — FOR DEMONSTRATION PURPOSES ONLY

EMPLOYMENT AGREEMENT

THIS EMPLOYMENT AGREEMENT (the "Agreement") is made and entered into as of October 1, 2026 (the "Effective Date"), by and between:

ACME TECHNOLOGIES INC., a Delaware corporation with primary offices at 100 Innovation Way, Suite 400, San Francisco, CA 94105 ("Company" or "Employer"),

and

ALEX MERCER, an individual residing in San Francisco, California ("Employee").

RECITALS
WHEREAS, Company desires to retain Employee in the capacity of Senior Systems Architect, and Employee desires to accept such employment under the terms, conditions, and covenants hereinafter set forth;

NOW, THEREFORE, in consideration of the mutual covenants herein contained and other good and valuable consideration, the parties agree as follows:

SECTION 1. POSITION AND DUTIES
1.1 Position: Employee shall serve as Senior Systems Architect reporting directly to the Vice President of Engineering.
1.2 Devotion of Time: Employee agrees to devote full business time, attention, skill, and best efforts to the faithful performance of duties. Outside commercial activities require prior written authorization.`
    },
    {
      pageNumber: 2,
      content: `SECTION 2. TERM OF EMPLOYMENT
2.1 Term: Employment commences on the Effective Date (October 1, 2026) and continues until terminated in accordance with Section 8 of this Agreement.
2.2 At-Will Relationship: Subject to the notice requirements set forth herein, employment is at-will under applicable statutory guidelines.

SECTION 3. COMPENSATION AND BENEFITS
3.1 Base Salary: Employer shall pay Employee a base salary of $125,000.00 USD per annum, payable in accordance with Company standard bi-weekly payroll practices, less lawful statutory deductions and tax withholdings.
3.2 Discretionary Bonus: Employee shall be eligible to participate in the Company Annual Incentive Bonus Plan, with a target incentive of 15% of annual base salary, subject to individual and corporate milestone achievements as determined by the Board of Directors.
3.3 Benefits Package: Employee is entitled to standard group health insurance, 401(k) retirement matching up to 4%, and 20 days of Paid Time Off (PTO) per calendar year.`
    },
    {
      pageNumber: 3,
      content: `SECTION 4. BUSINESS EXPENSES AND REIMBURSEMENT
4.1 Legitimate Business Expenses: Company shall promptly reimburse Employee for all reasonable and necessary travel and entertainment expenses incurred in connection with the performance of duties.
4.2 Documentation: Receipts and expense reports must be submitted within 30 days of incurring the expense pursuant to standard finance department travel policies.

SECTION 5. PROPRIETARY INFORMATION AND CONFIDENTIALITY
5.1 Definition of Confidential Information: "Confidential Information" includes all proprietary software code, architecture diagrams, training weights, client lists, business strategies, and unannounced product roadmaps.
5.2 Non-Disclosure: Employee covenants not to disclose, duplicate, reverse engineer, or transmit any Confidential Information to any third party during or subsequent to employment without explicit written consent.
5.3 Survival: These confidentiality covenants shall survive the expiration or earlier termination of this Agreement for a period of five (5) years, except trade secrets which shall remain protected indefinitely.`
    },
    {
      pageNumber: 4,
      content: `SECTION 6. INTELLECTUAL PROPERTY RIGHTS AND INVENTIONS
6.1 Inventions Assignment: Employee acknowledges that all ideas, algorithms, designs, patents, software modules, and works of authorship created during employment that relate directly to Company business or utilize Company resources constitute "Work Made For Hire" and are the sole property of Acme Technologies Inc.
6.2 Prior Inventions: Inventions developed entirely on personal time without use of Company equipment, supplies, or facilities, and which do not relate to Company current or contemplated business, are excluded pursuant to California Labor Code Section 2870.
6.3 Power of Attorney: Employee hereby irrevocably designates and appoints Company and its authorized officers as Employee's agent and attorney-in-fact to execute documents securing patent and copyright protection.`
    },
    {
      pageNumber: 5,
      content: `SECTION 7. RESTRICTIVE COVENANTS
7.1 Non-Compete Scope: During employment, Employee will not directly or indirectly engage in or assist any business enterprise that directly competes with Company primary software offerings.
7.2 Non-Solicitation of Personnel: For a period of twelve (12) months immediately following the termination of employment, Employee shall not solicit, recruit, or entice away any current employee or full-time contractor of Company.
7.3 Non-Solicitation of Customers: Employee shall not divert or attempt to divert any active client with whom Employee had direct business interaction during the prior twelve (12) months.`
    },
    {
      pageNumber: 6,
      content: `SECTION 8. TERMINATION OF EMPLOYMENT
8.1 Termination for Cause: Company may terminate Employee's employment immediately without advance notice for "Cause," defined as:
(a) conviction of a felony or crime involving moral turpitude;
(b) gross negligence or willful misconduct causing material financial harm to Company;
(c) material failure to perform assigned duties after 15 days written cure notice.

8.2 Voluntary Resignation or Termination Without Cause: Either party may terminate this Agreement without cause at any time by delivering thirty (30) days prior written notice to the other party.
8.3 Severance in Lieu of Notice: In the event Company elects to terminate without cause, Company may, in its sole discretion, elect to pay thirty (30) days base salary in lieu of requiring active service during the notice period.`
    },
    {
      pageNumber: 7,
      content: `SECTION 8.2 TERMINATION PROCEDURE DETAILS
Section 8.2 (Continued):
"The fictional agreement describes an early-termination process in Section 8.2. It requires written notice under the conditions stated in that section. Either party may terminate by providing thirty (30) days written notice. In the event the Employee terminates early, all Company hardware, cryptographic keys, access tokens, and confidential records must be returned within forty-eight (48) hours of the final active date."

SECTION 9. DISPUTE RESOLUTION AND ARBITRATION
9.1 Mandatory Arbitration: Any dispute, claim, or controversy arising out of or relating to this Agreement, including breach or validity, shall be submitted to final and binding arbitration administered by the American Arbitration Association (AAA) in San Francisco, California.
9.2 Waiver of Class Actions: To the fullest extent permitted by law, arbitration shall proceed solely on an individual basis.`
    },
    {
      pageNumber: 8,
      content: `SECTION 10. GENERAL PROVISIONS
10.1 Governing Law: This Agreement shall be governed by, construed, and enforced in accordance with the laws of the State of California, without regard to conflicts of law principles.
10.2 Entire Agreement: This Agreement constitutes the entire understanding between the parties, superseding all prior oral or written discussions, representations, or draft term sheets.
10.3 Severability: If any provision is deemed unenforceable, the remaining provisions shall continue in full force and effect.

IN WITNESS WHEREOF, the parties hereto have executed this Agreement as of the date first written above.

ACME TECHNOLOGIES INC.
By: /s/ Marcus Vance
Title: Chief Technology Officer

EMPLOYEE
By: /s/ Alex Mercer
Alex Mercer, Senior Systems Architect`
    }
  ],
  clauses: [
    {
      id: 'c-1',
      category: 'Payment',
      title: 'Base Salary and Pay Cadence',
      originalText: 'Employer shall pay Employee a base salary of $125,000.00 USD per annum, payable in accordance with Company standard bi-weekly payroll practices, less lawful statutory deductions and tax withholdings.',
      plainLanguage: {
        en: 'You receive a guaranteed base annual pay of $125,000 distributed every two weeks through payroll.',
        te: 'మీకు ప్రతి రెండు వారాలకు ఒకసారి చెల్లించబడే వార్షిక హామీ వేతనం $125,000 అందుతుంది.',
        hi: 'आपको प्रति दो सप्ताह में वितरित $125,000 का वार्षिक मूल वेतन देय होगा।'
      },
      whyItMatters: 'Establishes baseline guaranteed compensation before bonus eligibility and deduction withholdings.',
      sourcePage: 2,
      sourceSection: 'Section 3.1',
      questionsToConsider: [
        'Is the salary reviewed on a fixed annual schedule or tied to performance milestones?',
        'Are there specific conditions under which bi-weekly pay schedules may alter?'
      ],
      attentionType: 'Important Provision'
    },
    {
      id: 'c-2',
      category: 'Payment',
      title: 'Annual Discretionary Bonus Target',
      originalText: 'Employee shall be eligible to participate in the Company Annual Incentive Bonus Plan, with a target incentive of 15% of annual base salary, subject to individual and corporate milestone achievements as determined by the Board of Directors.',
      plainLanguage: {
        en: 'You may receive an annual bonus of up to 15% of base salary ($18,750), but it is discretionary based on company and individual goals.',
        te: 'మీరు కంపెనీ మరియు వ్యక్తిగత లక్ష్యాల ఆధారంగా మూల వేతనంలో 15% వరకు వార్షిక బోనస్ పొందవచ్చు, అయితే ఇది విచక్షణాపరమైనది.',
        hi: 'कंपनी और व्यक्तिगत लक्ष्यों के आधार पर आप मूल वेतन के 15% तक का वार्षिक बोनस प्राप्त करने के पात्र हैं, लेकिन यह विवेकाधीन है।'
      },
      whyItMatters: 'Bonus is designated as discretionary rather than formulaic or guaranteed.',
      sourcePage: 2,
      sourceSection: 'Section 3.2',
      questionsToConsider: [
        'What specific metrics or milestones determine bonus payout calculations?',
        'Must the employee be actively employed on the payout date to receive earned bonuses?'
      ],
      attentionType: 'Potential Ambiguity'
    },
    {
      id: 'c-3',
      category: 'Termination',
      title: 'Early Termination and Notice Period',
      originalText: 'Either party may terminate this Agreement without cause at any time by delivering thirty (30) days prior written notice to the other party. In the event the Employee terminates early, all Company hardware, cryptographic keys, access tokens, and confidential records must be returned within forty-eight (48) hours of the final active date.',
      plainLanguage: {
        en: 'Either you or the company can end the contract at any time for any reason by giving 30 days written notice. You must return all company gear within 48 hours.',
        te: 'మీరు లేదా కంపెనీ ఎప్పుడైనా 30 రోజుల లిఖితపూర్వక నోటీసు ఇవ్వడం ద్వారా ఒప్పందాన్ని ముగించవచ్చు. 48 గంటల్లో అన్ని పరికరాలను తిరిగి ఇవ్వాలి.',
        hi: 'आप या कंपनी 30 दिनों का लिखित नोटिस देकर किसी भी समय अनुबंध समाप्त कर सकते हैं। 48 घंटों के भीतर सभी उपकरण लौटाने होंगे।'
      },
      whyItMatters: 'Sets the required exit transition timeline and mandatory property return window.',
      sourcePage: 7,
      sourceSection: 'Section 8.2',
      questionsToConsider: [
        'Does the company require active attendance during the 30-day notice window or offer garden leave?',
        'How does notice submission affect unvested incentives or accrued PTO payout?'
      ],
      attentionType: 'Needs Attention'
    },
    {
      id: 'c-4',
      category: 'Intellectual Property',
      title: 'Inventions and Work Made For Hire',
      originalText: 'Employee acknowledges that all ideas, algorithms, designs, patents, software modules, and works of authorship created during employment that relate directly to Company business or utilize Company resources constitute "Work Made For Hire" and are the sole property of Acme Technologies Inc.',
      plainLanguage: {
        en: 'Everything code or system design you create using company equipment or related to company business belongs 100% to Acme Technologies.',
        te: 'కంపెనీ పరికరాలను ఉపయోగించి లేదా కంపెనీ వ్యాపారానికి సంబంధించి మీరు అభివృద్ధి చేసిన సాఫ్ట్‌వేర్ అంతా ఆక్మే యాజమాన్యానికి చెందుతుంది.',
        hi: 'कंपनी के उपकरणों का उपयोग करके या कंपनी के काम से संबंधित आपके द्वारा बनाया गया कोई भी कोड पूरी तरह से कंपनी का होगा।'
      },
      whyItMatters: 'Broad IP assignment could impact open-source contributions or side projects unless clearly carved out.',
      sourcePage: 4,
      sourceSection: 'Section 6.1',
      questionsToConsider: [
        'Are there existing personal side projects or pre-existing inventions that need to be explicitly listed on Schedule A?',
        'Does the IP assignment cover personal open source software projects developed on weekends?'
      ],
      attentionType: 'Professional Review'
    },
    {
      id: 'c-5',
      category: 'Confidentiality',
      title: 'Confidentiality Scope and 5-Year Survival',
      originalText: 'These confidentiality covenants shall survive the expiration or earlier termination of this Agreement for a period of five (5) years, except trade secrets which shall remain protected indefinitely.',
      plainLanguage: {
        en: 'You cannot share company secret information for 5 years after leaving; core trade secrets must be protected forever.',
        te: 'కంపెనీని విడిచిపెట్టిన తర్వాత 5 సంవత్సరాల పాటు రహస్య సమాచారాన్ని బయటకు చెప్పకూడదు; వాణిజ్య రహస్యాలు ఎప్పటికీ రక్షించబడాలి.',
        hi: 'कंपनी छोड़ने के बाद 5 साल तक गोपनीय जानकारी साझा नहीं की जा सकती; ट्रेड सीक्रेट्स को हमेशा सुरक्षित रखना होगा।'
      },
      whyItMatters: 'Extends employee confidentiality liability five years beyond employment tenure.',
      sourcePage: 3,
      sourceSection: 'Section 5.3',
      questionsToConsider: [
        'How does this 5-year restriction apply when discussing general architectural patterns in future roles?'
      ],
      attentionType: 'Important Provision'
    },
    {
      id: 'c-6',
      category: 'Restrictions',
      title: 'Non-Solicitation of Personnel (12 Months)',
      originalText: 'For a period of twelve (12) months immediately following the termination of employment, Employee shall not solicit, recruit, or entice away any current employee or full-time contractor of Company.',
      plainLanguage: {
        en: 'For 1 year after leaving, you cannot hire or recruit your former coworkers from Acme to your new company.',
        te: 'కంపెనీని విడిచిపెట్టిన 1 సంవత్సరం వరకు, మీరు మీ పూర్వ సహోద్యోగులను కొత్త కంపెనీకి చేరమని ప్రేరేపించలేరు.',
        hi: 'नौकरी छोड़ने के 1 साल तक, आप अपने पूर्व सहकर्मियों को अपनी नई कंपनी में शामिल होने के लिए नहीं बुला सकते।'
      },
      whyItMatters: 'Restricts hiring referrals and networking with colleagues after departing.',
      sourcePage: 5,
      sourceSection: 'Section 7.2',
      questionsToConsider: [
        'Does this restriction apply to general public job postings or only direct personalized recruitment?'
      ],
      attentionType: 'Needs Attention'
    },
    {
      id: 'c-7',
      category: 'Dispute Resolution',
      title: 'Mandatory Binding Arbitration & Class Action Waiver',
      originalText: 'Any dispute, claim, or controversy arising out of or relating to this Agreement, including breach or validity, shall be submitted to final and binding arbitration administered by the American Arbitration Association (AAA) in San Francisco, California.',
      plainLanguage: {
        en: 'Any legal disagreement must be solved through private binding arbitration in San Francisco rather than a public jury trial in court.',
        te: 'ఏదైనా చట్టపరమైన వివాదాన్ని కోర్టులో కాకుండా శాన్ ఫ్రాన్సిస్కోలో ప్రైవేట్ మధ్యవర్తిత్వం ద్వారా మాత్రమే పరిష్కరించుకోవాలి.',
        hi: 'किसी भी कानूनी विवाद को अदालत के बजाय सैन फ्रांसिस्को में निजी मध्यस्थता के माध्यम से हल किया जाना अनिवार्य है।'
      },
      whyItMatters: 'Waives right to jury court trial and collective class action litigation.',
      sourcePage: 7,
      sourceSection: 'Section 9.1',
      questionsToConsider: [
        'Who bears the filing and arbitration administrative fees under the AAA rules?'
      ],
      attentionType: 'Professional Review'
    },
    {
      id: 'c-8',
      category: 'Governing Law',
      title: 'Governing Law — California Jurisdiction',
      originalText: 'This Agreement shall be governed by, construed, and enforced in accordance with the laws of the State of California, without regard to conflicts of law principles.',
      plainLanguage: {
        en: 'California state law applies to the interpretation of this entire contract.',
        te: 'ఈ ఒప్పంద నియమాలకు కాలిఫోర్నియా రాష్ట్ర చట్టాలు వర్తిస్తాయి.',
        hi: 'इस पूरे अनुबंध के व्याख्या के लिए कैलिफोर्निया राज्य का कानून लागू होगा।'
      },
      whyItMatters: 'California law provides statutory protections regarding employee mobility and non-compete unenforceability.',
      sourcePage: 8,
      sourceSection: 'Section 10.1',
      questionsToConsider: [
        'How does California law interact with non-compete clauses in Section 7.1?'
      ],
      attentionType: 'Important Provision'
    }
  ],
  timeline: [
    {
      id: 't-1',
      dateString: '2026-10-01',
      title: 'Effective Date & Employment Commencement',
      description: 'Official first day of employment and start of benefits vesting period.',
      responsibleParty: 'Acme Technologies & Alex Mercer',
      sourcePage: 1,
      sourceSection: 'Section 1.1 / 2.1',
      status: 'milestone'
    },
    {
      id: 't-2',
      dateString: '2026-10-15',
      title: 'First Bi-Weekly Payroll Disbursement',
      description: 'Initial salary payment deposited pursuant to Section 3.1.',
      responsibleParty: 'Acme Payroll Operations',
      sourcePage: 2,
      sourceSection: 'Section 3.1',
      status: 'upcoming'
    },
    {
      id: 't-3',
      dateString: '2026-10-31',
      title: 'Prior Inventions Declaration Deadline',
      description: 'Deadline to file Schedule A list of pre-existing intellectual property to exclude from company assignment.',
      responsibleParty: 'Alex Mercer (Employee)',
      sourcePage: 4,
      sourceSection: 'Section 6.2',
      status: 'action_required'
    },
    {
      id: 't-4',
      dateString: '2026-12-31',
      title: '90-Day Initial Performance Milestone',
      description: 'End of probationary orientation window and first quarterly technical review.',
      responsibleParty: 'VP of Engineering',
      sourcePage: 2,
      sourceSection: 'Section 3.2',
      status: 'milestone'
    },
    {
      id: 't-5',
      dateString: '2027-09-15',
      title: 'Annual Compensation & Incentive Bonus Review',
      description: 'Evaluation of corporate and individual targets for 15% bonus calculation.',
      responsibleParty: 'Board of Directors & Management',
      sourcePage: 2,
      sourceSection: 'Section 3.2',
      status: 'upcoming'
    },
    {
      id: 't-6',
      dateString: '2027-10-01',
      title: 'One-Year Service Anniversary',
      description: 'Full vesting milestone for initial corporate benefit tiers and PTO rollover check.',
      responsibleParty: 'Alex Mercer',
      sourcePage: 2,
      sourceSection: 'Section 2.1',
      status: 'milestone'
    }
  ],
  attentionItems: [
    {
      id: 'att-1',
      level: 'Needs Attention',
      title: '30-Day Written Notice Requirement for Resignation',
      observation: 'Section 8.2 specifies a 30-day prior written notice period before voluntary resignation becomes effective.',
      reason: 'Standard notice in tech is frequently 14 days; a 30-day mandatory window may affect start dates for subsequent opportunities.',
      sourcePage: 7,
      sourceSection: 'Section 8.2',
      questionToConsider: 'Can the company waive the 30-day notice period or require you to stay active through the full duration?'
    },
    {
      id: 'att-2',
      level: 'Potential Ambiguity',
      title: 'Discretionary Bonus Criteria Lacks Numerical Thresholds',
      observation: 'Section 3.2 designates the 15% target bonus as purely discretionary without citing predefined performance KPIs.',
      reason: 'Discretionary language means bonuses cannot be legally enforced as guaranteed deferred wage payments under California law.',
      sourcePage: 2,
      sourceSection: 'Section 3.2',
      questionToConsider: 'Are the objective targets for corporate milestones documented in writing anywhere?'
    },
    {
      id: 'att-3',
      level: 'Professional Review',
      title: 'Broad IP Assignment and Open Source Activities',
      observation: 'Section 6.1 assigns all inventions and algorithms created during employment that utilize company resources or relate to business.',
      reason: 'Software engineers frequently write side utilities, tools, or contribute to open-source libraries that require formal prior written carve-outs.',
      sourcePage: 4,
      sourceSection: 'Section 6.1',
      questionToConsider: 'Should personal Github repositories and existing open-source libraries be attached as Schedule A exemptions?'
    },
    {
      id: 'att-4',
      level: 'Deadline',
      title: '48-Hour Equipment Return on Termination',
      observation: 'All cryptographic credentials, laptop equipment, and tokens must be returned within 48 hours of resignation.',
      reason: 'Failure to promptly surrender materials could trigger claims of unauthorized possession under trade secret clauses.',
      sourcePage: 7,
      sourceSection: 'Section 8.2',
      questionToConsider: 'What is the designated company shipping protocol if the employee works remotely?'
    },
    {
      id: 'att-5',
      level: 'Missing Information',
      title: 'Remote Work and Relocation Terms Omitted',
      observation: 'The agreement does not specify whether remote work outside San Francisco is permitted or requires management approval.',
      reason: 'If remote work policy changes, employment is bound to California jurisdiction unless amended in writing.',
      sourcePage: 1,
      sourceSection: 'Section 1.1',
      questionToConsider: 'Is there an accompanying remote-work policy or hybrid schedule agreement?'
    }
  ],
  decisionNodes: [
    {
      id: 'node-doc',
      label: 'Acme Employment Agreement',
      category: 'document',
      summary: 'Governing contract executed on Oct 1, 2026',
      sourcePage: 1,
      sourceSection: 'Preamble',
      connectedTo: ['node-parties', 'node-obligations', 'node-payments', 'node-term']
    },
    {
      id: 'node-parties',
      label: 'Parties: Acme Tech & Alex Mercer',
      category: 'parties',
      summary: 'Employer (Delaware Corp) and Employee (Senior Systems Architect)',
      sourcePage: 1,
      sourceSection: 'Section 1',
      connectedTo: ['node-obligations', 'node-payments']
    },
    {
      id: 'node-payments',
      label: 'Compensation & Bonus ($125K + 15%)',
      category: 'payments',
      summary: 'Bi-weekly base pay plus discretionary milestone bonus',
      sourcePage: 2,
      sourceSection: 'Section 3.1 - 3.2',
      connectedTo: ['node-term', 'node-deadlines']
    },
    {
      id: 'node-obligations',
      label: 'Employee Duties & Devotion of Time',
      category: 'obligations',
      summary: 'Full business time dedication, no outside commercial activity without consent',
      sourcePage: 1,
      sourceSection: 'Section 1.2',
      connectedTo: ['node-ip', 'node-term']
    },
    {
      id: 'node-ip',
      label: 'Intellectual Property Assignment',
      category: 'ip',
      summary: 'All software, algorithms, and models constitute Work Made for Hire',
      sourcePage: 4,
      sourceSection: 'Section 6.1',
      connectedTo: ['node-dispute']
    },
    {
      id: 'node-deadlines',
      label: 'Key Milestones & Reviews',
      category: 'deadlines',
      summary: '90-day review (Dec 31, 2026), annual review (Sep 15, 2027)',
      sourcePage: 2,
      sourceSection: 'Section 3.2',
      connectedTo: ['node-term']
    },
    {
      id: 'node-term',
      label: 'Termination & 30-Day Notice',
      category: 'termination',
      summary: 'At-will separation with 30 days written notice or immediate for Cause',
      sourcePage: 6,
      sourceSection: 'Section 8.2',
      connectedTo: ['node-dispute']
    },
    {
      id: 'node-dispute',
      label: 'Dispute: Mandatory AAA Arbitration',
      category: 'dispute',
      summary: 'Binding individual arbitration in SF, California; class actions waived',
      sourcePage: 7,
      sourceSection: 'Section 9.1',
      connectedTo: []
    }
  ]
};

export const DEMO_DOCUMENT_V2: LegalDocument = {
  ...DEMO_DOCUMENT_V1,
  id: 'doc-acme-v2',
  title: 'Acme Technologies — Revised Employment Agreement (Version 2)',
  filename: 'Acme_Technologies_Employment_Agreement_v2_Revised.pdf',
  fileSize: '1.9 MB',
  uploadedAt: 'Sep 18, 2026',
  overview: {
    ...DEMO_DOCUMENT_V1.overview,
    title: 'Acme Technologies — Revised Employment Agreement (Version 2)',
    expirationDate: 'Indefinite (At-Will subject to revised Section 8.2 with 60-day notice)',
  },
  executiveSummary: {
    ...DEMO_DOCUMENT_V1.executiveSummary,
    financialTerms: 'Base annual salary increased to $140,000 paid bi-weekly, plus a one-time signing bonus of $15,000 subject to a 12-month clawback, and discretionary annual bonus up to 20%.',
    termination: 'Either party may terminate employment by providing sixty (60) days prior written notice pursuant to revised Section 8.2 (increased from 30 days in v1).',
    reviewCarefully: 'Section 3.1 ($140K base), Section 3.4 (New $15K signing bonus clawback), Section 7.2 (Expanded 18-month non-solicit), and Section 8.2 (60-day notice period).'
  }
};

export const DEMO_COMPARISONS: ComparisonDiff[] = [
  {
    id: 'diff-1',
    category: 'PAYMENT',
    title: 'Base Annual Salary Adjustment',
    status: 'modified',
    versionA: {
      text: 'Employer shall pay Employee a base salary of $125,000.00 USD per annum.',
      page: 2,
      section: 'Section 3.1'
    },
    versionB: {
      text: 'Employer shall pay Employee a base salary of $140,000.00 USD per annum.',
      page: 2,
      section: 'Section 3.1'
    },
    deltaExplanation: 'Base compensation increased by $15,000/year (+12.0%).',
    financialImpact: '+$15,000 / year'
  },
  {
    id: 'diff-2',
    category: 'PAYMENT',
    title: 'New Signing Bonus & 12-Month Clawback',
    status: 'added',
    versionA: {
      text: '[Clause not present in Version 1]',
      page: 2,
      section: 'N/A'
    },
    versionB: {
      text: 'Company shall pay Employee a one-time signing bonus of $15,000.00 within 30 days of Effective Date. If Employee voluntarily resigns prior to completing twelve (12) months of service, Employee shall repay a pro-rated portion.',
      page: 2,
      section: 'Section 3.4'
    },
    deltaExplanation: 'Added $15,000 upfront signing bonus with a 12-month pro-rated repayment obligation if employee departs early.',
    financialImpact: '+$15,000 upfront (Conditional)'
  },
  {
    id: 'diff-3',
    category: 'NOTICE PERIOD',
    title: 'Notice Period Extension for Resignation',
    status: 'modified',
    versionA: {
      text: 'Either party may terminate this Agreement without cause at any time by delivering thirty (30) days prior written notice.',
      page: 6,
      section: 'Section 8.2'
    },
    versionB: {
      text: 'Either party may terminate this Agreement without cause at any time by delivering sixty (60) days prior written notice.',
      page: 6,
      section: 'Section 8.2'
    },
    deltaExplanation: 'Required resignation notice extended by +30 days (doubled from 30 days to 60 days).',
    financialImpact: '+30 days commitment'
  },
  {
    id: 'diff-4',
    category: 'RESTRICTIONS',
    title: 'Non-Solicitation Duration Expanded',
    status: 'modified',
    versionA: {
      text: 'For a period of twelve (12) months immediately following the termination of employment, Employee shall not solicit...',
      page: 5,
      section: 'Section 7.2'
    },
    versionB: {
      text: 'For a period of eighteen (18) months immediately following the termination of employment, Employee shall not solicit...',
      page: 5,
      section: 'Section 7.2'
    },
    deltaExplanation: 'Non-solicitation restriction extended from 12 months to 18 months.',
    financialImpact: '+6 months post-employment constraint'
  },
  {
    id: 'diff-5',
    category: 'INCENTIVE BONUS',
    title: 'Bonus Target Percentage Raised',
    status: 'modified',
    versionA: {
      text: '...with a target incentive of 15% of annual base salary...',
      page: 2,
      section: 'Section 3.2'
    },
    versionB: {
      text: '...with a target incentive of 20% of annual base salary...',
      page: 2,
      section: 'Section 3.2'
    },
    deltaExplanation: 'Annual target bonus incentive increased from 15% ($18,750 on $125K) to 20% ($28,000 on $140K).',
    financialImpact: 'Potential +$9,250 annual bonus uplift'
  }
];

export const DEMO_ACTION_PLAN_ITEMS = [
  {
    id: 'act-1',
    category: 'Important Dates',
    text: 'Calendar the 90-day review checkpoint (December 31, 2026)',
    completed: false,
    sourcePage: 2,
    sourceSection: 'Section 3.2'
  },
  {
    id: 'act-2',
    category: 'Important Dates',
    text: 'Submit Schedule A prior inventions list before October 31, 2026 deadline',
    completed: true,
    sourcePage: 4,
    sourceSection: 'Section 6.2'
  },
  {
    id: 'act-3',
    category: 'My Obligations',
    text: 'Review proprietary information policies regarding personal laptop and cryptographic key storage',
    completed: false,
    sourcePage: 3,
    sourceSection: 'Section 5.1'
  },
  {
    id: 'act-4',
    category: 'Information to Verify',
    text: 'Clarify whether existing personal open-source libraries need explicit written exclusions',
    completed: false,
    sourcePage: 4,
    sourceSection: 'Section 6.1'
  },
  {
    id: 'act-5',
    category: 'Questions to Ask',
    text: 'Ask HR if the 30-day notice period in Section 8.2 can be shortened by mutual consent upon departure',
    completed: false,
    sourcePage: 7,
    sourceSection: 'Section 8.2'
  },
  {
    id: 'act-6',
    category: 'Documents to Gather',
    text: 'Obtain copy of Company Employee Handbook and 401(k) plan summary document',
    completed: true,
    sourcePage: 2,
    sourceSection: 'Section 3.3'
  },
  {
    id: 'act-7',
    category: 'Professional Review Topics',
    text: 'Consult an employment attorney regarding enforceability of California non-solicitation restrictions in Section 7.2',
    completed: false,
    sourcePage: 5,
    sourceSection: 'Section 7.2'
  }
];
