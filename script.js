document.addEventListener('DOMContentLoaded', () => {
    const quoteText = document.getElementById('quote-text');
    const quoteAuthor = document.getElementById('quote-author');
    const newQuoteBtn = document.getElementById('new-quote-btn');
    const tweetBtn = document.getElementById('tweet-btn'); // 새로 추가!

    let currentQuote = '';
    let currentAuthor = '';

    async function getQuote() {
        // --- 기능 추가 시작 ---
        newQuoteBtn.disabled = true; // 버튼 비활성화
        newQuoteBtn.textContent = '가져오는 중...'; // 버튼 텍스트 변경
        // --- 기능 추가 끝 ---

        try {
            
            try {
            
            // 배경색 바꾸는 코드 딱 한 줄 추가!
            document.body.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 95%)`;

            // (PC방 시간 문제 해결을 위해 http로 유지합니다)
                        const response = await fetch('https://api.quotable.io/random');
            const data = await response.json();

            currentQuote = data.content;
            currentAuthor = data.author;

            quoteText.textContent = `"${currentQuote}"`;
            quoteAuthor.textContent = `- ${currentAuthor}`;
        } catch (error) {
            quoteText.textContent = "명언을 가져오는 데 실패했습니다.";
            console.error(error);
        } finally {
            newQuoteBtn.disabled = false;
            newQuoteBtn.textContent = '새 명언 가져오기';
        }
        } catch (error) {
            quoteText.textContent = "명언을 가져오는 데 실패했습니다.";
            console.error(error);
        }
    }

    // 페이지가 처음 열릴 때 명언을 가져옵니다.
    getQuote();

    // '새 명언' 버튼 이벤트
    newQuoteBtn.addEventListener('click', getQuote);

    // '트윗하기' 버튼 이벤트 (새로 추가!)
    tweetBtn.addEventListener('click', () => {
        const tweetText = `"${currentQuote}" - ${currentAuthor}`;
        const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
        window.open(tweetUrl, "_blank"); // 새 탭에서 트위터 창 열기
    });
});


// 으아아아 빨리빨리