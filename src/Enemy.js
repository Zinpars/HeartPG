export default class Enemy {
    constructor(scene, x, y, playerContainer) {
        this.scene = scene;
        this.name = "Enemy";
        this.maxHealth = 5;
        this.health = this.maxHealth;
        this.speed = 2;
        this.isDestroyed = false;
        this.playerContainer = playerContainer;

        // Create enemy sprite and health bar
        this.sprite = scene.add.sprite(0, 0, 'redHeart');
        this.healthBar = scene.add.rectangle(0, -50, this.health / this.maxHealth * 50, 10, 0x00FF00).setOrigin(0.5);


        // Create enemy container
        this.container = scene.add.container(x, y, [
            this.sprite,
            this.healthBar
        ]);

        // Enable physics for enemy
        scene.physics.world.enable(this.sprite);
        this.sprite.body.setAllowGravity(false);
    }

    update() {
        // Dummy movement logic
        if (this.playerContainer.x < this.container.x) {
            this.container.x -= this.speed;
        }
        if (this.playerContainer.x > this.container.x) {
            this.container.x += this.speed;
        }
        if (this.playerContainer.y < this.container.y) {
            this.container.y -= this.speed;
        }
        if (this.playerContainer.y > this.container.y) {
            this.container.y += this.speed;
        }
    }
}