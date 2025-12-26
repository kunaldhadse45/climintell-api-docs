import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs">
            Get Started →
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Official API documentation for ClimIntell's satellite-based geospatial intelligence platform">
      <HomepageHeader />
      <main>
        <div className="container" style={{padding: '2rem 0'}}>
          <div className="row">
            <div className="col col--4">
              <h3>🚀 Production Ready</h3>
              <p>Enterprise-grade REST APIs with authentication, rate limiting, and global coverage.</p>
            </div>
            <div className="col col--4">
              <h3>🌍 7 Powerful APIs</h3>
              <p>From agriculture to disaster monitoring - comprehensive satellite-based intelligence.</p>
            </div>
            <div className="col col--4">
              <h3>💻 Zero Infrastructure</h3>
              <p>No servers, GPUs, or storage needed. We handle all geospatial processing.</p>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
