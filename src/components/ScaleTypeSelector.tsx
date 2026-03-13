import type { ScaleType } from '../types';

interface ScaleTypeSelectorProps {
  value: ScaleType;
  onChange: (value: ScaleType) => void;
  label?: string;
}

const SCALE_TYPES: { value: ScaleType; label: string; category: string }[] = [
  { value: 'major', label: 'Major', category: 'Diatonic' },
  { value: 'minor', label: 'Natural Minor', category: 'Diatonic' },
  { value: 'harmonic minor', label: 'Harmonic Minor', category: 'Minor' },
  { value: 'melodic minor', label: 'Melodic Minor', category: 'Minor' },
  { value: 'pentatonic major', label: 'Pentatonic Major', category: 'Pentatonic' },
  { value: 'pentatonic minor', label: 'Pentatonic Minor', category: 'Pentatonic' },
  { value: 'blues', label: 'Blues', category: 'Pentatonic' },
  { value: 'dorian', label: 'Dorian', category: 'Mode' },
  { value: 'phrygian', label: 'Phrygian', category: 'Mode' },
  { value: 'lydian', label: 'Lydian', category: 'Mode' },
  { value: 'mixolydian', label: 'Mixolydian', category: 'Mode' },
  { value: 'locrian', label: 'Locrian', category: 'Mode' },
];

export function ScaleTypeSelector({ value, onChange, label }: ScaleTypeSelectorProps) {
  const categories = [...new Set(SCALE_TYPES.map(s => s.category))];

  return (
    <div className="scale-type-selector">
      {label && <label>{label}</label>}
      <div className="scale-categories">
        {categories.map(category => (
          <div key={category} className="scale-category">
            <span className="category-label">{category}</span>
            <div className="scale-options">
              {SCALE_TYPES.filter(s => s.category === category).map(scale => (
                <button
                  key={scale.value}
                  className={`scale-button ${value === scale.value ? 'active' : ''}`}
                  onClick={() => onChange(scale.value)}
                >
                  {scale.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ScaleTypeSelector;
