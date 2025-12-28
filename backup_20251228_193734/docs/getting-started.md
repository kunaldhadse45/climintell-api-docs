---
sidebar_position: 2
---

# Getting Started

This guide will help you make your first API request to ClimIntell in minutes.

## Prerequisites

- API key (request at climintell@gmail.com)
- Basic knowledge of REST APIs
- Command line tool (cURL) or HTTP client

## Base URL

All API requests should be made to:

```
https://climintell-api.onrender.com/api
```

## Your First Request

Let's analyze crop suitability for rice in Punjab using the AgriZone API.

### Step 1: Get Your API Key

Contact us at **climintell@gmail.com** with:
- Your organization name
- Use case description
- Expected request volume

You'll receive an API key within 24-48 hours.

### Step 2: Make Your First Request

```bash
curl -X POST https://climintell-api.onrender.com/api/agrizone/analyze \
  -H "X-API-Key: YOUR_API_KEY_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "country": "India",
    "state": "Punjab",
    "district": "Sangrur",
    "crop_name": "Rice",
    "start_month": 6,
    "end_month": 10,
    "years_back": 5
  }'
```

### Step 3: Understand the Response

```json
{
  "status": "success",
  "data": {
    "suitability_percentage": 87.5,
    "total_area_ha": 123456.78,
    "suitable_area_ha": 108024.68,
    "climate_score": 92.3,
    "soil_score": 85.1,
    "terrain_score": 88.9,
    "irrigation_required": false,
    "analysis_period": "2019-2023"
  },
  "metadata": {
    "request_id": "req_abc123",
    "processing_time_ms": 2341,
    "timestamp": "2024-12-26T10:30:00Z"
  }
}
```

## Understanding Request Structure

### Required Headers

```http
X-API-Key: climintell_product_YOUR_UNIQUE_KEY
Content-Type: application/json
```

### Geographic Input Methods

All APIs support two methods for specifying location:

**Method 1: District-Based (India)**
```json
{
  "country": "India",
  "state": "Punjab",
  "district": "Sangrur"
}
```

**Method 2: Custom GeoJSON (Global)**
```json
{
  "geometry": {
    "type": "Polygon",
    "coordinates": [[[75.5, 30.2], [75.6, 30.2], [75.6, 30.3], [75.5, 30.3], [75.5, 30.2]]]
  }
}
```

## Common Parameters

Most APIs share these common parameters:

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `country` / `geometry` | string / object | Yes | Location specification |
| `years_back` | integer | No | Years of historical data (1-10, default: 5) |

Each API has specific parameters detailed in its reference page.

## Response Format

All successful responses follow this structure:

```json
{
  "status": "success",
  "data": {
    // API-specific results
  },
  "metadata": {
    "request_id": "string",
    "processing_time_ms": number,
    "timestamp": "ISO8601"
  }
}
```

Error responses:

```json
{
  "status": "error",
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message",
    "details": {}
  }
}
```

## Example Code

### Python

```python
import requests

url = "https://climintell-api.onrender.com/api/agrizone/analyze"
headers = {
    "X-API-Key": "YOUR_API_KEY_HERE",
    "Content-Type": "application/json"
}
payload = {
    "country": "India",
    "state": "Punjab",
    "district": "Sangrur",
    "crop_name": "Rice",
    "start_month": 6,
    "end_month": 10,
    "years_back": 5
}

response = requests.post(url, json=payload, headers=headers)
data = response.json()

if data["status"] == "success":
    print(f"Suitability: {data['data']['suitability_percentage']}%")
else:
    print(f"Error: {data['error']['message']}")
```

### JavaScript (Node.js)

```javascript
const axios = require('axios');

const analyzeAgriZone = async () => {
  try {
    const response = await axios.post(
      'https://climintell-api.onrender.com/api/agrizone/analyze',
      {
        country: 'India',
        state: 'Punjab',
        district: 'Sangrur',
        crop_name: 'Rice',
        start_month: 6,
        end_month: 10,
        years_back: 5
      },
      {
        headers: {
          'X-API-Key': 'YOUR_API_KEY_HERE',
          'Content-Type': 'application/json'
        }
      }
    );
    
    console.log('Suitability:', response.data.data.suitability_percentage + '%');
  } catch (error) {
    console.error('Error:', error.response.data.error.message);
  }
};

analyzeAgriZone();
```

## Best Practices

### 1. Store API Keys Securely
```bash
# Use environment variables
export CLIMINTELL_API_KEY="your_key_here"
```

```python
import os
api_key = os.environ.get('CLIMINTELL_API_KEY')
```

### 2. Handle Errors Gracefully
Always check the response status and handle errors appropriately.

### 3. Respect Rate Limits
Monitor your usage and implement backoff strategies if needed.

### 4. Set Appropriate Timeouts
Processing can take up to 180 seconds for large areas. Set timeouts accordingly:

```python
response = requests.post(url, json=payload, headers=headers, timeout=180)
```

### 5. Validate Input Data
Check your parameters before sending requests to avoid errors.

## Troubleshooting

### Common Issues

**401 Unauthorized**
- Check your API key is correct
- Ensure it matches the product you're calling

**400 Bad Request**
- Validate your JSON payload
- Check all required parameters are present

**429 Too Many Requests**
- You've exceeded your rate limit
- Wait before retrying or contact us to upgrade

**500 Internal Server Error**
- Contact support with your request_id
- We'll investigate immediately

## Next Steps

Now that you've made your first request:

1. [Explore all 7 APIs](/docs/api-reference)
2. [Learn about authentication](/docs/authentication)
3. [Understand rate limits](/docs/rate-limits)
4. [Review error codes](/docs/errors)

Need help? Email us at **climintell@gmail.com**
