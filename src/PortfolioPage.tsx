import type { ReactNode } from 'react';
import './PortfolioPage.css';

export function PortfolioLink({ href, children }: { href: string; children: ReactNode }) {
  return <a className="portfolio-link" href={href} target="_blank" rel="noreferrer">{children}<span aria-hidden="true">↗︎</span></a>;
}

export default function PortfolioPage({ title, children }: { title: string; children: ReactNode }) {
  return (
      <main className="portfolio-page">
        <div className="portfolio-shell">
          <header className="portfolio-banner">
            <h1>{title}</h1>
          </header>
          {children}
        </div>
      </main>
  );
}
