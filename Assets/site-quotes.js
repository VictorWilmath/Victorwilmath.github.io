(() => {
    const quotes = [
        { text: "Love today, and seize all tommorrows", attribution: "C.M. Kösemen" },
        // Add more entries in this format:
        // { text: "Your quote", attribution: "Attribution" },
    ];

    if (quotes.length === 0) return;

    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    const footer = document.createElement("footer");
    footer.className = "site-quote-footer";

    const content = document.createElement("div");
    content.className = "site-quote-content";

    const text = document.createElement("blockquote");
    text.textContent = `“${quote.text}”`;

    const attribution = document.createElement("cite");
    attribution.textContent = `— ${quote.attribution}`;

    content.append(text, attribution);
    footer.append(content);
    document.body.append(footer);
})();
