import { useState, useCallback, useMemo } from 'react';
import type { NoteName, ChordQuality, Chord, Scale, ScaleType, Progression } from '../types';
import { MusicTheoryService, ProgressionService } from '../services';

interface UseChordReturn {
  root: NoteName;
  quality: ChordQuality;
  chord: Chord;
  setRoot: (root: NoteName) => void;
  setQuality: (quality: ChordQuality) => void;
}

export function useChord(initialRoot: NoteName = 'C', initialQuality: ChordQuality = 'major'): UseChordReturn {
  const [root, setRootState] = useState<NoteName>(initialRoot);
  const [quality, setQualityState] = useState<ChordQuality>(initialQuality);

  const chord = useMemo(() => {
    return MusicTheoryService.getChord(root, quality);
  }, [root, quality]);

  const setRoot = useCallback((newRoot: NoteName) => {
    setRootState(newRoot);
  }, []);

  const setQuality = useCallback((newQuality: ChordQuality) => {
    setQualityState(newQuality);
  }, []);

  return {
    root,
    quality,
    chord,
    setRoot,
    setQuality,
  };
}

interface UseScaleReturn {
  root: NoteName;
  type: ScaleType;
  scale: Scale;
  setRoot: (root: NoteName) => void;
  setType: (type: ScaleType) => void;
}

export function useScale(initialRoot: NoteName = 'C', initialType: ScaleType = 'major'): UseScaleReturn {
  const [root, setRootState] = useState<NoteName>(initialRoot);
  const [type, setTypeState] = useState<ScaleType>(initialType);

  const scale = useMemo(() => {
    return MusicTheoryService.getScale(root, type);
  }, [root, type]);

  const setRoot = useCallback((newRoot: NoteName) => {
    setRootState(newRoot);
  }, []);

  const setType = useCallback((newType: ScaleType) => {
    setTypeState(newType);
  }, []);

  return {
    root,
    type,
    scale,
    setRoot,
    setType,
  };
}

interface UseProgressionReturn {
  root: NoteName;
  scaleType: ScaleType;
  progressions: Progression[];
  currentProgression: Progression | null;
  selectProgression: (index: number) => void;
}

export function useProgression(root: NoteName, scaleType: ScaleType = 'major'): UseProgressionReturn {
  const progressions = useMemo(() => {
    return ProgressionService.getCommonProgressions(root, scaleType);
  }, [root, scaleType]);

  const [currentProgression, setCurrentProgression] = useState<Progression | null>(progressions[0] || null);

  const selectProgression = useCallback((index: number) => {
    if (progressions[index]) {
      setCurrentProgression(progressions[index]);
    }
  }, [progressions]);

  return {
    root,
    scaleType,
    progressions,
    currentProgression,
    selectProgression,
  };
}
