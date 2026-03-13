import { useState } from 'react';
import type { ScaleType } from '../types';

interface ScaleTypeSelectorProps {
  value: ScaleType;
  onChange: (value: ScaleType) => void;
  label?: string;
}

const SCALE_CATEGORIES: {
  id: string;
  label: string;
  scales: { value: ScaleType; label: string }[];
}[] = [
  {
    id: 'diatonic',
    label: 'Diatonic',
    scales: [
      { value: 'major', label: 'Major' },
      { value: 'minor', label: 'Natural Minor' },
    ],
  },
  {
    id: 'minor',
    label: 'Minor',
    scales: [
      { value: 'harmonic minor', label: 'Harmonic' },
      { value: 'melodic minor', label: 'Melodic' },
    ],
  },
  {
    id: 'pentatonic',
    label: 'Pentatonic',
    scales: [
      { value: 'pentatonic major', label: 'Major' },
      { value: 'pentatonic minor', label: 'Minor' },
      { value: 'blues', label: 'Blues' },
    ],
  },
  {
    id: 'modes',
    label: 'Modes',
    scales: [
      { value: 'dorian', label: 'Dorian' },
      { value: 'phrygian', label: 'Phrygian' },
      { value: 'lydian', label: 'Lydian' },
      { value: 'mixolydian', label: 'Mixolydian' },
      { value: 'locrian', label: 'Locrian' },
    ],
  },
];

export function ScaleTypeSelector({ value, onChange, label }: ScaleTypeSelectorProps) {
  const initialCategory = SCALE_CATEGORIES.find(cat => 
    cat.scales.some(scale => scale.value === value)
  )?.id || 'diatonic';
  
  const [activeCategory, setActiveCategory] = useState(initialCategory);

  const currentCategory = SCALE_CATEGORIES.find(cat => cat.id === activeCategory) || SCALE_CATEGORIES[0];

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
    const category = SCALE_CATEGORIES.find(cat => cat.id === categoryId);
    if (category && category.scales.length > 0) {
      onChange(category.scales[0].value);
    }
  };

  return (
    <div className="scale-type-selector">
      {label && <label>{label}</label>}
      <div className="scale-selector-wrapper">
        <div className="scale-category-tabs">
          {SCALE_CATEGORIES.map(category => (
            <button
              key={category.id}
              className={`scale-category-tab ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => handleCategoryClick(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>
        <div className="scale-options">
          {currentCategory.scales.map(scale => (
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
    </div>
  );
}

export default ScaleTypeSelector;
