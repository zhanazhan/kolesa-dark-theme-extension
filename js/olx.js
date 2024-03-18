$(() => {
    const selectors = [
        '.baxter-container'
    ];
    initHide(selectors, true);


// Get all elements with data-emotion="css-global"
    const globalStyleElements = document.querySelectorAll('[data-emotion="css-global"]');

// Define the dark mode styles
    const darkModeStyles = `
    ::-moz-selection { background: #333; text-shadow: none; }
    ::selection { background: #333; text-shadow: none; }
    hr { border-top-color: #666; }
    body { background-color: #111; color: #fff; }
    /* Add more styles for dark mode as needed */
`;

// Loop through each style element and redefine their styles
    globalStyleElements.forEach(element => {
        // Get the current style content
        let currentStyle = element.innerHTML;

        // Append dark mode styles
        currentStyle += darkModeStyles;

        // Redefine the style content
        element.innerHTML = currentStyle;
    });

});
