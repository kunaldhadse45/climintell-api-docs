---
sidebar_position: 5
---

# Error Handling

ClimIntell APIs use standard HTTP status codes and provide detailed error messages in JSON format.

## Error Response Format

All errors follow this structure:

```json
{
  "status": "error",
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error description",
    "details": {
      // Optional additional context
    }
  }
}
```

## HTTP Status Codes

| Status Code | Meaning | Common Causes |
|-------------|---------|---------------|
| 400 | Bad Request | Invalid parameters, malformed JSON |
| 401 | Unauthorized | Missing or invalid API key |
| 403 | Forbidden | Valid key but insufficient permissions |
| 404 | Not Found | Invalid endpoint or resource |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Server Error | Server-side processing error |
| 503 | Service Unavailable | Temporary service disruption |

## Common Errors

### Authentication Errors

#### MISSING_API_KEY
```json
{
  "status": "error",
  "error": {
    "code": "MISSING_API_KEY",
    "message": "API key is required. Include X-API-Key header in your request."
  }
}
```

**Solution:** Add `X-API-Key` header to your request.

#### INVALID_API_KEY
```json
{
  "status": "error",
  "error": {
    "code": "INVALID_API_KEY",
    "message": "The provided API key is invalid or has been revoked."
  }
}
```

**Solution:** Check your API key. Contact support if recently revoked.

#### WRONG_PRODUCT_KEY
```json
{
  "status": "error",
  "error": {
    "code": "WRONG_PRODUCT_KEY",
    "message": "This API key is for AgriZone but you're calling SafeAir."
  }
}
```

**Solution:** Use the correct product-specific API key.

### Request Errors

#### MISSING_REQUIRED_FIELD
```json
{
  "status": "error",
  "error": {
    "code": "MISSING_REQUIRED_FIELD",
    "message": "Missing required field: 'crop_name'",
    "details": {
      "field": "crop_name"
    }
  }
}
```

**Solution:** Include all required parameters in your request.

#### INVALID_PARAMETER_VALUE
```json
{
  "status": "error",
  "error": {
    "code": "INVALID_PARAMETER_VALUE",
    "message": "Invalid value for 'years_back': must be between 1 and 10",
    "details": {
      "parameter": "years_back",
      "provided": 15,
      "allowed": "1-10"
    }
  }
}
```

**Solution:** Use valid parameter values as specified in API documentation.

#### INVALID_GEOMETRY
```json
{
  "status": "error",
  "error": {
    "code": "INVALID_GEOMETRY",
    "message": "Invalid GeoJSON geometry: polygon is not closed",
    "details": {
      "geometry_type": "Polygon"
    }
  }
}
```

**Solution:** Ensure GeoJSON geometry is valid and properly formatted.

#### AREA_TOO_LARGE
```json
{
  "status": "error",
  "error": {
    "code": "AREA_TOO_LARGE",
    "message": "Analysis area exceeds maximum allowed size of 50,000 hectares",
    "details": {
      "area_ha": 75000,
      "max_allowed_ha": 50000
    }
  }
}
```

**Solution:** Reduce analysis area or contact support for custom large-area processing.

### Rate Limit Errors

#### RATE_LIMIT_EXCEEDED
```json
{
  "status": "error",
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Daily rate limit of 500 requests exceeded",
    "details": {
      "limit": 500,
      "retry_after": 3600
    }
  }
}
```

**Solution:** Wait until rate limit resets or upgrade your tier.

### Processing Errors

#### PROCESSING_TIMEOUT
```json
{
  "status": "error",
  "error": {
    "code": "PROCESSING_TIMEOUT",
    "message": "Request timed out after 180 seconds",
    "details": {
      "request_id": "req_abc123"
    }
  }
}
```

**Solution:** 
- Reduce analysis complexity
- Use smaller geographic areas
- Contact support with request_id

#### DATA_UNAVAILABLE
```json
{
  "status": "error",
  "error": {
    "code": "DATA_UNAVAILABLE",
    "message": "Satellite data not available for specified time period",
    "details": {
      "requested_period": "2015-2020",
      "available_from": "2018"
    }
  }
}
```

**Solution:** Adjust time period to available data range.

#### LOCATION_NOT_FOUND
```json
{
  "status": "error",
  "error": {
    "code": "LOCATION_NOT_FOUND",
    "message": "District 'Sangrurr' not found in state 'Punjab'",
    "details": {
      "country": "India",
      "state": "Punjab",
      "district": "Sangrurr"
    }
  }
}
```

**Solution:** Verify spelling of location names. Use exact names from FAO GAUL database.

## Error Handling Best Practices

### Python Example

```python
import requests
from requests.exceptions import RequestException

def call_api(url, headers, payload):
    try:
        response = requests.post(
            url,
            json=payload,
            headers=headers,
            timeout=180
        )
        
        # Raise exception for HTTP errors
        response.raise_for_status()
        
        data = response.json()
        
        # Check API-level status
        if data.get('status') == 'error':
            error = data['error']
            print(f"API Error: [{error['code']}] {error['message']}")
            
            # Handle specific errors
            if error['code'] == 'RATE_LIMIT_EXCEEDED':
                retry_after = error['details'].get('retry_after', 3600)
                print(f"Rate limited. Retry after {retry_after} seconds")
            
            return None
        
        return data
    
    except requests.exceptions.Timeout:
        print("Request timed out. Try reducing area size or complexity.")
    except requests.exceptions.HTTPError as e:
        print(f"HTTP Error: {e}")
    except RequestException as e:
        print(f"Request failed: {e}")
    except Exception as e:
        print(f"Unexpected error: {e}")
    
    return None
```

### JavaScript Example

```javascript
async function callAPI(url, headers, payload) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(180000) // 180 second timeout
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (data.status === 'error') {
      const error = data.error;
      console.error(`API Error: [${error.code}] ${error.message}`);
      
      // Handle specific errors
      if (error.code === 'RATE_LIMIT_EXCEEDED') {
        const retryAfter = error.details?.retry_after || 3600;
        console.log(`Rate limited. Retry after ${retryAfter} seconds`);
      }
      
      return null;
    }
    
    return data;
    
  } catch (error) {
    if (error.name === 'AbortError') {
      console.error('Request timed out');
    } else {
      console.error('Request failed:', error.message);
    }
    return null;
  }
}
```

## Logging and Debugging

### Include Request ID

All responses include a `request_id`. Save this for debugging:

```python
response = requests.post(url, json=payload, headers=headers)
data = response.json()

if data.get('status') == 'error':
    request_id = data.get('metadata', {}).get('request_id', 'unknown')
    print(f"Error occurred. Request ID: {request_id}")
    # Log this for support inquiries
```

### Enable Debug Logging

```python
import logging

logging.basicConfig(level=logging.DEBUG)

# Your API calls will now show detailed debug info
```

## Retry Logic

Implement smart retry logic for transient errors:

```python
import time
from requests.exceptions import RequestException

def api_call_with_retry(url, headers, payload, max_retries=3):
    for attempt in range(max_retries):
        try:
            response = requests.post(url, json=payload, headers=headers, timeout=180)
            response.raise_for_status()
            data = response.json()
            
            if data.get('status') == 'success':
                return data
            
            # Don't retry client errors (4xx except 429)
            if response.status_code >= 400 and response.status_code < 500:
                if response.status_code != 429:
                    print(f"Client error: {data}")
                    return None
            
            # Retry server errors (5xx) with backoff
            wait_time = 2 ** attempt  # Exponential backoff: 1s, 2s, 4s
            print(f"Attempt {attempt + 1} failed. Retrying in {wait_time}s...")
            time.sleep(wait_time)
            
        except RequestException as e:
            if attempt < max_retries - 1:
                wait_time = 2 ** attempt
                print(f"Request failed: {e}. Retrying in {wait_time}s...")
                time.sleep(wait_time)
            else:
                print(f"Max retries exceeded: {e}")
                raise
    
    return None
```

## Getting Help

If you encounter persistent errors:

1. **Check Documentation:** Verify your parameters match the API specification
2. **Review Request:** Validate JSON format and required fields
3. **Check Status:** Visit [status.climintell.com](https://climintell.com) (if available)
4. **Contact Support:** Email climintell@gmail.com with:
   - Request ID
   - Full error response
   - Request payload (without sensitive data)
   - Timestamp of error

## Next Steps

- [Review rate limits](/docs/rate-limits)
- [Contact support](/docs/support)
- [API Reference](/docs/category/api-reference)

**Need help debugging?** Email us at **climintell@gmail.com** with your request_id.
