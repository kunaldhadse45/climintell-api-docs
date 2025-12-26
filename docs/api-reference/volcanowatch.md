# VolcanoWatch API Reference

## Product Overview
**VolcanoWatch** monitors volcanic degassing and detects eruption precursors using multi-gas satellite measurements (SO2, CO, CH4).

## Endpoint
```
POST https://climintell-api.onrender.com/api/volcanowatch/analyze
```

## Geographic Coverage
**Global Coverage:** Available for all active volcanoes worldwide
**Coordinate-Based:** Specify any latitude/longitude globally
**Sentinel-5P Coverage:** 2018-present

## Authentication
```
Header: X-API-Key: climintell_volcanowatch_YOUR_KEY
```

## Request Format
```json
{
  "latitude": 13.51,
  "longitude": 40.7164,
  "volcano_name": "Hayli Gubbi",
  "months_back": 6,
  "buffer_km": 10,
  "monitor_so2": true,
  "monitor_co": true,
  "monitor_ch4": true,
  "so2_weak_threshold": 0.0015,
  "so2_moderate_threshold": 0.005,
  "so2_high_threshold": 0.010
}
```

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| latitude | float | - | Volcano latitude in decimal degrees (-90 to 90, South is negative) **Required** |
| longitude | float | - | Volcano longitude in decimal degrees (-180 to 180, West is negative) **Required** |
| volcano_name | string | "Custom Location" | Name of volcano |
| months_back | int | 6 | Analysis period (3=3 months, 6=6 months, 12=1 year) |
| buffer_km | float | 10 | Monitoring radius in kilometers (5-30 km) |
| monitor_so2 | bool | true | Monitor SO2 emissions |
| monitor_co | bool | true | Monitor CO emissions |
| monitor_ch4 | bool | true | Monitor CH4 emissions |
| so2_weak_threshold | float | 0.0015 | Weak precursor threshold in mol/m² |
| so2_moderate_threshold | float | 0.005 | Moderate activity threshold in mol/m² |
| so2_high_threshold | float | 0.010 | High activity threshold in mol/m² |

### Coordinate System
**Decimal Degrees Format:**
- Latitude: -90 (South Pole) to +90 (North Pole)
- Longitude: -180 (West) to +180 (East)
- Example: Mount Etna = 37.7510°N, 14.9934°E → (37.7510, 14.9934)

## Response Format
```json
{
  "success": true,
  "volcano": {
    "name": "Hayli Gubbi",
    "latitude": 13.51,
    "longitude": 40.7164,
    "buffer_km": 10
  },
  "analysis_period": {
    "months": 6,
    "start_date": "2024-06-26",
    "end_date": "2024-12-26"
  },
  "thresholds": {
    "so2": {
      "background": 0.0002,
      "weak": 0.0015,
      "moderate": 0.005,
      "high": 0.010,
      "extreme": 0.020
    },
    "co": {
      "background": 0.030,
      "elevated": 0.040,
      "high": 0.050
    },
    "ch4": {
      "background": 1850,
      "elevated": 1900,
      "high": 1950
    }
  },
  "gas_measurements": {
    "so2": {
      "mean": 0.003456,
      "peak": 0.008923,
      "observations": 156
    },
    "co": {
      "mean": 0.035678,
      "observations": 148
    },
    "ch4": {
      "mean": 1876.5,
      "observations": 142
    }
  },
  "alert": {
    "status": "MODERATE ALERT",
    "color": "orange",
    "total_anomalies": 0
  },
  "interpretation": {
    "assessment": [
      "Elevated SO2 detected - increased volcanic unrest",
      "Possible pre-eruptive degassing (days warning)",
      "Recommendation: Increase monitoring frequency, check CO/CH4 for corroboration"
    ],
    "confidence": "Very High (multi-gas confirmation)"
  },
  "recommendations": [
    "Increase monitoring frequency to daily",
    "Prepare contingency plans",
    "Compare with historical baseline for this volcano",
    "Check for atmospheric artifacts (wind transport from distant sources)",
    "Validate with ground-based measurements if available"
  ],
  "data_sources": {
    "so2": "Sentinel-5P TROPOMI OFFL L3 SO2",
    "co": "Sentinel-5P TROPOMI OFFL L3 CO",
    "ch4": "Sentinel-5P TROPOMI OFFL L3 CH4",
    "spatial_resolution": "~1.1 km (TROPOMI native)",
    "temporal_resolution": "Daily (cloud permitting)"
  },
  "methodology": {
    "approach": "Multi-gas precursor analysis with automated anomaly detection",
    "validation": "Thresholds validated from Hayli Gubbi 2024 eruption",
    "spatial_averaging": "10 km radius buffer around volcano",
    "temporal_analysis": "6 months time series",
    "cloud_resistance": "SWIR (CO, CH4) and UV (SO2) wavelengths minimize cloud interference"
  },
  "validation_case_study": {
    "volcano": "Hayli Gubbi (Erta Ale), Ethiopia",
    "eruption_date": "2024-11-23",
    "precursor_signal": "SO2 = 0.002 mol/m² detected 5-6 days before",
    "co_eruptive_peak": "SO2 = 0.024 mol/m² on eruption day",
    "outcome": "Successful eruption detection with 5-day warning"
  },
  "scientific_references": [
    "Carn et al. (2017) - Multi-Satellite Volcano Monitoring - Scientific Reports",
    "Aiuppa et al. (2021) - Forecasting Etna Eruptions - Science Advances",
    "Theys et al. (2019) - Volcanic SO2 from TROPOMI - Scientific Reports",
    "Validated with Hayli Gubbi eruption (Nov 23, 2024)"
  ]
}
```

## Alert Status Levels

| Status | SO2 Peak | Meaning | Action |
|--------|----------|---------|--------|
| Normal | ``\<0``.0015 | Background levels | Routine monitoring |
| ELEVATED | 0.0015-0.005 | Weak signal | Continue monitoring |
| MODERATE ALERT | 0.005-0.010 | Increased unrest | Increase frequency |
| HIGH ALERT | 0.010-0.020 | Strong degassing | Activate protocols |
| EXTREME ALERT | >0.020 | Active eruption | Emergency response |

## Eruption Warning Timeline

| SO2 Level | Typical Warning Time | Interpretation |
|-----------|---------------------|----------------|
| Weak (0.0015) | 5-7 days | Early precursor |
| Moderate (0.005) | 2-3 days | Pre-eruptive |
| High (0.010) | Hours-1 day | Imminent |
| Extreme (0.020) | Co-eruptive | Eruption ongoing |

## Data Sources
- SO2: Sentinel-5P TROPOMI OFFL L3
- CO: Sentinel-5P TROPOMI OFFL L3
- CH4: Sentinel-5P TROPOMI OFFL L3
- Resolution: ~1.1 km (TROPOMI native)
- Coverage: 2018-present

## Use Cases
- Volcano early warning systems
- Aviation safety (ash hazard)
- Local population alerts
- Scientific volcano monitoring
- Hazard assessment

## Known Active Volcanoes (Examples)

| Volcano | Latitude | Longitude | Country |
|---------|----------|-----------|---------|
| Mount Etna | 37.7510 | 14.9934 | Italy |
| Kilauea | 19.4069 | -155.2834 | USA |
| Popocatepetl | 19.0225 | -98.6278 | Mexico |
| Sakurajima | 31.5850 | 130.6570 | Japan |
| Hayli Gubbi | 13.5100 | 40.7164 | Ethiopia |

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

url = "https://climintell-api.onrender.com/api/volcanowatch/analyze"
headers = {"X-API-Key": "climintell_volcanowatch_YOUR_KEY"}
data = {
    "latitude": 37.7510,
    "longitude": 14.9934,
    "volcano_name": "Mount Etna",
    "months_back": 6,
    "buffer_km": 15
}

response = requests.post(url, headers=headers, json=data, timeout=180)
result = response.json()
print(f"Alert Status: {result['alert']['status']}")
print(f"SO2 Peak: {result['gas_measurements']['so2']['peak']} mol/m²")
```

### cURL
```bash
curl -X POST https://climintell-api.onrender.com/api/volcanowatch/analyze \
  -H "X-API-Key: climintell_volcanowatch_YOUR_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "latitude": 37.7510,
    "longitude": 14.9934,
    "volcano_name": "Mount Etna",
    "months_back": 6,
    "buffer_km": 15
  }'
```
