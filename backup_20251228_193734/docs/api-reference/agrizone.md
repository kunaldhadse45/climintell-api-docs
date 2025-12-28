# AgriZone API Reference

## Product Overview
**AgriZone** analyzes land suitability for crop cultivation using multi-criteria assessment of climate, soil, terrain, and land cover conditions.

## Endpoint
```
POST https://climintell-api.onrender.com/api/agrizone/analyze
```

## Geographic Coverage
**Primary Focus:** India (all states and union territories)  
**Global Coverage:** Available for most countries worldwide using FAO GAUL boundaries  
**Custom Areas:** Supported via GeoJSON geometry (any location globally)

## Authentication
```
Header: X-API-Key: climintell_agrizone_YOUR_KEY
```

## Request Format

### District-Based
```json
{
  "country": "India",
  "state": "Punjab",
  "district": "Sangrur",
  "crop_name": "Rice",
  "start_month": 6,
  "end_month": 10,
  "years_back": 5,
  "constraints": {
    "temperature": {"min": 20, "max": 35, "enabled": true},
    "rainfall": {"min": 1000, "max": 2500, "enabled": true},
    "slope": {"max": 10, "enabled": true},
    "elevation": {"max": 2000, "enabled": true},
    "soil_types": {"types": [4,5,6,7,8], "enabled": true},
    "lulc_types": {"types": [10,12,14], "enabled": true}
  }
}
```

### Custom Geometry
```json
{
  "geometry": {
    "type": "Polygon",
    "coordinates": [[[lng, lat], ...]]
  },
  "crop_name": "Wheat",
  "start_month": 11,
  "end_month": 4,
  "years_back": 5
}
```

## Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| country | string | Yes* | - | Country name |
| state | string | Yes* | - | State/Province |
| district | string | Yes* | - | District name |
| geometry | object | Yes* | - | GeoJSON geometry |
| crop_name | string | No | "Custom Crop" | Crop name |
| start_month | int | No | 6 | Growing season start month (1=Jan, 12=Dec) |
| end_month | int | No | 10 | Growing season end month (1=Jan, 12=Dec) |
| years_back | int | No | 5 | Historical period (1-10 years) |
| constraints | object | No | Default set | Suitability constraints |

*Either district OR geometry required

### Month Numbers
| Number | Month | Number | Month |
|--------|-------|--------|-------|
| 1 | January | 7 | July |
| 2 | February | 8 | August |
| 3 | March | 9 | September |
| 4 | April | 10 | October |
| 5 | May | 11 | November |
| 6 | June | 12 | December |

### Constraints Object
```json
{
  "temperature": {
    "min": 20,
    "max": 35,
    "enabled": true
  },
  "rainfall": {
    "min": 1000,
    "max": 2500,
    "enabled": true
  },
  "slope": {
    "max": 10,
    "enabled": true
  },
  "elevation": {
    "max": 2000,
    "enabled": true
  },
  "soil_types": {
    "types": [4, 5, 6, 7, 8],
    "enabled": true
  },
  "lulc_types": {
    "types": [10, 12, 14],
    "enabled": true
  }
}
```

### Soil Type Codes (USDA Texture Classification)
| Code | Texture Class | Description |
|------|---------------|-------------|
| 1 | Clay | Heavy, water-retentive |
| 2 | Silty Clay | Fine-textured |
| 3 | Sandy Clay | Coarse clay |
| 4 | Clay Loam | **Good for most crops** |
| 5 | Silty Clay Loam | **Good drainage + retention** |
| 6 | Sandy Clay Loam | **Well-drained** |
| 7 | Loam | **Ideal agricultural soil** |
| 8 | Silty Loam | **Fertile, good structure** |
| 9 | Sandy Loam | Light, well-drained |
| 10 | Silt | Fine, moisture-retentive |
| 11 | Loamy Sand | Coarse, low retention |
| 12 | Sand | Very coarse, poor retention |

**Recommended for most crops:** [4, 5, 6, 7, 8]

### Land Use/Land Cover Codes (MODIS MCD12Q1)
| Code | Class | Suitable for Agriculture |
|------|-------|--------------------------|
| 1 | Evergreen Needleleaf Forest | No |
| 2 | Evergreen Broadleaf Forest | No |
| 3 | Deciduous Needleleaf Forest | No |
| 4 | Deciduous Broadleaf Forest | No |
| 5 | Mixed Forests | No |
| 6 | Closed Shrublands | Marginal |
| 7 | Open Shrublands | Marginal |
| 8 | Woody Savannas | Marginal |
| 9 | Savannas | Yes |
| 10 | Grasslands | **Yes** |
| 11 | Permanent Wetlands | No |
| 12 | Croplands | **Yes (already agriculture)** |
| 13 | Urban/Built-up | No |
| 14 | Cropland/Natural Vegetation Mosaic | **Yes** |
| 15 | Snow/Ice | No |
| 16 | Barren | Marginal |
| 17 | Water Bodies | No |

**Recommended for new agriculture:** [10, 12, 14]  
**Include marginal lands:** [6, 7, 8, 9, 10, 12, 14, 16]

## Response Format
```json
{
  "success": true,
  "crop_name": "Rice",
  "location": "Sangrur, Punjab, India",
  "growing_season": {
    "start_month": 6,
    "end_month": 10,
    "season_length_months": 5
  },
  "analysis_period": {
    "years": 5,
    "start_date": "2019-12-26",
    "end_date": "2024-12-26"
  },
  "area_analysis": {
    "total_area_km2": 3569.45,
    "suitable_area_km2": 2456.78,
    "suitability_percent": 68.8,
    "unsuitable_area_km2": 1112.67
  },
  "constraints_applied": [
    "Temperature (20-35°C)",
    "Rainfall (1000-2500 mm)",
    "Slope (<=10°)",
    "Elevation (<=2000 m)"
  ],
  "constraint_results": {
    "temperature": {
      "range": "20-35°C",
      "actual_mean": 28.5,
      "actual_min": 18.2,
      "actual_max": 39.1
    },
    "rainfall": {
      "range": "1000-2500 mm",
      "actual_total": 1250.5,
      "water_deficit": 0,
      "water_excess": 0
    },
    "slope": {
      "range": "<=10°",
      "actual_mean": 2.3,
      "actual_max": 15.8
    },
    "elevation": {
      "range": "<=2000 m",
      "actual_mean": 245.6,
      "actual_max": 450.2
    }
  },
  "interpretation": "Good suitability. 68.8% of area meets all constraints.",
  "irrigation_requirement": {
    "needed": false
  },
  "analysis_scale_meters": 500
}
```

## Use Cases
- Crop selection for new regions
- Agricultural planning and zoning
- Investment site selection
- Climate change adaptation planning
- Precision agriculture zoning

## Data Sources
- Temperature: ERA5-Land Monthly (11km)
- Rainfall: CHIRPS Daily (5km)
- Elevation/Slope: SRTM 90m DEM
- Soil: OpenLandMap Soil Texture
- Land Cover: MODIS MCD12Q1

## Common Crop Parameters

### Rice (Kharif)
```json
{
  "start_month": 6,
  "end_month": 10,
  "constraints": {
    "temperature": {"min": 20, "max": 35, "enabled": true},
    "rainfall": {"min": 1000, "max": 2500, "enabled": true}
  }
}
```

### Wheat (Rabi)
```json
{
  "start_month": 11,
  "end_month": 4,
  "constraints": {
    "temperature": {"min": 10, "max": 25, "enabled": true},
    "rainfall": {"min": 300, "max": 900, "enabled": true}
  }
}
```

### Cotton
```json
{
  "start_month": 4,
  "end_month": 10,
  "constraints": {
    "temperature": {"min": 21, "max": 35, "enabled": true},
    "rainfall": {"min": 500, "max": 1200, "enabled": true}
  }
}
```

## Error Codes
- 400: Missing required fields
- 401: API key required
- 403: Invalid API key
- 429: Rate limit exceeded
- 500: Processing error

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
with open('agrizone_results.json', 'w') as f:
    json.dump(result, f, indent=2)

# Export to CSV (summary)
import csv
with open('agrizone_summary.csv', 'w') as f:
    writer = csv.writer(f)
    writer.writerow(['Metric', 'Value'])
    writer.writerow(['Total Area km2', result['area_analysis']['total_area_km2']])
    writer.writerow(['Suitable Area km2', result['area_analysis']['suitable_area_km2']])
    writer.writerow(['Suitability %', result['area_analysis']['suitability_percent']])
```

### GeoJSON Export
If you need spatial data for GIS applications, use the geometry from your request to create a GeoJSON feature:

```python
geojson = {
    "type": "Feature",
    "properties": {
        "suitability_percent": result['area_analysis']['suitability_percent'],
        "suitable_area_km2": result['area_analysis']['suitable_area_km2'],
        "crop": result['crop_name']
    },
    "geometry": your_input_geometry
}
```

## Batch Processing

### Sequential Analysis
For analyzing multiple districts, make sequential API calls:

```python
districts = [
    {"state": "Punjab", "district": "Sangrur"},
    {"state": "Punjab", "district": "Ludhiana"},
    {"state": "Haryana", "district": "Karnal"}
]

results = []
for d in districts:
    response = requests.post(url, headers=headers, json={
        "country": "India",
        "state": d["state"],
        "district": d["district"],
        "crop_name": "Rice",
        "start_month": 6,
        "end_month": 10
    }, timeout=180)
    results.append(response.json())
    time.sleep(2)  # Rate limiting courtesy
```

### Parallel Processing (Advanced)
For users with higher rate limits:

```python
from concurrent.futures import ThreadPoolExecutor
import time

def analyze_district(district_info):
    response = requests.post(url, headers=headers, json=district_info, timeout=180)
    return response.json()

# Limit concurrent requests based on your rate limit
with ThreadPoolExecutor(max_workers=3) as executor:
    results = list(executor.map(analyze_district, district_configs))
```

**Note:** Batch processing is subject to your API rate limits. Contact support for bulk analysis needs.

## Rate Limits
Varies by subscription tier (10-200 requests/day)

## Example Usage

### Python
```python
import requests

url = "https://climintell-api.onrender.com/api/agrizone/analyze"
headers = {"X-API-Key": "climintell_agrizone_YOUR_KEY"}
data = {
    "country": "India",
    "state": "Punjab",
    "district": "Sangrur",
    "crop_name": "Rice",
    "start_month": 6,
    "end_month": 10,
    "years_back": 5
}

response = requests.post(url, headers=headers, json=data, timeout=180)
print(response.json())
```

### cURL
```bash
curl -X POST https://climintell-api.onrender.com/api/agrizone/analyze \
  -H "X-API-Key: climintell_agrizone_YOUR_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "country": "India",
    "state": "Punjab",
    "district": "Sangrur",
    "crop_name": "Rice",
    "start_month": 6,
    "end_month": 10
  }'
```
