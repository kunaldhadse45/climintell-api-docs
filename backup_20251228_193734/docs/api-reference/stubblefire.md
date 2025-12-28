# StubbleFire API Reference

## Product Overview
**StubbleFire** detects crop residue burning events using multi-sensor satellite analysis (MODIS fire, VIIRS nightlights, Sentinel-2 burned area, Sentinel-5P atmospheric).

## Endpoint
```
POST https://climintell-api.onrender.com/api/stubblefire/analyze
```

## Geographic Coverage
**Primary Focus:** India (Punjab, Haryana, Uttar Pradesh, Delhi)
**Limited Coverage:** Designed specifically for Indian agricultural burning seasons
**Custom Areas:** Supported within India via GeoJSON geometry

## Authentication
```
Header: X-API-Key: climintell_stubblefire_YOUR_KEY
```

## Request Format

### District-Based with Burning Season
```json
{
  "country": "India",
  "state": "Punjab",
  "district": "Sangrur",
  "season": "Post-Kharif",
  "year": 2023,
  "enable_modis": true,
  "enable_viirs": true,
  "enable_sentinel2": true,
  "enable_atmospheric": true,
  "fire_confidence_min": 7,
  "frp_min": 5,
  "nightlight_anomaly_threshold": 5,
  "burn_severity_threshold": 0.1
}
```

### Custom Period
```json
{
  "country": "India",
  "state": "Punjab",
  "district": "Sangrur",
  "season": "Custom",
  "custom_start_date": "2023-10-01",
  "custom_end_date": "2023-11-30",
  "enable_modis": true
}
```

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| country | string | - | Country name (required if not geometry) |
| state | string | - | State/Province (required if not geometry) |
| district | string | - | District name (required if not geometry) |
| geometry | object | - | GeoJSON geometry (alternative) |
| season | string | "Post-Kharif" | Burning season: "Post-Kharif", "Post-Rabi", "Post-Zaid", "Custom" |
| year | int | 2023 | Year of analysis (2018-current year) |
| custom_start_date | string | null | Custom start date (YYYY-MM-DD format, required if season="Custom") |
| custom_end_date | string | null | Custom end date (YYYY-MM-DD format, required if season="Custom") |
| enable_modis | bool | true | Use MODIS active fire detection |
| enable_viirs | bool | true | Use VIIRS nighttime lights anomaly |
| enable_sentinel2 | bool | true | Use Sentinel-2 burned area mapping |
| enable_atmospheric | bool | true | Use Sentinel-5P CO/Aerosol analysis |
| fire_confidence_min | int | 7 | MODIS fire confidence (7=Low, 8=Nominal, 9=High) |
| frp_min | float | 5 | Minimum Fire Radiative Power in MW (megawatts) |
| nightlight_anomaly_threshold | float | 5 | VIIRS radiance anomaly threshold in nanoWatts/cm²/sr |
| burn_severity_threshold | float | 0.1 | dNBR threshold (0-1, higher = more severe burn) |

### Detection Parameter Explanations

**MODIS Fire Confidence:**
- 7 = Low confidence (possible false positives)
- 8 = Nominal confidence (standard detection)
- 9 = High confidence (strong thermal signal)
- **Recommended:** 7 for comprehensive detection, 8-9 for high-confidence only

**Fire Radiative Power (FRP):**
- Measures fire intensity in megawatts
- Higher FRP = more intense fire
- Typical crop fires: 5-50 MW
- Large fires: 100+ MW
- **Recommended:** 5 MW minimum to filter noise

**VIIRS Nightlight Anomaly:**
- Measures excess nighttime radiance
- Units: nanoWatts/cm²/sr
- Background: ~0-2
- Fire signal: 5-20+
- **Recommended:** 5 for moderate sensitivity

**Burn Severity (dNBR):**
- Delta Normalized Burn Ratio
- Range: -1 to +1
- ``\<0``.1 = Unburned
- 0.1-0.25 = Low severity
- 0.25-0.45 = Moderate severity
- >0.45 = High severity
- **Recommended:** 0.1 for crop fires

## Burning Seasons

### Post-Kharif (Rice Stubble)
- **Period:** October 1 - November 30
- **Crop:** Rice
- **Peak:** Mid-October to Early November
- **States:** Punjab, Haryana, Uttar Pradesh, Delhi

### Post-Rabi (Wheat Stubble)
- **Period:** April 15 - May 31
- **Crop:** Wheat
- **Peak:** Late April to Mid-May
- **States:** Punjab, Haryana, Uttar Pradesh, Madhya Pradesh

### Post-Zaid (Summer Crops)
- **Period:** July 1 - September 30
- **Crop:** Mixed
- **Peak:** July-September
- **States:** Uttar Pradesh, Bihar, West Bengal

### Custom
- **Period:** User-defined
- **Requires:** custom_start_date and custom_end_date

## Response Format
```json
{
  "success": true,
  "season": "Post-Kharif",
  "location": "Sangrur, Punjab, India",
  "season_info": {
    "crop": "Rice",
    "peak_period": "Mid-October to Early November",
    "description": "Rice stubble burning after Kharif harvest"
  },
  "analysis_period": {
    "year": 2023,
    "start_date": "2023-10-01",
    "end_date": "2023-11-30"
  },
  "area_km2": 3569.45,
  "cropland_area_km2": 2456.78,
  "analysis_scale_meters": 1000,
  "detection_results": {
    "modis": {
      "fire_count": 1245,
      "fire_area_km2": 125.6,
      "fire_area_percent": 5.1
    },
    "viirs": {
      "mean_anomaly": 8.5,
      "max_anomaly": 25.3,
      "data_available": true
    },
    "sentinel2": {
      "burned_area_km2": 98.7,
      "burned_area_percent": 4.0,
      "data_available": true
    },
    "atmospheric": {
      "mean_co": 0.038456,
      "mean_aerosol_index": 1.234
    }
  },
  "interpretation": {
    "severity": "High",
    "assessment": [
      "High burning activity detected. 1245 fire detections covering 5.1% of cropland suggest significant stubble burning."
    ]
  },
  "recommendations": [
    "Target enforcement in fire hotspot zones",
    "Provide alternative stubble management equipment",
    "Increase farmer awareness during peak burning periods",
    "Implement penalties for repeat offenders",
    "Subsidize mechanized stubble management"
  ],
  "data_sources": {
    "cropland_mask": "ESA WorldCover 10m (2021)",
    "modis_fire": "MODIS/061/MOD14A1 & MYD14A1 (Terra + Aqua)",
    "viirs": "NOAA VIIRS DNB Monthly",
    "sentinel2": "Sentinel-2 MSI Level-2A",
    "atmospheric": "Sentinel-5P TROPOMI CO & Aerosol"
  },
  "methodology": {
    "approach": "Multi-sensor satellite fire detection",
    "temporal_resolution": "Daily (MODIS/S2), Monthly (VIIRS)",
    "spatial_resolution": "1000m analysis scale",
    "validation": "Multi-criteria cross-validation when multiple sensors enabled"
  }
}
```

## Severity Levels

| Severity | Fire Area % | Fire Count | Action Required |
|----------|-------------|------------|-----------------|
| Minimal | ``\<0`.1% | ``\<1`0 | Routine monitoring |
| Low | 0.1-2% | 10-100 | Monitor locations |
| Moderate | 2-5% | 100-500 | Engage with farmers |
| High | 5-10% | 500-2000 | Enforcement + equipment |
| Very High | >10% | >2000 | Emergency response |

## Detection Methods

### MODIS Active Fire
- **Sensors:** Terra + Aqua MODIS
- **Resolution:** 1 km
- **Frequency:** 4x daily
- **Detects:** Thermal anomalies (active fires)

### VIIRS Nighttime Lights
- **Sensor:** NOAA VIIRS DNB
- **Resolution:** 500 m
- **Frequency:** Monthly composites
- **Detects:** Nighttime radiance anomalies

### Sentinel-2 Burned Area
- **Sensor:** Sentinel-2 MSI
- **Resolution:** 10-20 m
- **Frequency:** 5-day revisit
- **Detects:** Post-fire burn scars (dNBR)

### Sentinel-5P Atmospheric
- **Sensor:** TROPOMI
- **Resolution:** 5 km
- **Parameters:** CO, Aerosol Index
- **Detects:** Smoke plume impacts

## Data Availability Notes

### VIIRS Nightlights
- May not be available for very recent dates (1-2 month lag)
- Data before 2014 not available
- API continues with other methods if unavailable

### Sentinel-2
- Requires cloud-free imagery
- May not be available in cloudy/monsoon periods
- API reports data availability status

## Use Cases
- Government policy enforcement
- Air quality impact assessment
- Agricultural extension services
- Environmental monitoring
- Compliance verification
- Farmer awareness campaigns

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

### Python - Post-Kharif Season
```python
import requests

url = "https://climintell-api.onrender.com/api/stubblefire/analyze"
headers = {"X-API-Key": "climintell_stubblefire_YOUR_KEY"}
data = {
    "country": "India",
    "state": "Punjab",
    "district": "Sangrur",
    "season": "Post-Kharif",
    "year": 2023
}

response = requests.post(url, headers=headers, json=data, timeout=180)
result = response.json()
print(f"Severity: {result['interpretation']['severity']}")
print(f"Fire Count: {result['detection_results']['modis']['fire_count']}")
print(f"Fire Area %: {result['detection_results']['modis']['fire_area_percent']}")
```

### cURL - Custom Period
```bash
curl -X POST https://climintell-api.onrender.com/api/stubblefire/analyze \
  -H "X-API-Key: climintell_stubblefire_YOUR_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "country": "India",
    "state": "Punjab",
    "district": "Sangrur",
    "season": "Custom",
    "custom_start_date": "2023-10-15",
    "custom_end_date": "2023-11-15"
  }'
```

## Common Analysis Patterns

### Compare Yearly Trends
```python
years = [2020, 2021, 2022, 2023]
for year in years:
    response = requests.post(url, headers=headers, json={
        "country": "India",
        "state": "Punjab",
        "district": "Sangrur",
        "season": "Post-Kharif",
        "year": year
    })
    result = response.json()
    print(f"{year}: {result['detection_results']['modis']['fire_count']} fires")
```

### Multi-District Comparison
```python
districts = ["Sangrur", "Ludhiana", "Patiala"]
for district in districts:
    response = requests.post(url, headers=headers, json={
        "country": "India",
        "state": "Punjab",
        "district": district,
        "season": "Post-Kharif",
        "year": 2023
    })
    result = response.json()
    print(f"{district}: {result['interpretation']['severity']}")
```
