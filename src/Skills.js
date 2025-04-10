export default class Skills {
    constructor(scene, player) {
        this.scene = scene;
        this.player = player;

        this.meteor = {};
        this.meteor.isReady = true;

    }

    castMeteor() {
        console.log("Meteor!!");
        // Create meteor at mouse position
        if (this.meteor.isReady) {
            this.meteor.isReady = false;
            this.meteor = this.scene.add.sprite(this.scene.input.activePointer.x, this.scene.input.activePointer.y, 'meteor')
                .setOrigin(0.5)
                .setScale(0.2);
            this.scene.physics.world.enable(this.meteor);
            this.meteor.body.setAllowGravity(false);
            this.meteor.body.setSize(this.meteor.width / 2, this.meteor.height / 2);

            this.meteor.damage = 6;
            this.meteor.cooldown = 5000;

            // Destroy meteor after delay
            this.scene.time.addEvent({
                delay: 300,
                callback: () => {
                    this.meteor.destroy();
                }
            });

            this.scene.time.addEvent({
                delay: this.meteor.cooldown,
                callback: () => {
                    this.meteor.isReady = true;
                }
            });
        }
    }
}