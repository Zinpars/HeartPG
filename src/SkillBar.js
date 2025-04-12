import Tooltip from "./Tooltip.js";

export default class SkillBar {
    constructor(scene, player) {
        this.scene = scene;
        this.player = player;
        this.width = this.scene.game.config.width;
        this.height = this.scene.game.config.height;
        this.skillAmount = 3;


        // Create background
        this.scene.add.rectangle(this.width / 2, this.height - 50, this.width, 100, 0x000000, 0.5).setOrigin(0.5);
    }

    createCooldownBar(skill, index, tooltip) {
        skill.background = this.scene.add.rectangle(this.width / (this.skillAmount + 1) * index, this.height - 50, this.width / this.skillAmount / 2, 100, 0xaaaaaa, 0.5).setOrigin(0.5);
        skill.icon = this.scene.add.image(skill.background.x, skill.background.y, skill.name).setOrigin(0.5).setScale(0.05);
        skill.bar = this.scene.add.rectangle(skill.background.x - skill.background.width / 2, this.height, 0, 30, 0xff0000, 1).setOrigin(0, 0.5);
        skill.number = this.scene.add.text(skill.background.x, skill.background.y + skill.background.height / 2 - 10, index, { fontSize: '16px', fill: '#fff' }).setOrigin(0.5);
        skill.background.setInteractive();
        
        // Show the tooltip on hover
        skill.background.on('pointerover', () => {
            tooltip.updateTooltip(skill.background.x, skill.background.y - skill.background.height / 2 - 10, skill.description);
        });
    
        // Hide the tooltip when the pointer leaves
        skill.background.on('pointerout', () => {
            tooltip.tooltipContainer.setVisible(false);
        });
    }

    startCooldown(skill) {
        skill.bar.width = skill.background.width;
        skill.background.setFillStyle(0x4444aa, 0.5);
        this.scene.tweens.add({
            targets: skill.bar,
            width: 0,
            duration: skill.cooldown,
            ease: 'Linear',
            onComplete: () => {
                skill.isReady = true;
                skill.background.setFillStyle(0xaaaaaa, 0.5);
            }
        });
    }

    createExperienceBar(scene, player) {
        this.experienceBar = {};
        this.experienceBar.background = scene.add.rectangle(this.width / 2, 10, this.width - 20, 20, 0x333333, 0.5).setOrigin(0.5);
        const expWidth = player.experience / player.experienceToLevelUp * this.experienceBar.background.width;
        this.experienceBar.bar = scene.add.rectangle(this.experienceBar.background.x - this.experienceBar.background.width / 2, 10, expWidth, 20, 0x00ff00, 1).setOrigin(0, 0.5);
    }

    updateExperienceBar(player) {
        const expWidth = player.experience / player.experienceToLevelUp * this.experienceBar.background.width;
        this.experienceBar.bar.width = expWidth;
    }
}