import Navigation from "../objects/Navigation.js";
import Skills from "../objects/Skills.js";
import Tooltip from "../objects/Tooltip.js";

export default class Upgrades extends Phaser.Scene {
    constructor() {
        super("Upgrades")
    }

    create(data) {
        this.player = data.player;
        this.skills = new Skills(this);
        this.tooltip = new Tooltip(this);

        this.width = this.game.config.width;
        this.height = this.game.config.height;
        this.skillAmount = 3;

        for (let i = 0; i < this.skills.skillArray.length; i++) {
            this.createIcons(this.skills.skillArray[i], i + 1, this.tooltip);
        }
        const navigation = new Navigation(this);
    }

    createIcons(skill, index, tooltip) {
        skill.background = this.add.rectangle(this.width / (this.skillAmount + 1) * index, this.height / 3, this.width / this.skillAmount / 2, 100, 0xaaaaaa, 0.5).setOrigin(0.5);
        skill.icon = this.add.image(skill.background.x, skill.background.y, skill.name).setOrigin(0.5).setScale(0.05);
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
}