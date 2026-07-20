# LLM Test Plan - Travel Policy Document Q&A

## Test Questions and Expected Answers

| **Category** | **Question** | **Expected Answer** | **Difficulty** |
|-------------|------------|-------------------|---------------|
| **Basic Factual Recall** | How many business days before travel must the Pre-Requisition Form be submitted? | 14 business days | Easy |
| **Basic Factual Recall** | What is the maximum star rating for Staff accommodation? | 3-stars | Easy |
| **Basic Factual Recall** | Within how many days must expense claims be submitted after returning? | 21 calendar days | Easy |
| **Numerical Extraction** | What is the maximum nightly rate for a Manager in Singapore? | $220 USD | Easy |
| **Numerical Extraction** | What is the Staff accommodation rate limit in Malaysia? | $60 USD | Easy |
| **Conditional Logic** | Can a Manager book Premium Economy for a 6-hour flight? | No, only for flights exceeding 8 hours | Medium |
| **Conditional Logic** | Who needs to approve travel if accommodation exceeds the standard rate limits? | Department Head (during Pre-Requisition stage) | Medium |
| **Definition Understanding** | What is the difference between "Managers" and "Staff" according to this policy? | Managers are employees with direct reports/line management responsibilities; Staff are all other employees | Medium |
| **Process Understanding** | List the main steps in the Pre-Requisition Procedure | 1. Complete form 2. Estimate costs 3. Submit to Line Manager 4. Get authorization before booking | Medium |
| **Process Understanding** | What happens if an employee doesn't respond to a discrepancy notification within the deadline? | The expense will be deemed non-reimbursable | Medium |
| **Comparison** | Between USA and Hong Kong, which has a higher Staff accommodation rate? | USA ($180 vs $140) | Medium |
| **Multi-step Reasoning** | If a Staff member needs to stay in Taiwan for 5 nights, what is the maximum total accommodation cost? | $450 USD (5 nights × $90) | Medium-Hard |
| **Policy Compliance** | Can a Staff member book Business Class if they get their Line Manager's approval? | No, they need Department Head approval for expenses outside their entitlement | Hard |
| **Detail Extraction** | Name three examples of common discrepancies mentioned in the policy | Any three from: Missing receipts, expenses outside entitlement, non-reimbursable items, calculation errors, exceeding pre-approved estimates | Medium |
| **Scope Understanding** | Can personal entertainment expenses be claimed? | No, it's listed as a non-reimbursable item | Easy |

## Scoring Guide

- **Easy Questions (5 points each)**: Direct fact retrieval, single data point extraction
- **Medium Questions (10 points each)**: Requires understanding relationships, simple reasoning
- **Hard Questions (15 points each)**: Requires multi-step logic or policy interpretation

**Total Possible Score: 125 points**

## Evaluation Criteria

1. **Accuracy**: Does the answer match the expected response?
2. **Completeness**: Are all parts of multi-part questions answered?
3. **Relevance**: Does the answer stay focused on what was asked?
4. **Citation**: Bonus points if the LLM references specific sections

## Additional Test Variations (Optional)

### Trick Questions
- "What class can a Manager book for a 9-hour flight?" (Tests if LLM catches "continuous" flight requirement)
- "Who books the travel - the employee or admin department?" (Answer: Admin department for both Staff and Managers)

### Open-Ended Questions
- "Summarize the key differences between Staff and Manager travel entitlements"
- "What is the purpose of requiring pre-authorization for travel?"

## Notes for Testing
- Run each LLM with the same prompt format
- Document response time if relevant
- Note any hallucinations or made-up information
- Check if the LLM admits when information is not in the document
