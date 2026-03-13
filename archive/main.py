SCALES = {
    "major": [0, 2, 4, 5, 7, 9, 11],
    "minor": [0, 2, 3, 5, 7, 8, 10],
    "dorian": [0, 2, 3, 5, 7, 9, 10],
    "phrygian": [0, 1, 3, 5, 7, 8, 10],
    "lydian": [0, 2, 4, 6, 7, 9, 11],
    "mixolydian": [0, 2, 4, 5, 7, 9, 10],
    "locrian": [0, 1, 3, 5, 6, 8, 10],
    "harmonic_minor": [0, 2, 3, 5, 7, 8, 11],
    "melodic_minor": [0, 2, 3, 5, 7, 9, 11],
    "chromatic": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    "whole_tone": [0, 2, 4, 6, 8, 10],
    "blues": [0, 3, 5, 6, 7, 10],
    "pentatonic_major": [0, 2, 4, 7, 9],
    "pentatonic_minor": [0, 3, 5, 7, 10],
    "pentatonic_blues": [0, 3, 5, 6, 7, 10],
    "pentatonic_neutral": [0, 2, 5, 7, 10],
    "pentatonic_egyptian": [0, 2, 5, 7, 10],
    "pentatonic_kumoi": [0, 2, 3, 7, 9],
    "pentatonic_pelog": [0, 1, 3, 7, 8],
    "pentatonic_raga": [0, 2, 3, 7, 9], 
    "pentatonic_suspended": [0, 2, 5, 7, 10],
    "pentatonic_symmetrical": [0, 2, 4, 7, 9],
    "pentatonic_yo": [0, 3, 5, 7, 10],
    "octatonic": [0, 1, 3, 4, 6, 7, 9, 10],
    "enigmatic": [0, 1, 4, 6, 8, 10, 11],
    "harmonic_major": [0, 2, 4, 5, 8, 9, 11],
    "double_harmonic": [0, 1, 4, 5, 7, 8, 11],
    "neapolitan_major": [0, 1, 3, 5, 7, 9, 11],
    "neapolitan_minor": [0, 1, 3, 5, 7, 8, 11],
    "flamenco": [0, 1, 4, 5, 7, 8, 11],
    "persian": [0, 1, 4, 5, 6, 8, 11],
    "oriental": [0, 1, 4, 5, 6, 9, 10],
    "japanese": [0, 1, 5, 7, 8],
    "jewish": [0, 1, 4, 5, 7, 8, 10],
    "hungarian_minor": [0, 2, 3, 6, 7, 8, 11],
    "romanian_minor": [0, 2, 3, 6, 7, 9, 10],
    "gypsy": [0, 1, 4, 5, 7, 8, 10],
    "spanish": [0, 1, 3, 4, 5, 6, 8, 10],
    "bebop_major": [0, 2, 4, 5, 7, 8, 9, 11],
    "bebop_dominant": [0, 2, 4, 5, 7, 9, 10, 11],
    "bebop_minor": [0, 2, 3, 5, 7, 9, 10, 11],
    "bebop_half_diminished": [0, 2, 3, 5, 6, 8, 10, 11],
    "bebop_mixolydian": [0, 2, 4, 5, 7, 9, 10, 11],
    "bebop_dorian": [0, 2, 3, 5, 7, 9, 10, 11],
    "bebop_lydian": [0, 2, 4, 6, 7, 9, 10, 11],
    "bebop_phrygian": [0, 1, 3, 5, 7, 8, 10, 11],
    "bebop_locrian": [0, 1, 3, 5, 6, 8, 10, 11],
    "bebop_harmonic_minor": [0, 2, 3, 5, 7, 8, 9, 11],
    "bebop_double_harmonic": [0, 1, 4, 5, 7, 8, 9, 11],
    "bebop_neapolitan_major": [0, 1, 3, 5, 7, 8, 9, 11],
    "bebop_neapolitan_minor": [0, 1, 3, 5, 7, 8, 9, 11],
    "bebop_pelog": [0, 1, 3, 4, 7, 8, 10, 11],
    "bebop_raga": [0, 2, 3, 5, 7, 9, 10, 11],
    "bebop_suspended": [0, 2, 4, 5, 7, 9, 10, 11],
    "bebop_symmetrical": [0, 1, 3, 4, 6, 7, 9, 10],
    "bebop_yo": [0, 3, 5, 6, 7, 9, 10, 11],
    "bebop_enigmatic": [0, 1, 4, 6, 8, 10, 11],
    "bebop_harmonic_major": [0, 2, 4, 5, 8, 9, 10, 11],
}

NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]

def get_scale(root, scale):
    return [NOTES[(root + interval) % 12] for interval in SCALES[scale]]

def get_chord(root, chord):
    return [NOTES[(root + interval) % 12] for interval in chord]


# def main():
print(get_scale(0, "bebop_harmonic_major"))
# print(get_chord(0, [0, 4, 7]))



