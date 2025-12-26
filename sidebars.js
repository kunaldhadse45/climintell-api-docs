/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    'intro',
    'getting-started',
    'authentication',
    {
      type: 'category',
      label: 'API Reference',
      items: [
        'api-reference/agrizone',
        'api-reference/safeair',
        'api-reference/solarvolt',
        'api-reference/windzone',
        'api-reference/uvsafe',
        'api-reference/volcanowatch',
        'api-reference/stubblefire',
      ],
    },
    'rate-limits',
    'errors',
    'support',
  ],
};

module.exports = sidebars;
