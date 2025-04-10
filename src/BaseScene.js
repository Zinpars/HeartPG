import Player from "./Player.js"
import Enemy from "./Enemy.js"
import Debugging from "./Debugging.js";
import WavePositions from "./WavePositions.js";

export default class BaseScene extends Phaser.Scene {
    constructor(key) {
        super({ key })
        this.scene = key;
    }

    create() {
        console.log("BaseScene create");
    }

    baseCreate() {
        this.player = new Player(this, 0, 0);
        this.player.setupPlayer(this, 500, 500);

        this.debugging = new Debugging(this, this.player, this.enemy);
        this.debugging.create();

        this.waveCount = 1;


    }

    update() {
        // Player movement
        this.player.movement();

        // Update Debugging
        this.debugging.update();
    }

    updateHealthBar(sprite) {
        console.log(sprite);
        sprite.healthBar.width = sprite.health / sprite.maxHealth * 50;
       // sprite.healthText.setText(sprite.name + ' Health: ' + sprite.health);
    }

    createWave(waveCount) {
        // Get positions for enemies from WavePositions
        const wavePositions = new WavePositions(this.game.config.width)
        const positions = wavePositions.getPositions(waveCount);

        // Create enemies
        positions.forEach(pos => {
            this.enemy = new Enemy(this, pos.x, pos.y, this.player.playerContainer);
            this.enemyArray.push(this.enemy);
        });
    }


}

