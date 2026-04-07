import './App.css';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { GuidePart } from './components/guide/GuidePart';
import { useScrollSpy } from './hooks/useScrollSpy';
import { PARTS } from './data/guideContent';

const App = () => {
  const partIds = PARTS.map(p => p.id);
  const activeId = useScrollSpy(partIds);

  return (
    <div className="app-container">
      <Header />
      <div className="page-layout">
        <Sidebar parts={PARTS} activeId={activeId} />
        <main>
          <article>
            {PARTS.map((part, idx) => (
              <div key={part.id}>
                <GuidePart part={part} />
                {idx < PARTS.length - 1 && (
                  <hr className="part-divider" />
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
