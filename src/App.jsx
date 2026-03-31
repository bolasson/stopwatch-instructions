import './App.css';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { GuideSection } from './components/guide/GuideSection';
import { useScrollSpy } from './hooks/useScrollSpy';
import { SECTIONS } from './data/guideContent';

const App = () => {
  const sectionIds = SECTIONS.map(s => s.id);
  const activeId = useScrollSpy(sectionIds);

  return (
    <div className="app-container">
      <Header />
      <div className="page-layout">
        <Sidebar sections={SECTIONS} activeId={activeId} />
        <main>
          <article>
            {SECTIONS.map((section, idx) => (
              <div key={section.id}>
                <GuideSection section={section} />
                {idx < SECTIONS.length - 1 && (
                  <hr className="section-divider" />
                )}
              </div>
            ))}
          </article>
        </main>
      </div>
    </div>
  );
};

export default App;
