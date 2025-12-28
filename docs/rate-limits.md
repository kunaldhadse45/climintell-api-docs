---
sidebar_position: 4
---

# Rate Limits

ClimIntell APIs use rate limiting to ensure fair usage and system stability. Rate limits are applied per API key.

## Overview

Rate limits vary based on your subscription tier and are measured in requests per day.

## Typical Rate Limit Tiers

| Tier | Daily Limit | Best For | Approx. Cost |
|------|-------------|----------|--------------|
| **Research** | 10-50 requests/day | Academic research, prototyping | Custom quote |
| **Professional** | 100-500 requests/day | Consultancies, startups | Custom quote |
| **Enterprise** | Unlimited* | Large organizations, automation | Custom quote |

*Subject to fair use policy. Contact us for custom high-volume arrangements.

:::info Custom Pricing
All tiers use custom pricing tailored to your specific needs. Contact contact@climintell.com for a quote based on your:
- Request volume
- Products used
- Support level
- Commercial vs. academic use
:::

## Rate Limit Headers

Every API response includes rate limit information in the headers:

```http
HTTP/1.1 200 OK
X-RateLimit-Limit: 500
X-RateLimit-Remaining: 487
X-RateLimit-Reset: 1640995200
```

| Header | Description |
|--------|-------------|
| `X-RateLimit-Limit` | Maximum requests allowed per day |
| `X-RateLimit-Remaining` | Requests remaining in current window |
| `X-RateLimit-Reset` | Unix timestamp when limit resets |

## Handling Rate Limit Errors

When you exceed your rate limit, you'll receive a `429 Too Many Requests` response:

```json
{
  "status": "error",
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "You have exceeded your daily rate limit of 500 requests.",
    "retry_after": 3600
  }
}
```

### Retry Strategy

Implement exponential backoff when hitting rate limits:

```python
import time
import requests

def make_request_with_backoff(url, headers, payload, max_retries=3):
    for attempt in range(max_retries):
        response = requests.post(url, json=payload, headers=headers)
        
        if response.status_code == 200:
            return response.json()
        elif response.status_code == 429:
            retry_after = int(response.headers.get('Retry-After', 60))
            print(f"Rate limited. Retrying after {retry_after} seconds...")
            time.sleep(retry_after)
        else:
            response.raise_for_status()
    
    raise Exception("Max retries exceeded")
```

## Best Practices

### 1. Cache Responses

Cache API responses when data doesn't change frequently:

```python
import json
from datetime import datetime, timedelta

class APICache:
    def __init__(self, ttl_hours=24):
        self.cache = {}
        self.ttl = timedelta(hours=ttl_hours)
    
    def get(self, key):
        if key in self.cache:
            data, timestamp = self.cache[key]
            if datetime.now() - timestamp < self.ttl:
                return data
        return None
    
    def set(self, key, data):
        self.cache[key] = (data, datetime.now())

cache = APICache(ttl_hours=24)

# Use cache
cache_key = f"agrizone_{state}_{district}_{crop}"
result = cache.get(cache_key)

if result is None:
    result = make_api_request(...)
    cache.set(cache_key, result)
```

### 2. Batch Requests

Instead of making 100 individual requests for 100 locations, consider:
- Grouping nearby locations
- Using larger geometries when appropriate
- Scheduling batch jobs during off-peak hours

### 3. Monitor Usage

Track your API usage to avoid hitting limits unexpectedly:

```python
def check_rate_limit(response):
    remaining = int(response.headers.get('X-RateLimit-Remaining', 0))
    limit = int(response.headers.get('X-RateLimit-Limit', 0))
    
    usage_percent = ((limit - remaining) / limit) * 100
    
    if usage_percent > 80:
        print(f"Warning: {usage_percent:.1f}% of daily quota used")
    
    return remaining
```

### 4. Request Only What You Need

- Use appropriate `years_back` values (don't request 10 years if 5 is sufficient)
- Disable unnecessary constraints
- Use district-based queries when possible (faster than custom geometry)

## Rate Limit Increases

Need higher limits? Contact us at contact@climintell.com with:
- Current tier and usage
- Desired new limit
- Use case justification
- Expected request patterns

We'll provide a custom quote within 24 hours.

## Fair Use Policy

Even with unlimited tiers, we expect reasonable use:
- ✅ Normal business operations
- ✅ Automated workflows with reasonable frequency
- ✅ Production applications serving end users

- ❌ Unnecessary repeated requests for identical data
- ❌ Scraping/downloading entire datasets
- ❌ Denial-of-service attempts
- ❌ Reselling raw API access

Violations may result in temporary suspension while we review your use case.

## Monitoring Tools

We recommend these tools for monitoring API usage:

**Commercial:**
- Postman Monitoring
- Datadog API Monitoring
- New Relic

**Open Source:**
- Prometheus + Grafana
- ELK Stack (Elasticsearch, Logstash, Kibana)

## FAQ

### What happens if I exceed my rate limit?

You'll receive a `429 Too Many Requests` error. Your API key will work again when the rate limit window resets (typically daily at midnight UTC).

### Can I purchase additional requests mid-cycle?

Yes! Contact us at contact@climintell.com. We can:
- Temporarily increase your limit
- Upgrade your tier immediately
- Provide a one-time quota boost

### Do failed requests count toward my limit?

No. Only successful requests (2xx status codes) count toward your rate limit.

### Is there a burst limit?

Yes. Even with high daily limits, we have a burst limit of 10 requests per minute to prevent system abuse. This rarely affects normal use.

### How is the rate limit window calculated?

Rate limits reset daily at 00:00 UTC. Your limit is for a rolling 24-hour period.

## Next Steps

- [Review error codes](/docs/errors)
- [Contact support](/docs/support)
- [Explore API reference](/docs/api-reference)

Need a custom rate limit? **Email contact@climintell.com**
