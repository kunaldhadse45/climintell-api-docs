// @ts-check
const lightCodeTheme = require('prism-react-renderer').themes.github;
const darkCodeTheme = require('prism-react-renderer').themes.dracula;

const config = {
  title: 'ClimIntell API Documentation',
  tagline: 'Satellite-based Geospatial Intelligence APIs',
  favicon: 'img/favicon.ico',
  url: 'https://kunaldhadse45.github.io',
  baseUrl: '/climintell-api-docs/',
  organizationName: 'kunaldhadse45',
  projectName: 'climintell-api-docs',
  deploymentBranch: 'gh-pages',
  trailingSlash: false,
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  presets: [
    [
      'classic',
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/kunaldhadse45/climintell-api-docs/tree/main/',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],
  themeConfig: ({
    image: 'img/climintell-social-card.jpg',
    navbar: {
      title: 'ClimIntell API',
      logo: {
        alt: 'ClimIntell Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          href: 'https://climintell.com',
          label: 'Main Website',
          position: 'right',
        },
        {
          href: 'https://github.com/kunaldhadse45/climintell-api-docs',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            { label: 'Getting Started', to: '/docs/getting-started' },
            { label: 'Authentication', to: '/docs/authentication' },
          ],
        },
        {
          title: 'APIs',
          items: [
            { label: 'AgriZone API', to: '/docs/api-reference/agrizone' },
            { label: 'SafeAir API', to: '/docs/api-reference/safeair' },
            { label: 'SolarVolt API', to: '/docs/api-reference/solarvolt' },
          ],
        },
        {
          title: 'More',
          items: [
            { label: 'ClimIntell Website', href: 'https://climintell.com' },
            { label: 'Request API Access', href: 'mailto:contact@climintell.com' },
            { label: 'GitHub', href: 'https://github.com/kunaldhadse45/climintell-api-docs' },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} ClimIntell Private Limited. Built with Docusaurus.`,
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
      additionalLanguages: ['bash', 'json', 'python'],
    },
  }),
};

module.exports = config;
