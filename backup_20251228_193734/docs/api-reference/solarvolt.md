# SolarVolt API Reference

## Product Overview
**SolarVolt** assesses solar power generation potential using solar radiation, cloud cover, terrain, and land suitability analysis.

## Endpoint
```
POST https://climintell-api.onrender.com/api/solarvolt/analyze
```

## Geographic Coverage
**Primary Focus:** India
**Global Coverage:** Available worldwide
**Custom Areas:** Supported via GeoJSON geometry (any location globally)

## Authentication
```
Header: X-API-Key: climintell_solarvolt_YOUR_KEY
```

## Request Format

### District-Based
```json
{
  "country": "India",
  "state": "Punjab",
  "district": "Sangrur",
  "years_back": 5,
  "panel_efficiency": 0.20,
  "performance_ratio": 0.75,
  "slope_max": 10,
  "elevation_max": 3000,
  "exclude_urban": true,
  "exclude_water": true,
  "exclude_forest": true,
  "min_patch_size_ha": 5
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
| country | string | - | Country name (required if not geometry) |
| state | string | - | State/Province (required if not geometry) |
| district | string | - | District name (required if not geometry) |
| geometry | object | - | GeoJSON geometry (alternative) |
| years_back | int | 5 | Historical period (1-10 years) |
| panel_efficiency | float | 0.20 | Solar panel efficiency (0.15-0.25 = 15%-25%) |
| performance_ratio | float | 0.75 | System performance ratio (0.6-0.85 = 60%-85%) |
| slope_max | float | 10 | Maximum terrain slope in degrees (0-90) |
| elevation_max | float | 3000 | Maximum elevation in meters above sea level |
| exclude_urban | bool | true | Exclude urban/built-up areas |
| exclude_water | bool | true | Exclude water bodies |
| exclude_forest | bool | true | Exclude forests |
| min_patch_size_ha | float | 5 | Minimum contiguous area in hectares (1 ha = 10,000 m²) |

### Solar System Parameters Explained

**Panel Efficiency:**
- Percentage of sunlight converted to electricity
- Typical range:
  - 0.15 (15%) = Standard polycrystalline panels
  - 0.18-0.20 (18-20%) = Standard monocrystalline panels
  - 0.22-0.25 (22-25%) = High-efficiency monocrystalline
  - 0.25+ (25%+) = Premium/bifacial panels
- **Recommended:** 0.20 (20%) for realistic estimates

**Performance Ratio (PR):**
- Accounts for real-world losses:
  - Temperature losses
  - Inverter losses
  - Cable losses
  - Soiling/dust
  - Shading
  - System downtime
- Typical range:
  - 0.60-0.70 (60-70%) = Poor installation/maintenance
  - 0.70-0.80 (70-80%) = Standard commercial systems
  - 0.80-0.85 (80-85%) = Well-designed systems
- **Recommended:** 0.75 (75%) for conservative estimates

**Capacity Factor:**
- Calculated from solar radiation and system parameters
- Typical values:
  - 15-18% = Good solar regions
  - 18-22% = Excellent solar regions
  - 22%+ = Desert/high-altitude regions

### Area Measurements
- **Hectare (ha):** 1 ha = 10,000 m² = 2.47 acres
- **Example:** 5 ha = 50,000 m² = 12.4 acres = ~7 football fields

## Response Format
```json
{
  "success": true,
  "location": "Sangrur, Punjab, India",
  "analysis_period": {
    "years": 5,
    "start_date": "2019-12-26",
    "end_date": "2024-12-26"
  },
  "area_km2": 3569.45,
  "solar_resource_assessment": {
    "annual_solar_radiation": {
      "mean_kwh_m2_year": 1850.5,
      "min_kwh_m2_year": 1650.2,
      "max_kwh_m2_year": 2050.8,
      "seasonal_variation_percent": 35.2
    },
    "monthly_averages": [
      {"month": "Jan", "radiation_kwh_m2": 120.5},
      {"month": "Feb", "radiation_kwh_m2": 145.2},
      ...
    ],
    "classification": "Excellent",
    "suitability_score": 8.5
  },
  "cloud_cover_analysis": {
    "annual_mean_percent": 28.5,
    "clear_sky_days_per_year": 245,
    "impact_on_generation": "Low",
    "seasonal_patterns": [
      {"season": "Winter", "cloud_cover_percent": 15.2},
      {"season": "Monsoon", "cloud_cover_percent": 65.8},
      ...
    ]
  },
  "land_suitability": {
    "total_area_km2": 3569.45,
    "suitable_area_km2": 2456.78,
    "suitability_percent": 68.8,
    "unsuitable_area_km2": 1112.67,
    "constraints_applied": [
      "Slope (`\<1`0°)",
      "Elevation (`\<3`000 m)",
      "Land Cover (exclude urban/water/forest)",
      "Minimum patch size (5 ha)"
    ],
    "terrain_statistics": {
      "mean_slope_degrees": 2.3,
      "max_slope_degrees": 15.8,
      "mean_elevation_m": 245.6,
      "max_elevation_m": 450.2
    }
  },
  "generation_potential": {
    "system_parameters": {
      "panel_efficiency": 0.20,
      "performance_ratio": 0.75,
      "capacity_factor": 0.198
    },
    "per_hectare": {
      "installed_capacity_mw": 0.5,
      "annual_generation_mwh": 868.5,
      "daily_average_kwh": 2379.5
    },
    "total_potential": {
      "suitable_area_ha": 245678,
      "max_installed_capacity_mw": 122839,
      "annual_generation_gwh": 213345.8,
      "equivalent_homes_powered": 1895210
    }
  },
  "environmental_benefits": {
    "co2_avoided_tonnes_year": 168902.5,
    "coal_avoided_tonnes_year": 85641.2,
    "trees_equivalent": 7650120,
    "cars_off_road_equivalent": 36785
  },
  "economic_indicators": {
    "levelized_cost_estimate_usd_kwh": 0.045,
    "payback_period_years": 6.5,
    "capacity_utilization_factor": 19.8,
    "land_requirement_ha_per_mw": 2.0
  },
  "interpretation": "Excellent solar potential. Annual radiation of 1850 kWh/m²/year with 68.8% suitable land.",
  "recommendations": [
    "Priority zones: Areas with >1900 kWh/m²/year radiation",
    "Install ground-mounted systems on suitable land",
    "Consider bifacial panels for enhanced generation",
    "Grid integration study recommended for large-scale deployment",
    "Monsoon season shows reduced generation - plan maintenance"
  ]
}
```

## Solar Resource Classification

| Classification | Annual Radiation | Suitability |
|----------------|------------------|-------------|
| Excellent | >1800 kWh/m²/year | Highly suitable |
| Very Good | 1600-1800 | Very suitable |
| Good | 1400-1600 | Suitable |
| Moderate | 1200-1400 | Marginally suitable |
| Poor | ``\<1``200 | Not recommended |

## Data Sources
- Solar Radiation: ERA5-Land Surface Solar Radiation
- Cloud Cover: MODIS Cloud Fraction
- Elevation/Slope: SRTM 90m DEM
- Land Cover: ESA WorldCover 10m

## Use Cases
- Solar farm site selection
- Rooftop solar assessment
- Renewable energy planning
- Investment feasibility studies
- Grid integration planning

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

url = "https://climintell-api.onrender.com/api/solarvolt/analyze"
headers = {"X-API-Key": "climintell_solarvolt_YOUR_KEY"}
data = {
    "country": "India",
    "state": "Punjab",
    "district": "Sangrur",
    "years_back": 5,
    "panel_efficiency": 0.22,
    "min_patch_size_ha": 10
}

response = requests.post(url, headers=headers, json=data, timeout=180)
result = response.json()
print(f"Annual Radiation: {result['solar_resource_assessment']['annual_solar_radiation']['mean_kwh_m2_year']} kWh/m²")
```

### cURL
```bash
curl -X POST https://climintell-api.onrender.com/api/solarvolt/analyze \
  -H "X-API-Key: climintell_solarvolt_YOUR_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "country": "India",
    "state": "Punjab",
    "district": "Sangrur",
    "years_back": 5
  }'
```
