const gameState = {
    player: {
        }
    
   }

 
   const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: "0x888888",
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [MainMenu, LevelOne]
};
   
   const game = new Phaser.Game(config);
   