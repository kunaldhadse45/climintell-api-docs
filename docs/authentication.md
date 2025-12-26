---
sidebar_position: 3
---

# Authentication

All ClimIntell API requests require authentication using API keys passed in request headers.

## API Key Format

```
X-API-Key: climintell_{product}_{unique_identifier}
```

Each product has a separate API key. Example:
```
climintell_agrizone_a1b2c3d4e5f6g7h8
climintell_safeair_x9y8z7w6v5u4t3s2
```

## Obtaining API Keys

1. **Request Access:** Email climintell@gmail.com with:
   - Organization name
   - Use case description
   - Expected request volume
   - Technical contact details

2. **Review Process:** We'll review your request within 24-48 hours

3. **Receive Keys:** Upon approval, you'll receive API keys for requested products

4. **Custom Pricing:** We'll provide a pricing quote based on your requirements

## Making Authenticated Requests

### Header-Based Authentication

Include your API key in the request header:

```bash
curl -X POST https://climintell-api.onrender.com/api/agrizone/analyze \
  -H "X-API-Key: YOUR_API_KEY_HERE" \
  -H "Content-Type: application/json" \
  -d '{ "country": "India", "state": "Punjab", "district": "Sangrur", "crop_name": "Rice" }'
```

### Python Example

```python
import requests

headers = {
    "X-API-Key": "climintell_agrizone_YOUR_KEY",
    "Content-Type": "application/json"
}

response = requests.post(
    "https://climintell-api.onrender.com/api/agrizone/analyze",
    headers=headers,
    json={"country": "India", "state": "Punjab", "district": "Sangrur", "crop_name": "Rice"}
)
```

### JavaScript Example

```javascript
const response = await fetch('https://climintell-api.onrender.com/api/agrizone/analyze', {
  method: 'POST',
  headers: {
    'X-API-Key': 'climintell_agrizone_YOUR_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    country: 'India',
    state: 'Punjab',
    district: 'Sangrur',
    crop_name: 'Rice'
  })
});
```

## Security Best Practices

### 1. Never Commit API Keys to Version Control

**Bad:**
```python
api_key = "climintell_agrizone_a1b2c3d4e5f6g7h8"  # Don't do this!
```

**Good:**
```python
import os
api_key = os.environ.get('CLIMINTELL_API_KEY')
```

Add to `.gitignore`:
```
.env
*.key
secrets/
```

### 2. Use Environment Variables

Create a `.env` file (never commit this):
```bash
CLIMINTELL_AGRIZONE_KEY=climintell_agrizone_YOUR_KEY
CLIMINTELL_SAFEAIR_KEY=climintell_safeair_YOUR_KEY
```

Load in your application:
```python
from dotenv import load_dotenv
load_dotenv()

api_key = os.environ.get('CLIMINTELL_AGRIZONE_KEY')
```

### 3. Rotate Keys Periodically

Request new keys every 6-12 months for enhanced security.

### 4. Use Different Keys for Different Environments

- Development: `climintell_product_dev_...`
- Staging: `climintell_product_staging_...`
- Production: `climintell_product_prod_...`

Contact us to obtain environment-specific keys.

### 5. Implement Key Storage Solutions

For production applications, use secure key management:
- **AWS:** AWS Secrets Manager or Parameter Store
- **Google Cloud:** Secret Manager
- **Azure:** Key Vault
- **Self-hosted:** HashiCorp Vault

### 6. Monitor API Key Usage

Track usage patterns to detect:
- Unusual request volumes
- Requests from unexpected IPs
- Potential key compromise

Contact us immediately if you suspect a key has been compromised.

## Error Responses

### 401 Unauthorized

**Missing API Key:**
```json
{
  "status": "error",
  "error": {
    "code": "MISSING_API_KEY",
    "message": "API key is required. Include X-API-Key header in your request."
  }
}
```

**Invalid API Key:**
```json
{
  "status": "error",
  "error": {
    "code": "INVALID_API_KEY",
    "message": "The provided API key is invalid or has been revoked."
  }
}
```

### 403 Forbidden

**Wrong Product Key:**
```json
{
  "status": "error",
  "error": {
    "code": "WRONG_PRODUCT_KEY",
    "message": "This API key is for AgriZone but you're calling SafeAir. Use the correct product key."
  }
}
```

**Suspended Account:**
```json
{
  "status": "error",
  "error": {
    "code": "ACCOUNT_SUSPENDED",
    "message": "Your account has been suspended. Contact support@climintell.com"
  }
}
```

## Rate Limiting

API keys are subject to rate limits based on your subscription tier. See [Rate Limits](/docs/rate-limits) for details.

## Key Revocation

To revoke a compromised key:
1. Email climintell@gmail.com immediately
2. Specify which key to revoke
3. Request a replacement key
4. Update your applications

We'll revoke the old key within 1 hour and issue a new one.

## FAQ

### Can I use one API key for multiple products?

No. Each product requires a separate API key for security and billing purposes.

### Can I share my API key with team members?

Keys are tied to your organization, not individuals. However, we recommend:
- Using a centralized key management system
- Implementing internal access controls
- Requesting separate keys for different teams if needed

### What happens if my key is exposed publicly?

Contact us immediately at climintell@gmail.com. We'll:
1. Revoke the compromised key
2. Audit recent usage
3. Issue a replacement key
4. Investigate any suspicious activity

### How long are API keys valid?

Keys don't expire automatically but should be rotated periodically for security.

### Can I have multiple keys for the same product?

Yes! Contact us if you need multiple keys for:
- Different environments (dev/staging/prod)
- Different teams
- Different applications

## Next Steps

- [Make your first request](/docs/getting-started)
- [Explore API endpoints](/docs/category/api-reference)
- [Understand rate limits](/docs/rate-limits)
- [Review error codes](/docs/errors)

Need help? Email **climintell@gmail.com**
