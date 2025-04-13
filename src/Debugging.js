export default class Debugging {
    constructor(scene, player, enemy) {
        this.scene = scene;
        this.player = player;
        this.enemy = enemy;
    }

    create() {
        // Create debugging
       // this.player.playerContainerXText = this.scene.add.text(10, 50, 'Player Container X: ' + this.player.playerContainer.x);
       // this.player.playerContainerYText = this.scene.add.text(10, 70, 'Player Container Y: ' + this.player.playerContainer.y);
       // this.enemy.healthText = this.scene.add.text(10, 90, 'Enemy Health: ' + this.enemy.health);
        this.player.healthText = this.scene.add.text(10, 110, 'Player Health: ' + this.player.health);
        this.player.experienceText = this.scene.add.text(10, 130, 'Player Experience: ' + this.player.experience);
        this.player.levelText = this.scene.add.text(10, 150, 'Player Level: ' + this.player.level);
        this.scene.waveCountText = this.scene.add.text(10, 170, 'Wave Count: ' + this.scene.waveCount);
    }

    update() {
        // Update debugging
       // this.player.playerContainerXText.setText('Player Container X: ' + this.player.playerContainer.x);
       // this.player.playerContainerYText.setText('Player Container Y: ' + this.player.playerContainer.y);
    }





}