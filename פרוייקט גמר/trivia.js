document.addEventListener('DOMContentLoaded', () => {
    const questions = [
        { question: "מהי התזונה העיקרית של פינגווינים?", answers: ["דגים", "צמחים", "חרקים"], correct: 0 },
        { question: "כמה מיני פינגווינים יש?", answers: ["18", "20", "22"], correct: 0 },
        { question: "היכן חיים הפינגווינים?", answers: ["הקוטב הדרומי", "הקוטב הצפוני", "המדבר הסהרה"], correct: 0 },
        { question: "מהו אורך החיים הממוצע של פינגווין?", answers: ["15 שנים", "10 שנים", "20 שנים"], correct: 1 },
        { question: "כמה זמן יכולים פינגווינים להחזיק את נשימתם מתחת למים?", answers: ["20 דקות", "30 דקות", "10 דקות"], correct: 2 },
        { question: "מהי המהירות המקסימלית של פינגווין במים?", answers: ["10 קמ\"ש", "20 קמ\"ש", "30 קמ\"ש"], correct: 1 },
        { question: "מהי גובהו של הפינגווין הקטן ביותר?", answers: ["30 ס\"מ", "40 ס\"מ", "50 ס\"מ"], correct: 0 },
        { question: "איזה פינגווין ידוע בקולו הרם?", answers: ["הקיסרי", "האדליה", "המגלן"], correct: 0 },
        { question: "מהו המשקל הממוצע של פינגווין קיסרי?", answers: ["30 ק\"ג", "20 ק\"ג", "40 ק\"ג"], correct: 1 },
        { question: "כמה ביצים מטילה נקבת הפינגווין?", answers: ["1-2", "3-4", "5-6"], correct: 0 },
    ];

    let currentQuestion = 0;

    const questionContainer = document.getElementById('question-container');
    const correctSound = document.getElementById('correct-sound');
    const incorrectSound = document.getElementById('incorrect-sound');

    function showQuestion() {
        const q = questions[currentQuestion];
        questionContainer.innerHTML = `
            <h2>${q.question}</h2>
            <ul>
                ${q.answers.map((answer, index) => `
                    <li>
                        <button onclick="checkAnswer(${index})">${answer}</button>
                    </li>
                `).join('')}
            </ul>
        `;
    }

    window.checkAnswer = (index) => {
        const buttons = document.querySelectorAll('button');
        buttons.forEach((button, idx) => {
            if (idx === questions[currentQuestion].correct) {
                button.classList.add('correct');
                correctSound.play(); // Play sound for correct answer
            } else {
                button.classList.add('incorrect');
            }
        });
        // Move to the next question regardless of correctness
        setTimeout(() => {
            currentQuestion++;
            if (currentQuestion < questions.length) {
                showQuestion();
            } else {
                window.location.href = 'factGame.html'; // Move to factGame.html at the end
            }
        }, 1000); // Delay before showing the next question
    };

    showQuestion();
});
