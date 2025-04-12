export default class Tooltip {
    constructor(element) {
        this.padding = 10
        this.tooltipBackground = {};
    }

    createTooltipWindow(scene) {
        // Create the text for the tooltip
        let tooltipText = scene.add.text(0, 0, "", {
            fontSize: '16px',
            fill: '#fff',
            wordWrap: { width: 200 } // Wrap text at 200px width
        }).setOrigin(0.5);
    
        // Dynamically calculate the size of the background based on the text
        let backgroundWidth = tooltipText.width + this.padding * 2;
        let backgroundHeight = tooltipText.height + this.padding * 2;
    
        // Create the background rectangle
        let tooltipBackground = scene.add.rectangle(
            0, 0, // Position (will be updated dynamically)
            backgroundWidth,
            backgroundHeight,
            0x000000, // Background color
            0.8 // Background transparency
        ).setOrigin(0.5);
    
        // Group the background and text into a container
        const tooltipContainer = scene.add.container(500, 400, [
            tooltipBackground,
            tooltipText
        ]);
    
        // Hide the tooltip initially
        tooltipContainer.setVisible(false);
        this.tooltipContainer = tooltipContainer;
        this.tooltipText = tooltipText;
        this.tooltipBackground = tooltipBackground;

    }

    updateTooltip(x, y, text) {
        // Update the tooltip text
        this.tooltipText.setText(text);
    
        // Dynamically update the background size based on the text size
        let backgroundWidth = this.tooltipText.width + this.padding * 2;
        let backgroundHeight = this.tooltipText.height + this.padding * 2;
        this.tooltipBackground.width = backgroundWidth;
        this.tooltipBackground.height = backgroundHeight;
    
        // Ensure the text and background remain centered
        this.tooltipText.setPosition(0, 0); // Center the text in the container
        this.tooltipBackground.setPosition(0, 0); // Center the background in the container
    
        // Update the position of the tooltip container
        this.tooltipContainer.setPosition(x, y);
    
        // Make the tooltip visible
        this.tooltipContainer.setVisible(true);
    }
}