import { useState, type ReactNode } from 'react';
import ChatBot from './components/ChatBot';
import { MobileNav } from './components/Layout';
import './PortfolioPage.css';

export function PortfolioLink({ href, children }: { href: string; children: ReactNode }) {
  return <a className="portfolio-link" href={href} target="_blank" rel="noreferrer">{children}<span aria-hidden="true">↗︎</span></a>;
}

export default function PortfolioPage({ title, summary, children }: { title: string; summary: string; children: ReactNode }) {
  const [chatOpen, setChatOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  return (
    <>
      <main className="portfolio-page">
        <div className="portfolio-shell">
          <header className="portfolio-banner">
            <h1>{title}</h1>
            <p>{summary}</p>
          </header>
          {children}
        </div>
      </main>
      <MobileNav onOpenChat={() => setChatOpen(true)} />
      <ChatBot chatOpen={chatOpen} setChatOpen={setChatOpen} isFullScreen={isFullScreen} setIsFullScreen={setIsFullScreen} />
    </>
  );
}
