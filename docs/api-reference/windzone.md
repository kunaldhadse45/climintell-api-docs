# WindZone API Reference

## Product Overview
**WindZone** screens inland regions for wind power potential by identifying terrain features that can enhance wind speeds through topographic effects.

## Endpoint
```
POST https://climintell-api.onrender.com/api/windzone/analyze
```

## Geographic Coverage
**Primary Focus:** India (inland low-wind regions)
**Global Coverage:** Available worldwide where SRTM elevation data exists
**Custom Areas:** Supported via GeoJSON geometry (any location globally)

## Authentication
```
Header: X-API-Key: climintell_windzone_YOUR_KEY
```

## Request Format

### District-Based
```json
{
  "country": "India",
  "state": "Punjab",
  "district": "Sangrur",
  "enhancement_profile": "Moderate",
  "custom_params": {
    "tpi_min": 15,
    "valley_depth_min": 50,
    "exposure_min": 20,
    "slope_max": 15,
    "min_patch_ha": 10
  },
  "enable_tpi": true,
  "enable_valley": true,
  "enable_exposure": true,
  "enable_slope": true,
  "enable_lulc": true,
  "enable_patch": true
}
```

### Custom Geometry
```json
{
  "geometry": {
    "type": "Polygon",
    "coordinates": [[[lng, lat], ...]]
  },
  "enhancement_profile": "Moderate"
}
```

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| country | string | - | Country name (required if not geometry) |
| state | string | - | State/Province (required if not geometry) |
| district | string | - | District name (required if not geometry) |
| geometry | object | - | GeoJSON geometry (alternative) |
| enhancement_profile | string | "Moderate" | "Conservative", "Moderate", or "Aggressive" |
| custom_params | object | null | Override profile thresholds (see below) |
| enable_tpi | bool | true | Apply Topographic Position Index constraint |
| enable_valley | bool | true | Apply valley depth/relief constraint |
| enable_exposure | bool | true | Apply wind exposure index constraint |
| enable_slope | bool | true | Apply slope construction feasibility constraint |
| enable_lulc | bool | true | Apply land cover suitability constraint |
| enable_patch | bool | true | Apply minimum patch size filter |

### Custom Parameters Object
```json
{
  "tpi_min": 15,              // Minimum TPI in meters (ridge height above surroundings)
  "valley_depth_min": 50,     // Minimum valley depth in meters (relief)
  "exposure_min": 20,         // Minimum exposure index in meters (wind fetch)
  "slope_max": 15,            // Maximum slope in degrees (0-90)
  "min_patch_ha": 10          // Minimum contiguous patch size in hectares
}
```

### Terrain Parameters Explained

**TPI (Topographic Position Index):**
- Measures elevation relative to surroundings
- Positive = Ridge/hilltop (good for wind)
- Negative = Valley/depression
- Example: TPI > 15m means site is 15m+ above surrounding terrain

**Valley Depth:**
- Vertical drop from site to valley floor
- Creates pressure gradients for wind acceleration
- Example: 50m depth = significant relief for venturi effect

**Wind Exposure Index:**
- Maximum elevation difference in 8 compass directions
- Measures openness to wind from all directions
- Higher values = better wind exposure

**Slope:**
- Terrain steepness in degrees
- 0° = Flat
- 15° = Moderate (still buildable)
- 30°+ = Very steep (difficult construction)

**Patch Size:**
- Minimum contiguous area for viable project
- Measured in hectares (1 ha = 10,000 m² = 2.47 acres)
- Example: 10 ha ≈ 14 soccer fields

## Enhancement Profiles

### Conservative Profile
**Best for:** High-confidence site selection

| Parameter | Threshold |
|-----------|-----------|
| TPI | > 20 m |
| Valley Depth | > 75 m |
| Wind Exposure | > 30 m |
| Slope | < 12° |
| Min Patch Size | 15 ha |

**Typical Results:** 2-8% of area suitable

### Moderate Profile (Recommended)
**Best for:** Initial screening

| Parameter | Threshold |
|-----------|-----------|
| TPI | > 15 m |
| Valley Depth | > 50 m |
| Wind Exposure | > 20 m |
| Slope | < 15° |
| Min Patch Size | 10 ha |

**Typical Results:** 5-15% of area suitable

### Aggressive Profile
**Best for:** Exploration

| Parameter | Threshold |
|-----------|-----------|
| TPI | > 10 m |
| Valley Depth | > 30 m |
| Wind Exposure | > 15 m |
| Slope | < 20° |
| Min Patch Size | 5 ha |

**Typical Results:** 10-25% of area suitable

## Response Format
```json
{
  "success": true,
  "enhancement_profile": "Moderate",
  "profile_description": "Balanced approach - recommended for initial screening",
  "location": "Sangrur, Punjab, India",
  "area_km2": 3569.45,
  "analysis_scale_meters": 500,
  "parameters_applied": {
    "tpi_threshold": ">15 m",
    "valley_depth_threshold": ">50 m",
    "exposure_threshold": ">20 m",
    "slope_threshold": "<15°",
    "min_patch_size": "10 ha"
  },
  "terrain_suitability": {
    "total_area_km2": 3569.45,
    "enhancement_zones_km2": 285.67,
    "enhancement_percent": 8.0,
    "unsuitable_area_km2": 3283.78,
    "suitability_rating": "Good",
    "priority_classification": "Moderate Priority"
  },
  "components_applied": [
    "TPI (Topographic Position)",
    "Valley Depth (Relief)",
    "Wind Exposure Index",
    "Slope Constraint",
    "Land Cover Suitability",
    "Minimum Patch Size Filter"
  ],
  "component_results": {
    "tpi": {
      "name": "Topographic Position Index",
      "threshold": ">15 m",
      "mean_value": 8.3,
      "min_value": -45.2,
      "max_value": 78.5,
      "interpretation": "Positive TPI indicates ridges/elevated positions favorable for wind enhancement"
    },
    "valley_depth": {
      "name": "Valley Depth (Relief)",
      "threshold": ">50 m",
      "mean_value": 42.1,
      "min_value": 0.0,
      "max_value": 156.3,
      "interpretation": "Significant relief creates pressure gradients for wind acceleration"
    },
    "wind_exposure": {
      "name": "Wind Exposure Index",
      "threshold": ">20 m",
      "mean_value": 15.7,
      "min_value": -30.2,
      "max_value": 95.4,
      "interpretation": "Measures directional exposure to wind flow from all directions"
    },
    "slope": {
      "name": "Slope Constraint",
      "threshold": "<15°",
      "mean_value": 2.8,
      "min_value": 0.0,
      "max_value": 18.3,
      "interpretation": "Ensures construction feasibility for wind turbine foundations"
    },
    "land_cover": {
      "name": "Land Cover Suitability",
      "threshold": "Barren/Shrubland/Grassland only",
      "suitable_area_km2": 2145.32,
      "coverage_percent": 60.1,
      "interpretation": "Avoids forests, water bodies, and built-up areas"
    }
  },
  "interpretation": "Good terrain potential. 8.0% of area identified with suitable topographic features.",
  "recommendations": [
    "Focus on largest contiguous enhancement zones",
    "Install met towers in 2-3 strategic locations",
    "Validate with 6-12 months of wind data",
    "Compare with neighboring areas for optimization",
    "Assess economic viability with current technology"
  ],
  "methodology": {
    "approach": "Topographic Wind Enhancement Screening",
    "target": "Plateau-valley configurations with venturi effects",
    "analysis_type": "Terrain-only (no wind data)",
    "validation_requirement": "All sites require met tower validation"
  },
  "important_limitations": [
    "This is a TERRAIN SCREENING tool - wind climate data NOT included",
    "Identified zones have favorable topography but require wind validation",
    "Actual wind speeds must be measured with met towers (12+ months)",
    "No consideration of land ownership, grid access, or regulatory constraints"
  ]
}
```

## Suitability Ratings

| Rating | Enhancement % | Priority | Action |
|--------|---------------|----------|--------|
| Excellent | ≥15% | High | Install 3-5 met towers, 12-month validation |
| Good | 5-14% | Moderate | Install 2-3 met towers, 6-12 month validation |
| Moderate | 2-4% | Low | Consider 1-2 met towers, evaluate alternatives |
| Limited | <2% | Not Recommended | Explore other locations |

## Data Sources
- Elevation: SRTM 90m Digital Elevation Model
- Land Cover: ESA WorldCover 10m (2021)
- Terrain Analysis: Multi-scale TPI, valley depth, exposure index

## Use Cases
- Inland wind farm site screening
- Preliminary resource assessment
- Met tower placement optimization
- Regional wind potential mapping
- Low-wind region exploration

## Important Limitations
1. **No Wind Data**: Terrain analysis only - wind speeds must be validated
2. **Screening Level**: Not suitable for final micrositing decisions
3. **Met Tower Required**: 12+ months validation essential
4. **Regulatory Not Included**: Land use, environment not considered

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

url = "https://climintell-api.onrender.com/api/windzone/analyze"
headers = {"X-API-Key": "climintell_windzone_YOUR_KEY"}
data = {
    "country": "India",
    "state": "Punjab",
    "district": "Sangrur",
    "enhancement_profile": "Moderate"
}

response = requests.post(url, headers=headers, json=data, timeout=180)
result = response.json()
print(f"Enhancement %: {result['terrain_suitability']['enhancement_percent']}")
print(f"Rating: {result['terrain_suitability']['suitability_rating']}")
```

### cURL
```bash
curl -X POST https://climintell-api.onrender.com/api/windzone/analyze \
  -H "X-API-Key: climintell_windzone_YOUR_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "country": "India",
    "state": "Punjab",
    "district": "Sangrur",
    "enhancement_profile": "Moderate"
  }'
```
