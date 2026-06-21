import Navbar from './Navbar';
import Footer from './Footer';
import ChatAssistant from './ChatAssistant';

export default function PageLayout({ children, showFooter = true }) {
  return (
    <div className="page-enter" style={{ background: 'var(--bg)', color: 'var(--text)', minHeight: '100vh' }}>
      <Navbar />
      <main>{children}</main>
      {showFooter && <Footer />}
      <ChatAssistant />
    </div>
  );
}

export function PageHero({ eyebrow, title, subtitle, children }) {
  return (
    <section className="section-y" style={{ paddingBottom: '2rem' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
        <h1 className="display-1" style={{ color: 'var(--text)' }}>{title}</h1>
        {subtitle && (
          <p className="mt-5 text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-muted)' }}>{subtitle}</p>
        )}
        {children}
      </div>
    </section>
  );
}
