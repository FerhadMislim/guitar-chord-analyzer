import type { Chord, Progression, NoteName, ChordQuality, ScaleType } from '../types';
import { MusicTheoryService } from './MusicTheoryService';

const COMMON_PROGRESSIONS: Record<string, number[][]> = {
  'major': [
    [0, 3, 4],
    [0, 4, 3],
    [0, 5, 3, 4],
    [0, 4, 5, 3],
    [1, 4, 0],
    [0, 3, 1, 4],
    [2, 5, 0],
    [0, 2, 4],
  ],
  'minor': [
    [0, 3, 4],
    [0, 5, 2, 6],
    [0, 3, 6, 2],
    [0, 6, 5, 6],
    [0, 4, 5, 4],
    [1, 6, 4, 0],
  ],
  'harmonic minor': [
    [0, 4, 6],
    [0, 3, 5, 6],
    [0, 4, 5, 3],
    [1, 4, 0],
  ],
  'melodic minor': [
    [0, 4, 5],
    [0, 3, 4, 5],
    [1, 4, 0],
  ],
  'pentatonic major': [
    [0, 1, 2, 3, 4],
    [0, 2, 3, 4],
    [0, 1, 3, 4],
  ],
  'pentatonic minor': [
    [0, 1, 2, 3, 4],
    [0, 2, 3, 4],
  ],
  'blues': [
    [0, 3, 4],
    [0, 3, 4, 0],
    [0, 3, 5, 3],
  ],
  'dorian': [
    [0, 3, 4],
    [0, 4, 3],
    [1, 4, 0],
  ],
  'phrygian': [
    [0, 3, 4],
    [0, 4, 3],
  ],
  'lydian': [
    [0, 3, 4],
    [0, 1, 3],
  ],
  'mixolydian': [
    [0, 3, 4],
    [0, 4, 3],
    [1, 4, 0],
  ],
  'locrian': [
    [0, 2, 4],
    [0, 3, 5],
  ],
};

function getChordQualitiesForKey(scaleType: ScaleType): ChordQuality[] {
  if (scaleType === 'minor' || scaleType === 'harmonic minor' || scaleType === 'melodic minor') {
    return ['minor', 'dim', 'major', 'minor', 'minor', 'major', 'major'];
  }
  if (scaleType === 'major') {
    return ['major', 'minor', 'minor', 'major', 'major', 'minor', 'dim'];
  }
  return ['major', 'minor', 'minor', 'major', 'major', 'minor', 'dim'];
}

export const ProgressionService = {
  getDiatonicChords(root: NoteName, scaleType: ScaleType): Chord[] {
    const scale = MusicTheoryService.getScale(root, scaleType);
    const qualities = getChordQualitiesForKey(scaleType);
    
    return qualities.map((quality, degree) => {
      const chordRoot = scale.notes[degree % scale.notes.length];
      return MusicTheoryService.getChord(chordRoot, quality);
    });
  },

  getCommonProgressions(root: NoteName, scaleType: ScaleType): Progression[] {
    const isMinor = scaleType === 'minor' || scaleType === 'harmonic minor' || scaleType === 'melodic minor';
    const progressionIndices = COMMON_PROGRESSIONS[scaleType] || COMMON_PROGRESSIONS['major'];
    
    return progressionIndices.map((indices, idx) => {
      const diatonicChords = this.getDiatonicChords(root, scaleType);
      const chords = indices.map(i => diatonicChords[i % diatonicChords.length]);
      const numerals = indices.map(i => MusicTheoryService.getRomanNumeral(i, isMinor));
      
      return {
        name: `Progression ${idx + 1}`,
        numerals,
        chords,
      };
    });
  },

  getProgressionChords(progression: Progression): Chord[] {
    return progression.chords;
  },

  getChordInKey(root: NoteName, degree: number, scaleType: ScaleType): Chord {
    const diatonicChords = this.getDiatonicChords(root, scaleType);
    return diatonicChords[degree % diatonicChords.length];
  },

  getScaleDegrees(scaleType: ScaleType): string[] {
    const isMinor = scaleType === 'minor' || scaleType === 'harmonic minor' || scaleType === 'melodic minor';
    
    if (scaleType === 'harmonic minor') {
      return ['i', 'ii\u00b0', 'III+', 'iv', 'V', 'VI', 'vii\u00b0'];
    }
    if (scaleType === 'melodic minor') {
      return ['i', 'ii', 'III+', 'IV', 'V', 'vi\u00b0', 'vii\u00b0'];
    }
    if (scaleType === 'major') {
      return ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii\u00b0'];
    }
    if (isMinor) {
      return ['i', 'ii\u00b0', 'III', 'iv', 'v', 'VI', 'VII'];
    }
    
    return ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii'];
  },
};

export default ProgressionService;
