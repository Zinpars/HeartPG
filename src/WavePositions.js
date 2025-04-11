export default class WavePositions {
    constructor(gameWidth) {
        this.positions = {};
        // TODO: Add enemy type to the arrays
        this.positions.one = [
            // Wave 1 positions
            [
                { x: gameWidth * 0.5, y: 100 /* , name: "redHeart" */ },

            ],
            // Wave 2 positions
            [
                { x: gameWidth * 0.3, y: 100 },
                { x: gameWidth * 0.5, y: 100 },
                { x: gameWidth * 0.7, y: 100 }
            ],
            // Wave 3 positions
            [
                { x: gameWidth * 0.3, y: 100 },
                { x: gameWidth * 0.4, y: 100 },
                { x: gameWidth * 0.5, y: 100 },
                { x: gameWidth * 0.6, y: 100 },
                { x: gameWidth * 0.7, y: 100 }
            ],
            // Wave 4 positions
            [
                { x: gameWidth * 0.3, y: 100 },
                { x: gameWidth * 0.4, y: 100 },
                { x: gameWidth * 0.5, y: 100 },
                { x: gameWidth * 0.6, y: 100 },
                { x: gameWidth * 0.7, y: 100 },
                { x: gameWidth * 0.3, y: 200 },
                { x: gameWidth * 0.8, y: 200 },
            ],
            // Wave 5 positions
            [
                { x: gameWidth * 0.3, y: 100 },
                { x: gameWidth * 0.4, y: 100 },
                { x: gameWidth * 0.5, y: 100 },
                { x: gameWidth * 0.6, y: 100 },
                { x: gameWidth * 0.7, y: 100 },
                { x: gameWidth * 0.3, y: 200 },
                { x: gameWidth * 0.3, y: 300 },
                { x: gameWidth * 0.8, y: 200 },
                { x: gameWidth * 0.8, y: 300 },
            ],
            // Wave 6 positions
            [
                { x: gameWidth * 0.3, y: 100 },
                { x: gameWidth * 0.4, y: 100 },
                { x: gameWidth * 0.5, y: 100 },
            ]
        ],

            this.positions.two = [

            ]
    }

    getPositions(waveCount, level) {
        // Check if the level exists in positions
        const levelPositions = this.positions[level];
        if (!levelPositions) {
            console.error(`Level "${level}" does not exist in positions.`);
            return [];
        }

        // Check if the wave count exists for the level
        const wavePositions = levelPositions[waveCount - 1];
        if (!wavePositions) {
            console.warn(`Wave count "${waveCount}" does not exist for level "${level}". Returning an empty array.`);
            return [];
        }

        return wavePositions;
    }
}
