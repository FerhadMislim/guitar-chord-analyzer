import type { Progression, Chord } from '../types';
import { MusicTheoryService } from '../services';

interface ProgressionListProps {
  progressions: Progression[];
  currentProgression: Progression | null;
  onSelectProgression: (index: number) => void;
  onChordClick?: (chord: Chord) => void;
}

export function ProgressionList({
  progressions,
  currentProgression,
  onSelectProgression,
  onChordClick,
}: ProgressionListProps) {
  return (
    <div className="progression-panel">
      <h3>Chord Progressions</h3>
      
      <div className="progression-tabs">
        {progressions.map((prog, index) => (
          <button
            key={index}
            className={`progression-tab ${currentProgression?.name === prog.name ? 'active' : ''}`}
            onClick={() => onSelectProgression(index)}
          >
            {prog.name}
          </button>
        ))}
      </div>

      {currentProgression && (
        <div className="progression-chords">
          {currentProgression.chords.map((chord, index) => (
            <button
              key={index}
              className="progression-chord-button"
              style={{ backgroundColor: MusicTheoryService.getNoteColor(chord.root) }}
              onClick={() => onChordClick?.(chord)}
            >
              <span className="chord-root">{chord.root}</span>
              <span className="chord-quality-small">{chord.quality}</span>
              <span className="roman-numeral">{currentProgression.numerals[index]}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProgressionList;
