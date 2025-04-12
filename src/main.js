import BaseScene from './BaseScene.js';
import MainMenu from './MainMenu.js';
import LevelOne from './LevelOne.js';
import LevelTwo from './LevelTwo.js';



 
   const config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    backgroundColor: "0x888888",
    parent: "game-container",
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: true
        }
    },
    scale: {
        mode: Phaser.Scale.FIT, // Scale the game to fit the screen
        autoCenter: Phaser.Scale.CENTER_BOTH // Center the game on the screen
    },
    scene: [MainMenu, LevelOne, LevelTwo, BaseScene]
};
   
   const game = new Phaser.Game(config);
   