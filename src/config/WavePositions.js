const WavePositions = (gameWidth) => Object.freeze({
        LevelOne: [
            // Wave 1 positions
            [
                { x: gameWidth * 0.5, y: 100 },

            ],
            // Wave 2 positions
            [
                { x: gameWidth * 0.3, y: 100 },
                { x: gameWidth * 0.5, y: 100, type: "orangeHeart" },
                { x: gameWidth * 0.7, y: 100 }
            ],
            // Wave 3 positions
            [
                { x: gameWidth * 0.3, y: 100 },
                { x: gameWidth * 0.4, y: 100, type: "orangeHeart" },
                { x: gameWidth * 0.5, y: 100, type: "yellowHeart" },
                { x: gameWidth * 0.6, y: 100, type: "orangeHeart" },
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
                { x: gameWidth * 0.5, y: 100, type: "heartBoss" },
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
        LevelTwo: [
            // Wave 1 positions
            [
                { x: gameWidth * 0.3, y: 100 },
                { x: gameWidth * 0.5, y: 100, type: "orangeHeart" },
                { x: gameWidth * 0.7, y: 100 }
            ],
            // Wave 2 positions
            [
                { x: gameWidth * 0.3, y: 100 },
                { x: gameWidth * 0.4, y: 100, type: "orangeHeart" },
                { x: gameWidth * 0.5, y: 100, type: "yellowHeart" },
                { x: gameWidth * 0.6, y: 100, type: "orangeHeart" },
                { x: gameWidth * 0.7, y: 100 }
            ],
            // Wave 6 positions
            [
                { x: gameWidth * 0.3, y: 100 },
                { x: gameWidth * 0.4, y: 100 },
                { x: gameWidth * 0.5, y: 100 },
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
                { x: gameWidth * 0.5, y: 100, type: "heartBoss" },
                { x: gameWidth * 0.6, y: 100 },
                { x: gameWidth * 0.7, y: 100 },
                { x: gameWidth * 0.3, y: 200 },
                { x: gameWidth * 0.3, y: 300 },
                { x: gameWidth * 0.8, y: 200 },
                { x: gameWidth * 0.8, y: 300 },
            ],
        ]
    })

    export default WavePositions;
