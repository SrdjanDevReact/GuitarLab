import chordsData from "../data/chordsData";

export function filterChordsByLetter(letter) {
    // Uzimanje samo prvog karaktera iz ulaznog stringa i pretvaranje u veliko slovo
    const uppercaseFirstLetter = letter.charAt(0).toUpperCase() + letter.slice(1);
  
    // Filtriranje akorda koji počinju sa datim slovom i zadovoljavaju dodatne uslove
    const filteredChords = Object.keys(chordsData)
      .filter((chord) => {
        // Provera da li akord počinje sa velikim slovom iz ulaznog argumenta
        if (!chord.startsWith(uppercaseFirstLetter)) return false;
        // Provera da li nakon početnog slova sledi "b" ili "#"
        const nextCharIndex = uppercaseFirstLetter.length;
        const nextChar = chord.charAt(nextCharIndex);
        return nextChar !== 'b' && nextChar !== '#';
      })
      .map((chord) => ({ [chord]: chordsData[chord] }));
  
    return filteredChords;
}


export function convertChordPositions(chordPositions) {
    if (!chordPositions || !Array.isArray(chordPositions)) {
        return [];
    }

    return chordPositions.map((position,index) => {
        if (position === 'x' || position === '0') {
            return -1;
        } else {
            const fret = parseInt(position);
            return (fret - 1) * 6 + index;
        }
    });
}


export function getLowestFretNumber(chordPositions) {
    if (!chordPositions || !Array.isArray(chordPositions)) {
        return [];
    }

    // Filtriramo i konvertujemo stringove u cijele brojeve, preskačući "x" i nule
    const numbers = chordPositions
        .filter(pos => pos !== 'x' && pos !== '0')
        .map(pos => parseInt(pos, 10));

    // Sortiramo brojeve
    numbers.sort((a, b) => a - b);

    // Pronalazimo najmanji i najveći broj
    const smallestNumber = numbers[0];
    const largestNumber = numbers[numbers.length - 1];

    // Ako je najmanji broj 1 ili je razlika između najvećeg i najmanjeg broja 4, vraćamo niz počevši od 1
    if (smallestNumber === 1 || largestNumber - smallestNumber === 4) {
        const result = [];
        for (let i = 0; i < 5; i++) {
            result.push(i + 1);
        }
        return result;
    }

    // Inače, vraćamo niz uzastopnih brojeva počevši od najmanjeg broja - 1
    const result = [];
    for (let i = 0; i < 5; i++) {
        result.push(smallestNumber - 1 + i);
    }

    return result;
}


export function transmongIndexesForCircles(oldIndexArray, firstFretNumber) {
    // Provjera da li je oldIndexArray niz i da li je firstFretNumber broj
    if (!Array.isArray(oldIndexArray) || typeof firstFretNumber !== 'number') {
        return [];
    }

    // Oduzimanje (firstFretNumber - 1) * 6 od svakog elementa u nizu oldIndexArray
    const newArray = oldIndexArray.map(index => index - (firstFretNumber - 1) * 6);

    return newArray;
}