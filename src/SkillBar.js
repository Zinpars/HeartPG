
export default class SkillBar {
    constructor(scene, player) {
        this.scene = scene;
        this.player = player;
        this.width = this.scene.game.config.width;
        this.height = this.scene.game.config.height;
        this.skillAmount = 5;

        // Create background
        this.scene.add.rectangle(this.width / 2, this.height - 50, this.width, 100, 0x000000, 0.5).setOrigin(0.5);        
    }

    createCooldownBar(skill, index) {
        skill.background = this.scene.add.rectangle(this.width / this.skillAmount * index, this.height - 50, this.width / this.skillAmount / 2, 100, 0xaaaaaa, 1).setOrigin(0.5);
        skill.icon = this.scene.add.image(skill.background.x, skill.background.y, skill.name).setOrigin(0.5).setScale(0.05);
        skill.bar = this.scene.add.rectangle(skill.background.x - skill.background.width / 2, this.height, 0, 30, 0xff0000, 1).setOrigin(0, 0.5);
    }

    startCooldown(skill) {
        skill.bar.width = skill.background.width;
        this.scene.tweens.add({
            targets: skill.bar,
            width: 0,
            duration: skill.cooldown,
            ease: 'Linear',
            onComplete: () => {
                skill.isReady = true;
            }
        });
    }
}