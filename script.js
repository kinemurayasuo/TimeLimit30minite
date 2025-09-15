document.addEventListener('DOMContentLoaded', () => {
    const quoteText = document.getElementById('quote-text');
    const quoteAuthor = document.getElementById('quote-author');
    const newQuoteBtn = document.getElementById('new-quote-btn');

    async function getQuote() {
        try {
            // 무료 명언 API 주소
            const response = await fetch('https://api.quotable.io/random');
            const data = await response.json();

            quoteText.textContent = `"${data.content}"`;
            quoteAuthor.textContent = `- ${data.author}`;
        } catch (error) {
            quoteText.textContent = "명언을 가져오는 데 실패했습니다.";
            console.error(error);
        }
    }

    // 페이지가 처음 열릴 때 명언을 가져옵니다.
    getQuote();

    // 버튼을 누르면 새 명언을 가져옵니다.
    newQuoteBtn.addEventListener('click', getQuote);
});