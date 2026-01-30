export const generatePairings = (parrains, filleuls) => {
    if (parrains.length === 0 || filleuls.length === 0) return [];
    
    // Shuffle both arrays to ensure randomness in who gets picked first
    const shuffledParrains = [...parrains].sort(() => Math.random() - 0.5);
    const shuffledFilleuls = [...filleuls].sort(() => Math.random() - 0.5);
    
    // Map to track how many filleuls each parrain has
    // ID -> count
    const parrainCounts = new Map();
    shuffledParrains.forEach(p => parrainCounts.set(p.id, 0));

    const pairings = [];
    
    for (const filleul of shuffledFilleuls) {
        // Find the minimum number of filleuls currently assigned
        let minCount = Infinity;
        for (const count of parrainCounts.values()) {
            if (count < minCount) minCount = count;
        }

        // Get all parrains who have this minimum count
        const availableParrains = shuffledParrains.filter(p => parrainCounts.get(p.id) === minCount);

        // Randomly pick one of the available parrains
        const selectedParrain = availableParrains[Math.floor(Math.random() * availableParrains.length)];

        // Assign
        pairings.push({
            parrain: selectedParrain,
            filleul: filleul
        });
        
        // Increment count
        parrainCounts.set(selectedParrain.id, minCount + 1);
    }
    
    return pairings;
};
