import BaseScene from './BaseScene.js';
import MainMenu from './MainMenu.js';
import LevelOne from './LevelOne.js';
import LevelTwo from './LevelTwo.js';



 
   const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: "0x888888",
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: true
        }
    },
    scene: [MainMenu, LevelOne, LevelTwo, BaseScene]
};
   
   const game = new Phaser.Game(config);
   