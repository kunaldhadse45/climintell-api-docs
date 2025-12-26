# UVSafe API Reference

## Product Overview
**UVSafe** assesses UV radiation exposure and provides personalized skin health recommendations based on Fitzpatrick skin types.

## Endpoint
```
POST https://climintell-api.onrender.com/api/uvsafe/analyze
```

## Geographic Coverage
**Primary Focus:** India
**Global Coverage:** Available worldwide where Sentinel-5P coverage exists
**Custom Areas:** Supported via GeoJSON geometry (any location globally)

## Authentication
```
Header: X-API-Key: climintell_uvsafe_YOUR_KEY
```

## Request Format

### District-Based
```json
{
  "country": "India",
  "state": "Punjab",
  "district": "Sangrur",
  "months_back": 12,
  "skin_type": 3,
  "include_seasonal": true,
  "include_recommendations": true
}
```

### Custom Geometry
```json
{
  "geometry": {
    "type": "Polygon",
    "coordinates": [[[lng, lat], ...]]
  },
  "months_back": 12,
  "skin_type": 3
}
```

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| country | string | - | Country name (required if not geometry) |
| state | string | - | State/Province (required if not geometry) |
| district | string | - | District name (required if not geometry) |
| geometry | object | - | GeoJSON geometry (alternative) |
| months_back | int | 12 | Analysis period (3=3 months, 12=1 year, 24=2 years) |
| skin_type | int | 3 | Fitzpatrick skin type (1-6, see below) |
| include_seasonal | bool | true | Include seasonal analysis |
| include_recommendations | bool | true | Include health recommendations |

## Fitzpatrick Skin Types

| Type | Description | Burn/Tan Response |
|------|-------------|-------------------|
| 1 | Very fair, pale | Always burns, never tans |
| 2 | Fair | Burns easily, tans minimally |
| 3 | Medium | Burns moderately, tans gradually |
| 4 | Olive | Burns minimally, tans easily |
| 5 | Brown | Rarely burns, tans darkly |
| 6 | Dark brown/black | Never burns, deeply pigmented |

## Response Format
```json
{
  "success": true,
  "location": "Sangrur, Punjab, India",
  "analysis_period": {
    "months": 12,
    "start_date": "2023-12-26",
    "end_date": "2024-12-26"
  },
  "area_km2": 3569.45,
  "skin_type_info": {
    "type": 3,
    "description": "Medium",
    "characteristics": "Burns moderately, tans gradually to light brown",
    "baseline_risk": "Moderate"
  },
  "uv_exposure_assessment": {
    "annual_statistics": {
      "mean_uv_index": 7.8,
      "min_uv_index": 2.1,
      "max_uv_index": 12.5,
      "percentile_90": 10.2,
      "percentile_95": 11.3
    },
    "exposure_classification": "Very High",
    "risk_level": "High",
    "erythema_dose_classification": "Multiple Minimal Erythema Doses"
  },
  "ozone_analysis": {
    "mean_ozone_du": 285.5,
    "min_ozone_du": 245.2,
    "max_ozone_du": 315.8,
    "ozone_status": "Normal",
    "uv_amplification_factor": 1.15
  },
  "elevation_correction": {
    "mean_elevation_m": 245.6,
    "uv_enhancement_percent": 4.9,
    "adjusted_uv_index": 8.2
  },
  "seasonal_patterns": [
    {
      "season": "Winter (Dec-Feb)",
      "mean_uv_index": 4.5,
      "risk_level": "Moderate",
      "burn_time_minutes_type3": 45
    },
    {
      "season": "Spring (Mar-May)",
      "mean_uv_index": 9.2,
      "risk_level": "Very High",
      "burn_time_minutes_type3": 18
    },
    {
      "season": "Summer (Jun-Aug)",
      "mean_uv_index": 11.5,
      "risk_level": "Extreme",
      "burn_time_minutes_type3": 12
    },
    {
      "season": "Monsoon (Sep-Nov)",
      "mean_uv_index": 7.1,
      "risk_level": "High",
      "burn_time_minutes_type3": 25
    }
  ],
  "monthly_averages": [
    {"month": "Jan", "uv_index": 4.2, "risk": "Moderate"},
    {"month": "Feb", "uv_index": 5.8, "risk": "High"},
    ...
  ],
  "health_risk_assessment": {
    "acute_risks": [
      "Sunburn risk during peak hours (10 AM - 4 PM)",
      "Increased risk in summer months (UV Index >10)",
      "Eye damage from UV exposure"
    ],
    "chronic_risks": [
      "Cumulative skin damage and premature aging",
      "Increased melanoma risk with repeated sunburns",
      "Cataracts from long-term UV exposure"
    ],
    "high_risk_periods": [
      "April-August: UV Index regularly exceeds 10",
      "Peak hours: 11 AM - 3 PM daily"
    ]
  },
  "personalized_recommendations": {
    "sun_protection_essentials": [
      "Use broad-spectrum SPF 30+ sunscreen daily",
      "Reapply sunscreen every 2 hours",
      "Wear wide-brimmed hat and UV-blocking sunglasses",
      "Seek shade during peak UV hours (11 AM - 3 PM)"
    ],
    "seasonal_guidance": {
      "winter": "SPF 15-30 sufficient for daily activities",
      "spring_autumn": "SPF 30+ required, protective clothing recommended",
      "summer": "SPF 50+ essential, limit outdoor exposure 11 AM - 3 PM"
    },
    "safe_sun_exposure_times": {
      "winter_morning": "Before 10 AM: 30-40 minutes safe",
      "winter_evening": "After 4 PM: 45-60 minutes safe",
      "summer_morning": "Before 9 AM: 15-20 minutes safe",
      "summer_evening": "After 5 PM: 20-30 minutes safe"
    },
    "vitamin_d_synthesis": {
      "recommendation": "10-15 minutes sun exposure on arms/legs 2-3x per week",
      "best_time": "Early morning (7-9 AM) or late afternoon (4-6 PM)",
      "note": "Sufficient for Vitamin D without excessive UV damage"
    }
  },
  "interpretation": "Very High UV exposure with mean UV Index of 7.8. Skin Type 3 requires consistent sun protection, especially April-August.",
  "monthly_sun_protection_calendar": [
    {"month": "Jan", "spf_recommended": 15, "protection_level": "Low"},
    {"month": "Apr", "spf_recommended": 50, "protection_level": "Very High"},
    ...
  ]
}
```

## UV Index Risk Levels

| UV Index | Risk Level | Recommended Protection |
|----------|-----------|------------------------|
| 0-2 | Low | Minimal protection needed |
| 3-5 | Moderate | Seek shade, wear sunscreen |
| 6-7 | High | Protection essential |
| 8-10 | Very High | Extra protection required |
| 11+ | Extreme | Avoid sun exposure |

## Data Sources
- Ozone: Sentinel-5P TROPOMI Ozone
- Elevation: SRTM 90m DEM
- UV Calculation: Ozone-based UV index estimation
- Temporal Coverage: 2018-present

## Use Cases
- Personal UV exposure monitoring
- Outdoor event planning
- Health advisory systems
- Tourism safety information
- Occupational health (outdoor workers)

## Error Response Examples

### 400 - Missing Required Fields
```json
{
  "success": false,
  "error": "Missing required fields: country, state, district"
}
```

### 401 - No API Key
```json
{
  "success": false,
  "error": "API key required",
  "message": "Include X-API-Key header in your request"
}
```

### 403 - Invalid API Key
```json
{
  "success": false,
  "error": "Invalid API key"
}
```

### 429 - Rate Limit Exceeded
```json
{
  "success": false,
  "error": "Daily limit exceeded",
  "message": "Daily limit: 100 requests",
  "usage": {
    "today": 100,
    "limit": 100
  }
}
```

### 500 - Processing Error
```json
{
  "success": false,
  "error": "Earth Engine computation error",
  "type": "ComputeError"
}
```

## Output Formats

### JSON (Default)
All responses are returned as JSON. The complete response object can be saved and processed programmatically.

### Exporting Results
```python
import json

# Save full response
with open('results.json', 'w') as f:
    json.dump(result, f, indent=2)

# Export key metrics to CSV
import csv
with open('summary.csv', 'w') as f:
    writer = csv.writer(f)
    writer.writerow(['Metric', 'Value'])
    for key, value in result.items():
        if isinstance(value, (int, float, str)):
            writer.writerow([key, value])
```

### GeoJSON Export (for GIS)
```python
geojson_feature = {
    "type": "Feature",
    "properties": result,  # Full API response as properties
    "geometry": your_input_geometry
}

with open('results.geojson', 'w') as f:
    json.dump(geojson_feature, f)
```

## Batch Processing

### Sequential Analysis (Multiple Locations)
```python
import requests
import time

locations = [
    {"country": "India", "state": "Punjab", "district": "Sangrur"},
    {"country": "India", "state": "Punjab", "district": "Ludhiana"},
    {"country": "India", "state": "Haryana", "district": "Karnal"}
]

results = []
for loc in locations:
    response = requests.post(url, headers=headers, json=loc, timeout=180)
    results.append(response.json())
    time.sleep(2)  # Respect rate limits
```

### Parallel Processing (Higher Rate Limits)
```python
from concurrent.futures import ThreadPoolExecutor

def analyze_location(location):
    response = requests.post(url, headers=headers, json=location, timeout=180)
    return response.json()

# Max workers based on your rate limit
with ThreadPoolExecutor(max_workers=3) as executor:
    results = list(executor.map(analyze_location, locations))
```

**Note:** Batch processing is subject to rate limits. Contact support@climintell.com for bulk analysis needs or webhook integration.


## Example Usage

### Python
```python
import requests

url = "https://climintell-api.onrender.com/api/uvsafe/analyze"
headers = {"X-API-Key": "climintell_uvsafe_YOUR_KEY"}
data = {
    "country": "India",
    "state": "Punjab",
    "district": "Sangrur",
    "months_back": 12,
    "skin_type": 3
}

response = requests.post(url, headers=headers, json=data, timeout=180)
result = response.json()
print(f"Mean UV Index: {result['uv_exposure_assessment']['annual_statistics']['mean_uv_index']}")
print(f"Risk Level: {result['uv_exposure_assessment']['risk_level']}")
```

### cURL
```bash
curl -X POST https://climintell-api.onrender.com/api/uvsafe/analyze \
  -H "X-API-Key: climintell_uvsafe_YOUR_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "country": "India",
    "state": "Punjab",
    "district": "Sangrur",
    "months_back": 12,
    "skin_type": 3
  }'
```
