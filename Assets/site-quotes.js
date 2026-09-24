(() => {
    const quotes = [
        { text: "Love today, and seize all tommorrows", attribution: "C.M. Kösemen" },
        { text: "As above, so below", attribution: "Emerald Tablet, Unknown Author" },
        { text: "Success breeds complacency. Complacency breeds failure. Only the paranoid survive.", attribution: "Andy Grove" },
        { text: "Simplicity is the ultimate sophistication.", attribution: "Leonardo da Vinci" },
        { text: "Anytime you see dichotomies that ignore the human experiment’s infinite nuances, you can be certain you are encountering the Archontic mind.", attribution: "sol luckman" },
        { text: "The present is theirs; the future, for which I really worked, is mine.", attribution: "Nikola Tesla" },
        { text: "I didn't have any particular knowledge of what the rest of the world was doing, which was probably an advantage. I just looked at the problem from my own perspective.", attribution: "Jack Kilby" },
        { text: "Information is the resolution of uncertainty.", attribution: "claude shannon" },
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
