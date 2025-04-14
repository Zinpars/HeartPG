const EnemyTypes = Object.freeze({
            redHeart: {
                name: "Red Heart",
                maxHealth: 5,
                speed: 2,
                damage: 1,
                experience: 1,
                sprite: null,
                tint: 0xFF0000,
            },
            orangeHeart: {
                name: "Orange Heart",
                maxHealth: 10,
                speed: 1.5,
                damage: 2,
                experience: 2,
                sprite: null,
                tint: 0xFFA500,
            },
            yellowHeart: {
                name: "Yellow Heart",
                maxHealth: 15,
                speed: 1,
                damage: 3,
                experience: 3,
                sprite: null,
                tint: 0xFFFF00,
            },
            heartBoss: {
                name: "Heart Boss",
                maxHealth: 50,
                speed: 0.5,
                damage: 5,
                experience: 10,
                sprite: null,
                tint: 0xFF00FF,
                scale: 4
            },
})      
    
export default EnemyTypes;
