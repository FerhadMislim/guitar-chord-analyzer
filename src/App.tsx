import { useState, useMemo } from 'react';
import type { NoteName, ScaleType, Chord } from './types';
import { useChord, useProgression } from './hooks';
import {
  NoteSelector,
  ChordTypeSelector,
  ScaleTypeSelector,
  Fretboard,
  ChordInfo,
  ProgressionList,
} from './components';
import { MusicTheoryService } from './services';
import './styles/global.css';

type TabType = 'chords' | 'scales';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('chords');
  const { root, quality, chord, setRoot, setQuality } = useChord('C', 'major');
  const [scaleRoot, setScaleRoot] = useState<NoteName>('C');
  const [scaleType, setScaleType] = useState<ScaleType>('major');
  const { progressions, currentProgression, selectProgression } = useProgression(root);

  const scale = useMemo(() => {
    return MusicTheoryService.getScale(scaleRoot, scaleType);
  }, [scaleRoot, scaleType]);

  const handleChordClick = (clickedChord: Chord) => {
    setRoot(clickedChord.root);
    setQuality(clickedChord.quality);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Guitar Chord Analyzer</h1>
        <p>Analyze chords, scales, and progressions with precision</p>
      </header>

      <main className="main-content">
        <nav className="tab-nav">
          <button
            className={`tab-button ${activeTab === 'chords' ? 'active' : ''}`}
            onClick={() => setActiveTab('chords')}
          >
            Chords
          </button>
          <button
            className={`tab-button ${activeTab === 'scales' ? 'active' : ''}`}
            onClick={() => setActiveTab('scales')}
          >
            Scales
          </button>
        </nav>

        {activeTab === 'chords' && (
          <>
            <section className="controls-section">
              <div className="controls-row">
                <NoteSelector
                  label="Root Note"
                  value={root}
                  onChange={setRoot}
                />
                <ChordTypeSelector
                  label="Chord Type"
                  value={quality}
                  onChange={setQuality}
                />
              </div>
            </section>

            <section className="fretboard-section">
              <Fretboard
                chord={chord}
                highlightedNotes={chord.notes}
              />
            </section>

            <div className="info-grid">
              <ChordInfo chord={chord} />
              <ProgressionList
                progressions={progressions}
                currentProgression={currentProgression}
                onSelectProgression={selectProgression}
                onChordClick={handleChordClick}
              />
            </div>
          </>
        )}

        {activeTab === 'scales' && (
          <>
            <section className="controls-section">
              <div className="controls-row controls-row-scales">
                <NoteSelector
                  label="Root Note"
                  value={scaleRoot}
                  onChange={setScaleRoot}
                />
                <ScaleTypeSelector
                  label="Scale Type"
                  value={scaleType}
                  onChange={setScaleType}
                />
              </div>
            </section>

            <section className="fretboard-section">
              <Fretboard
                chord={{ root: scaleRoot, quality: 'major', notes: scale.notes, intervals: [], symbol: '' }}
                highlightedNotes={scale.notes}
              />
            </section>

            <section className="chord-info-panel">
              <div className="chord-header">
                <h2 className="chord-name">{scaleRoot} {scaleType}</h2>
                <span className="chord-quality">Scale</span>
              </div>
              <div className="chord-notes">
                <h3>Notes</h3>
                <div className="notes-list">
                  {scale.notes.map((note: NoteName, index: number) => (
                    <div
                      key={index}
                      className="note-chip"
                      style={{
                        backgroundColor: MusicTheoryService.getNoteColor(note)
                      }}
                    >
                      {note}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}
      </main>

      <footer className="app-footer">
        {/* <p>Master your fretboard with precision. Craft your sound.</p> */}
      </footer>
    </div>
  );
}

export default App;
