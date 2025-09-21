document.addEventListener('DOMContentLoaded', () => {
    const quoteText = document.getElementById('quote-text');
    const quoteAuthor = document.getElementById('quote-author');
    const newQuoteBtn = document.getElementById('new-quote-btn');
    const tweetBtn = document.getElementById('tweet-btn');

    let currentQuote = '';
    let currentAuthor = '';

    async function getQuote() {
        newQuoteBtn.disabled = true;
        newQuoteBtn.textContent = 'Loading...';

        try {
            
            try {
            
            // Change background color
            document.body.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 95%)`;

            // Use https for deployment to avoid mixed content issues
            const response = await fetch('https://api.quotable.io/random');
            const data = await response.json();

            currentQuote = data.content;
            currentAuthor = data.author;

            quoteText.textContent = `"${currentQuote}"`;
            quoteAuthor.textContent = `- ${currentAuthor}`;
        } catch (error) {
            quoteText.textContent = "Failed to fetch a quote.";
            console.error(error);
        } finally {
            newQuoteBtn.disabled = false;
            newQuoteBtn.textContent = 'New Quote';
        }
        } catch (error) {
            quoteText.textContent = "Failed to fetch a quote.";
            console.error(error);
        }
    }

    // Fetch a quote when the page first loads.
    getQuote();

    // 'New Quote' button event
    newQuoteBtn.addEventListener('click', getQuote);

    // 'Tweet' button event
    tweetBtn.addEventListener('click', () => {
        const tweetText = `"${currentQuote}" - ${currentAuthor}`;
        const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
        window.open(tweetUrl, "_blank"); // Open Twitter in a new tab
    });
});