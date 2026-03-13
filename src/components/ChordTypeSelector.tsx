import type { ChordQuality } from '../types';

interface ChordTypeSelectorProps {
  value: ChordQuality;
  onChange: (value: ChordQuality) => void;
  label?: string;
}

const CHORD_QUALITIES: { value: ChordQuality; label: string }[] = [
  { value: 'major', label: 'Major' },
  { value: 'minor', label: 'Minor' },
  { value: '7', label: '7' },
  { value: 'maj7', label: 'Maj7' },
  { value: 'min7', label: 'Min7' },
  { value: 'dim', label: 'Dim' },
  { value: 'aug', label: 'Aug' },
  { value: 'sus2', label: 'Sus2' },
  { value: 'sus4', label: 'Sus4' },
  { value: '9', label: '9' },
  { value: 'add9', label: 'Add9' },
  { value: '6', label: '6' },
  { value: 'min6', label: 'Min6' },
];

export function ChordTypeSelector({ value, onChange, label }: ChordTypeSelectorProps) {
  return (
    <div className="chord-type-selector">
      {label && <label>{label}</label>}
      <select value={value} onChange={(e) => onChange(e.target.value as ChordQuality)}>
        {CHORD_QUALITIES.map((chord) => (
          <option key={chord.value} value={chord.value}>
            {chord.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ChordTypeSelector;
