# SafeAir API Reference

## Product Overview
**SafeAir** monitors air quality and assesses health impacts using satellite-based Aerosol Optical Depth (AOD) measurements.

## Endpoint
```
POST https://climintell-api.onrender.com/api/safeair/analyze
```

## Geographic Coverage
**Primary Focus:** India and South Asia
**Global Coverage:** Available worldwide where MODIS MAIAC data is available
**Custom Areas:** Supported via GeoJSON geometry (any location globally)

## Authentication
```
Header: X-API-Key: climintell_safeair_YOUR_KEY
```

## Request Format

### District-Based
```json
{
  "country": "India",
  "state": "Punjab",
  "district": "Ludhiana",
  "years_back": 5,
  "include_respiratory": true,
  "include_cardiovascular": true,
  "include_mortality": true,
  "include_vulnerable": true,
  "analyze_annual": true,
  "analyze_peak": true,
  "analyze_frequency": true
}
```

### Custom Geometry
```json
{
  "geometry": {
    "type": "Polygon",
    "coordinates": [[[lng, lat], ...]]
  },
  "years_back": 5
}
```

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| country | string | - | Country name (required if not using geometry) |
| state | string | - | State/Province (required if not using geometry) |
| district | string | - | District name (required if not using geometry) |
| geometry | object | - | GeoJSON geometry (alternative to district) |
| years_back | int | 5 | Historical period (1-10 years) |
| include_respiratory | bool | true | Include respiratory health assessment |
| include_cardiovascular | bool | true | Include cardiovascular assessment |
| include_mortality | bool | true | Include mortality risk |
| include_vulnerable | bool | true | Include vulnerable populations |
| analyze_annual | bool | true | Analyze long-term chronic exposure |
| analyze_peak | bool | true | Analyze acute peak events |
| analyze_frequency | bool | true | Analyze episodic exposure |

## Response Format
```json
{
  "success": true,
  "location": "Ludhiana, Punjab, India",
  "analysis_period": {
    "years": 5,
    "start_date": "2019-12-26",
    "end_date": "2024-12-26"
  },
  "area_km2": 3767.23,
  "chronic_exposure": {
    "type": "Long-term Annual Average",
    "aod_statistics": {
      "average": 0.452,
      "minimum": 0.123,
      "maximum": 1.234,
      "median_p50": 0.398,
      "percentile_90": 0.876,
      "percentile_95": 1.023
    },
    "health_classification": "Unhealthy for Sensitive",
    "pm25_equivalent": "35-55 µg/m³",
    "health_message": "Sensitive groups may experience health effects",
    "long_term_risk": "Increased respiratory symptoms in sensitive individuals",
    "health_index": 3
  },
  "acute_exposure": {
    "type": "Peak Acute Exposure Events",
    "peak_aod_values": {
      "maximum": 1.234,
      "percentile_90": 0.876,
      "percentile_95": 1.023,
      "percentile_99": 1.156
    },
    "peak_classification": "Very Unhealthy",
    "health_message": "Health alert: Risk increased for everyone",
    "typical_peak_seasons": [
      {"season": "Oct-Dec", "note": "Post-monsoon, stubble burning"},
      {"season": "May-Jun", "note": "Summer heat and dust storms"}
    ],
    "health_alert": true
  },
  "episodic_exposure": {
    "type": "Exceedance Frequency Analysis",
    "threshold_aod": 0.55,
    "threshold_category": "Unhealthy",
    "exceedance_statistics": {
      "average_days_per_year": 45.2,
      "maximum_days": 67,
      "percentage_of_year": 12.4
    },
    "risk_level": "Moderate",
    "risk_description": "Frequent poor air quality episodes"
  },
  "health_impact_assessment": {
    "respiratory": {
      "name": "Respiratory Health Effects",
      "risk_status": "ELEVATED",
      "threshold_aod": 0.35,
      "conditions": [
        "Asthma exacerbation",
        "COPD aggravation",
        "Reduced lung function",
        "Increased respiratory infections"
      ]
    },
    "cardiovascular": {
      "name": "Cardiovascular Health Effects",
      "risk_status": "MODERATE",
      "threshold_aod": 0.55,
      "conditions": [
        "Increased blood pressure",
        "Heart attacks",
        "Stroke",
        "Irregular heartbeat"
      ]
    },
    "mortality": {
      "name": "Mortality Risk",
      "risk_status": "MODERATE",
      "threshold_aod": 0.55,
      "risk_categories": [
        "All-cause mortality",
        "Cardiopulmonary mortality",
        "Lung cancer mortality"
      ]
    },
    "vulnerable_populations": {
      "name": "Vulnerable Population Impact",
      "risk_status": "ELEVATED",
      "threshold_aod": 0.35,
      "at_risk_groups": [
        "Children under 5",
        "Elderly (>65 years)",
        "Pregnant women",
        "Immunocompromised individuals"
      ]
    }
  },
  "recommendations": {
    "individual_protection": [
      "Monitor daily air quality forecasts",
      "Use N95/N99 masks during high pollution days",
      "Keep indoor air clean with HEPA air purifiers",
      "Limit outdoor exercise during peak pollution hours"
    ],
    "community_interventions": [
      "Implement air quality early warning systems",
      "Establish clean air shelters in public facilities",
      "Develop emergency response plans for severe pollution",
      "Enhance healthcare capacity for pollution-related illnesses"
    ],
    "policy_recommendations": [
      "Strengthen emission controls and enforcement",
      "Promote clean energy transition",
      "Integrate air quality data into urban planning",
      "Support long-term epidemiological studies"
    ]
  }
}
```

## AOD Health Categories

| Category | AOD Range | PM2.5 Equivalent | Health Index |
|----------|-----------|------------------|--------------|
| Good | 0-0.15 | 0-15 µg/m³ | 1 |
| Moderate | 0.15-0.35 | 15-35 µg/m³ | 2 |
| Unhealthy for Sensitive | 0.35-0.55 | 35-55 µg/m³ | 3 |
| Unhealthy | 0.55-0.85 | 55-85 µg/m³ | 4 |
| Very Unhealthy | 0.85-1.5 | 85-150 µg/m³ | 5 |
| Hazardous | >1.5 | >150 µg/m³ | 6 |

## Data Sources
- Satellite: MODIS MAIAC (MCD19A2)
- Parameter: Aerosol Optical Depth at 0.47 µm
- Spatial Resolution: 1 km
- Temporal Coverage: 2000-present

## Use Cases
- Public health surveillance
- Air quality monitoring
- Urban planning
- Environmental impact assessment
- Policy enforcement

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

url = "https://climintell-api.onrender.com/api/safeair/analyze"
headers = {"X-API-Key": "climintell_safeair_YOUR_KEY"}
data = {
    "country": "India",
    "state": "Punjab",
    "district": "Ludhiana",
    "years_back": 5
}

response = requests.post(url, headers=headers, json=data, timeout=180)
result = response.json()
print(f"Health Classification: {result['chronic_exposure']['health_classification']}")
```

### cURL
```bash
curl -X POST https://climintell-api.onrender.com/api/safeair/analyze \
  -H "X-API-Key: climintell_safeair_YOUR_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "country": "India",
    "state": "Punjab",
    "district": "Ludhiana",
    "years_back": 5
  }'
```
