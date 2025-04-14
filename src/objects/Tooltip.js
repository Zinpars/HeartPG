import Layers from "../config/Layers.js";

export default class Tooltip {
    constructor(scene) {
        this.padding = 10;
        this.createTooltipWindow(scene);
    }

    createTooltipWindow(scene) {
        // Create the text for the tooltip
        let tooltipText = scene.add.text(0, 0, "", {
            fontSize: '16px',
            fill: '#fff',
            wordWrap: { width: 200 } // Wrap text at 200px width
        }).setOrigin(0.5);

        // Create the background rectangle
        this.tooltipBackground = scene.add.rectangle(
            -100 - this.padding, 0, // Centered in the container
            0,
            0,
            0x000000, // Background color
            0.8 // Background transparency
        ).setOrigin(0.5);

        // Group the background and text into a container
        const tooltipContainer = scene.add.container(500, 400, [
            this.tooltipBackground,
            tooltipText
        ]);
        tooltipContainer.setDepth(Layers.DIALOGUE);

        // Hide the tooltip initially
        tooltipContainer.setVisible(false);
        this.tooltipContainer = tooltipContainer;
        this.tooltipText = tooltipText;

    }

    updateTooltip(x, y, text) {
        // Update the tooltip text
        this.tooltipText.setText(text);

        // Dynamically update the background size based on the text size
        let backgroundWidth = this.tooltipText.width + this.padding * 2;
        let backgroundHeight = this.tooltipText.height + this.padding * 2;
        this.tooltipBackground.width = backgroundWidth;
        this.tooltipBackground.height = backgroundHeight;
        this.tooltipBackground.y = -backgroundHeight / 2;

        // Update the position of the tooltip container
        this.tooltipContainer.setPosition(x, y);

        // Make the tooltip visible
        this.tooltipContainer.setVisible(true);
    }
}