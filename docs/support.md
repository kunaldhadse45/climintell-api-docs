---
sidebar_position: 6
---

# Support

Get help with ClimIntell APIs through our support channels.

## Contact Information

### Email Support
**Primary Contact:** climintell@gmail.com

**Response Time:**
- Critical issues (API down): Within 4 hours
- General inquiries: Within 24-48 hours
- Feature requests: Within 1 week

### Business Hours
Monday - Friday, 9:00 AM - 6:00 PM IST (Indian Standard Time)

## What to Include in Support Requests

To help us assist you faster, please include:

### For Technical Issues
- **Request ID** (from error response metadata)
- **API Product** (AgriZone, SafeAir, etc.)
- **Error Message** (complete JSON response)
- **Request Payload** (remove sensitive data like actual API keys)
- **Timestamp** (when error occurred)
- **Expected Behavior** (what you were trying to achieve)

### Example Support Email

```
Subject: AgriZone API - PROCESSING_TIMEOUT Error

Hi ClimIntell Team,

I'm experiencing timeout errors with the AgriZone API.

Request ID: req_abc123xyz
Product: AgriZone API
Timestamp: 2024-12-26 14:30:00 UTC

Error Response:
{
  "status": "error",
  "error": {
    "code": "PROCESSING_TIMEOUT",
    "message": "Request timed out after 180 seconds"
  }
}

Request Payload:
{
  "country": "India",
  "state": "Maharashtra",
  "district": "Pune",
  "crop_name": "Sugarcane",
  "years_back": 10
}

Expected: Suitability analysis results
Actual: Timeout after 180 seconds

This has happened 3 times in the past hour.

Thanks,
[Your Name]
[Organization]
```

## Common Questions

### API Access & Billing

**How do I get an API key?**
Email climintell@gmail.com with your organization details, use case, and expected volume. We'll provide a custom quote and API keys within 24-48 hours.

**What's your pricing model?**
We offer custom pricing tailored to your needs. Factors include request volume, products used, support level, and commercial vs. academic use.

**Can I try the API before purchasing?**
Yes! Contact us to discuss a trial period or limited evaluation access.

**How do I upgrade my tier?**
Email us anytime. We can upgrade your tier immediately with pro-rated billing.

### Technical Support

**My request is timing out. What should I do?**
1. Reduce `years_back` parameter
2. Use smaller geographic areas
3. Disable unnecessary constraints
4. Contact support with request_id if issue persists

**I'm getting "Location Not Found" errors.**
Verify exact spelling of district/state names. We use FAO GAUL boundaries. Contact support for help with specific locations.

**Can I request historical data beyond 10 years?**
Contact us for custom historical data access. Some products support longer periods with custom arrangements.

**How accurate are the results?**
All algorithms are validated against peer-reviewed research. Specific accuracy metrics are documented in each API's reference page.

### Integration & Development

**Do you provide SDKs?**
Currently, we provide REST APIs. Python and JavaScript SDKs are under development. Contact us if you need help with integration.

**Can you help with integration?**
Yes! We offer integration support as part of enterprise plans. Contact us to discuss your needs.

**Do you offer webhooks or async processing?**
Currently, all APIs are synchronous. Contact us if you need webhook support for large batch processing.

**What's the maximum request size?**
- Geographic area: ~50,000 hectares (varies by product)
- Request timeout: 180 seconds
- Contact us for custom large-area processing

## Feature Requests

Have an idea for improvement? We'd love to hear it!

**Send feature requests to:** climintell@gmail.com

**Include:**
- Detailed description of the feature
- Use case / business value
- Expected behavior
- Any relevant examples

## Bug Reports

Found a bug? Help us fix it!

**Report bugs to:** climintell@gmail.com

**Include:**
- Steps to reproduce
- Expected vs actual behavior
- Request ID (if applicable)
- Screenshots or error messages
- Environment details (language, framework, etc.)

## Documentation Feedback

Found an error in the documentation or have suggestions?

**Documentation Issues:**
- Email: climintell@gmail.com
- GitHub: [github.com/climintell/api-docs/issues](https://github.com/climintell/api-docs/issues)

## Service Status

Check system status and ongoing incidents:
- **Website:** [climintell.com](https://climintell.com)
- **Scheduled Maintenance:** Announced 48 hours in advance via email

## Community

**GitHub Discussions** (coming soon)
Connect with other developers, share use cases, and get community support.

**Example Projects** (coming soon)
Browse example implementations in various programming languages.

## Emergency Contact

For critical production issues affecting your business:
- **Email:** climintell@gmail.com (mark as URGENT)
- **Expected Response:** Within 4 hours during business hours

## Office Address

**ClimIntell Private Limited**  
W-13, Rakesh Kapoor Innovation Centre  
Pilani Innovation & Entrepreneurship Development Society  
BITS Pilani, Rajasthan, India

## SLA (Service Level Agreement)

### Uptime Commitment
- **Target Uptime:** 99.9%
- **Planned Maintenance:** Announced 48 hours in advance
- **Incident Response:** Within 4 hours for critical issues

### Support Response Times

| Issue Severity | Response Time | Resolution Target |
|----------------|---------------|-------------------|
| **Critical** (API down) | 4 hours | 24 hours |
| **High** (Feature broken) | 8 hours | 48 hours |
| **Medium** (Degraded performance) | 24 hours | 5 days |
| **Low** (General inquiry) | 48 hours | 2 weeks |

*Response times apply during business hours (Mon-Fri, 9 AM - 6 PM IST)*

## Resources

- [Getting Started](/docs/getting-started)
- [API Reference](/docs/category/api-reference)
- [Authentication Guide](/docs/authentication)
- [Rate Limits](/docs/rate-limits)
- [Error Codes](/docs/errors)

## Feedback

We value your feedback! Let us know how we're doing:
- **Email:** climintell@gmail.com
- **Satisfaction Surveys:** Sent quarterly to active users

---

**Need help?** Don't hesitate to reach out at **climintell@gmail.com** 📧
