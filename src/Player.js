export default class Player {
    constructor(scene, x, y) {
        this.scene = scene;
        this.x = x;
        this.y = y;

        // Create player
        this.name = "Player";
        this.sprite = this.scene.add.sprite(0, 0, 'redHeart');
        this.maxHealth = 3;
        this.health = this.maxHealth;
        this.speed = 5;
        this.experience = 0;
        this.experienceToLevelUp = 5;
        this.attackIsReady = true;
        this.level = 1;
        this.attackDamage = 3;
        this.attackCooldown = 1000;
        this.attackRange = 100;
        this.attackDuration = 500;
        this.isInCutscene = false;


        // Create player Container
        this.healthBar = this.scene.add.rectangle(this.x, this.y - 50, this.health / this.maxHealth * 50, 10, 0x00FF00).setOrigin(0.5);
        this.playerContainer = this.scene.add.container(this.scene.game.config.width * 0.5, 500, [
            this.sprite,
            this.healthBar,
        ]);
        this.playerContainer.setSize(50, 50);
        
        

        // Enable physics for player
        this.scene.physics.world.enable(this.sprite);
        this.sprite.body.setAllowGravity(false);
        this.sprite.body.setSize(this.sprite.width / 2, this.sprite.height / 2);

        this.scene.physics.world.enable(this.playerContainer);
        this.playerContainer.body.setCollideWorldBounds(true);
        this.playerContainer.body.setAllowGravity(false);
        this.playerContainer.body.setSize(0, 0);


        // Create controls
        this.cursors = this.scene.input.keyboard.createCursorKeys();
        this.w = this.scene.input.keyboard.addKey('W');
        this.a = this.scene.input.keyboard.addKey('A');
        this.s = this.scene.input.keyboard.addKey('S');
        this.d = this.scene.input.keyboard.addKey('D');
    }

    setupPlayer() {
        console.log("setupPlayer");
    }

    movement() {
        if (this.isInCutscene) return;
        // Player Movement
        if (this.cursors.left.isDown || this.a.isDown) {
            this.playerContainer.x -= this.speed;
        }
        if (this.cursors.right.isDown || this.d.isDown) {
            this.playerContainer.x += this.speed;
        }
        if (this.cursors.up.isDown || this.w.isDown) {
            this.playerContainer.y -= this.speed;
        }
        if (this.cursors.down.isDown || this.s.isDown) {
            this.playerContainer.y += this.speed;
        }
    }


}