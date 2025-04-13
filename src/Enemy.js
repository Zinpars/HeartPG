import EnemyTypes from "./EnemyTypes.js";

export default class Enemy {
    constructor(scene, x, y, type = "redHeart", playerContainer) {
        this.scene = scene;
     //   this.name = "Enemy";
        this.isDestroyed = false;
        this.playerContainer = playerContainer;

        this.createEnemy(x, y, type, scene);    
    }

    update(playerContainer) {
        // Dummy movement logic
        if (playerContainer.x < this.container.x) {
            this.container.x -= this.speed;
        }
        if (playerContainer.x > this.container.x) {
            this.container.x += this.speed;
        }
        if (playerContainer.y < this.container.y) {
            this.container.y -= this.speed;
        }
        if (playerContainer.y > this.container.y) {
            this.container.y += this.speed;
        }
    }

    createEnemy(x, y, type, scene) {
        // Create enemy sprite and health bar
        const enemyType = EnemyTypes[type];
        this.sprite = scene.add.sprite(0, 0, "whiteHeart").setOrigin(0.5);
        this.sprite.setTint(enemyType.tint);
        this.sprite.setScale(enemyType.scale || 1);
        
        this.speed = enemyType.speed || 2;
        this.maxHealth = enemyType.maxHealth || 5;
        this.health = this.maxHealth;
        this.healthBar = scene.add.rectangle(0, -50, this.health / this.maxHealth * 50, 10, 0x00FF00).setOrigin(0.5);
        this.damage = enemyType.damage || 1;
        this.experience = enemyType.experience || 1; 


        // Enable physics for enemy
        scene.physics.world.enable(this.sprite);
        this.sprite.body.setAllowGravity(false);
        this.sprite.body.setSize(this.sprite.width / 2, this.sprite.height / 2);

        // Create enemy container
        this.container = scene.add.container(x, y, [
            this.sprite,
            this.healthBar
        ]);
    }
}