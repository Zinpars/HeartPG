import BaseScene from './BaseScene.js';
import Enemy from './Enemy.js';
import Player from './Player.js';

export default class LevelTwo extends BaseScene {
    constructor() {
        super('LevelTwo');
    }

    create() {
        console.log("LevelTwo create");
        this.baseCreate();
        
    }

    update() {
        this.player.movement();
    }
}