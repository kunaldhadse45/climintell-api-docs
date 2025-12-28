# ClimIntell API Documentation

[![Documentation](https://img.shields.io/badge/docs-live-blue.svg)](https://climintell.github.io/api-docs/)
[![License](https://img.shields.io/badge/license-Proprietary-red.svg)](LICENSE)

Official API documentation for ClimIntell's satellite-based geospatial intelligence platform.

## 🌍 About ClimIntell

ClimIntell transforms satellite data into actionable intelligence for agriculture, environment, energy, and disaster monitoring. Our REST APIs provide production-ready access to complex Earth observation analysis without requiring infrastructure, GIS expertise, or satellite data management.

## 📚 Documentation Site

**Live Documentation:** [https://climintell.github.io/api-docs/](https://climintell.github.io/api-docs/)

## 🚀 Available APIs

| API | Description | Coverage |
|-----|-------------|----------|
| **AgriZone** | Crop suitability analysis | India (primary), Global |
| **SafeAir** | Air quality monitoring via AOD | India/South Asia, Global |
| **SolarVolt** | Solar power potential assessment | Global |
| **WindZone** | Wind power site screening | Global |
| **UVSafe** | UV radiation & skin health | Global |
| **VolcanoWatch** | Volcanic degassing monitoring | Global (all active volcanoes) |
| **StubbleFire** | Crop burning detection | India (Punjab, Haryana, UP, Delhi) |

## 🔑 Getting Started

1. **Request API Access**
   ```
   Email: climintell@gmail.com
   Include: Organization, use case, expected volume
   ```

2. **Review Documentation**
   - [Getting Started Guide](https://climintell.github.io/api-docs/docs/getting-started)
   - [Authentication](https://climintell.github.io/api-docs/docs/authentication)
   - [API Reference](https://climintell.github.io/api-docs/docs/api-reference)

3. **Make Your First Request**
   ```bash
   curl -X POST https://climintell-api.onrender.com/api/agrizone/analyze \
     -H "X-API-Key: YOUR_API_KEY" \
     -H "Content-Type: application/json" \
     -d '{
       "country": "India",
       "state": "Punjab",
       "district": "Sangrur",
       "crop_name": "Rice"
     }'
   ```

## 📖 Documentation Structure

```
docs/
├── intro.md                  # Overview & quick links
├── getting-started.md        # First API request tutorial
├── authentication.md         # API key usage & security
├── rate-limits.md           # Rate limiting & quotas
├── errors.md                # Error codes & handling
├── support.md               # Contact & help
└── api-reference/
    ├── agrizone.md          # AgriZone API complete reference
    ├── safeair.md           # SafeAir API reference
    ├── solarvolt.md         # SolarVolt API reference
    ├── windzone.md          # WindZone API reference
    ├── uvsafe.md            # UVSafe API reference
    ├── volcanowatch.md      # VolcanoWatch API reference
    └── stubblefire.md       # StubbleFire API reference
```

## 🛠️ Local Development

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone repository
git clone https://github.com/climintell/api-docs.git
cd api-docs

# Install dependencies
npm install

# Start development server
npm start
```

Documentation will be available at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

Builds static site to `build/` directory.

## 🚀 Deployment

This site is automatically deployed to GitHub Pages when changes are pushed to the `main` branch.

### Manual Deployment

```bash
npm run deploy
```

This command builds the site and pushes to the `gh-pages` branch.

## 📝 Contributing to Documentation

We welcome contributions to improve our documentation!

### Reporting Issues

Found an error or have a suggestion? 

1. **Open an Issue:** [GitHub Issues](https://github.com/climintell/api-docs/issues)
2. **Email Us:** climintell@gmail.com

### Submitting Changes

1. Fork the repository
2. Create a feature branch (`git checkout -b improve-docs`)
3. Make your changes
4. Commit with clear messages (`git commit -m "Fix: Correct AgriZone example"`)
5. Push to your fork (`git push origin improve-docs`)
6. Open a Pull Request

### Documentation Guidelines

- Use clear, concise language
- Include code examples for all concepts
- Test all code examples before submitting
- Follow existing formatting and structure
- Add screenshots/diagrams where helpful

## 📄 License

This documentation is proprietary and confidential. The ClimIntell API and associated documentation are the property of ClimIntell Private Limited.

## 🏢 About ClimIntell Private Limited

**Location:** W-13, Rakesh Kapoor Innovation Centre, BITS Pilani, Rajasthan, India  
**Incubated At:** BITS Pilani PIEDS

**Contact:**
- Email: climintell@gmail.com
- Website: [climintell.com](https://climintell.com)
- Documentation: [climintell.github.io/api-docs](https://climintell.github.io/api-docs)

## 🔗 Quick Links

- [Main Website](https://climintell.com)
- [Request API Access](mailto:climintell@gmail.com)
- [Report Issues](https://github.com/climintell/api-docs/issues)
- [Contributing Guide](CONTRIBUTING.md)

## 💬 Support

- **Email:** climintell@gmail.com
- **Response Time:** 24-48 hours
- **Business Hours:** Mon-Fri, 9 AM - 6 PM IST

---

**Built with** [Docusaurus](https://docusaurus.io/) • **Powered by** ClimIntell • © 2024 ClimIntell Private Limited
