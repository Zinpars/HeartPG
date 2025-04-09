export default class Player {
    constructor(scene, x, y) {
        console.log("Player constructor");
        this.scene = scene;
        this.x = x;
        this.y = y;
        
        // Create player
        this.sprite = this.scene.add.sprite(0, 0, 'redHeart');
        this.maxHealth = 3;
        this.health = this.maxHealth;
        this.speed = 5;
        this.experience = 0;
        this.attackIsReady = true;
        this.level = 1;
        this.attackDamage = 3;
        this.waveCount = 1;
        this.waveCountMax = 5;
    }

    setupPlayer() {
        console.log("setupPlayer");
    }
}