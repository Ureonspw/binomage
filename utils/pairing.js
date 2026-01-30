export const generatePairings = (parrains, filleuls) => {
    if (parrains.length === 0 || filleuls.length === 0) return [];
    
    // Shuffle arrays
    const shuffledParrains = [...parrains].sort(() => Math.random() - 0.5);
    const shuffledFilleuls = [...filleuls].sort(() => Math.random() - 0.5);
    
    const pairings = [];
    
    // Requirement 1: Every parrain must have at least one filleul
    // Requirement 2: One filleul has only one parrain
    
    // First pass: Assign one filleul to each parrain
    const minCount = Math.min(shuffledParrains.length, shuffledFilleuls.length);
    for (let i = 0; i < minCount; i++) {
        pairings.push({
            parrain: shuffledParrains[i],
            filleul: shuffledFilleuls[i]
        });
    }
    
    // Second pass: Distribute remaining filleuls among parrains if any
    if (shuffledFilleuls.length > shuffledParrains.length) {
        const remainingFilleuls = shuffledFilleuls.slice(shuffledParrains.length);
        remainingFilleuls.forEach((filleul) => {
            // Pick a random parrain
            const randomParrain = shuffledParrains[Math.floor(Math.random() * shuffledParrains.length)];
            pairings.push({
                parrain: randomParrain,
                filleul: filleul
            });
        });
    }
    
    return pairings;
};
