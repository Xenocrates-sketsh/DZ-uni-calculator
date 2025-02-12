// Dark Mode Toggle (🌙/🌞)
function toggleDarkMode() {
    const body = document.body;
    const isDark = body.getAttribute('data-theme') === 'dark';
    body.setAttribute('data-theme', isDark ? 'light' : 'dark');
    document.getElementById('darkModeBtn').textContent = isDark ? '🌙' : '🌞';
}

// Add Module (TD/Exam/Coefficient)
function addModule() {
    const module = document.createElement('div');
    module.className = 'module';
    module.innerHTML = `
        <input type="text" placeholder="Module Name">
        <input type="number" placeholder="TD Mark" min="0" max="20" step="0.1">
        <div class="module-options">
            <select>
                <option value="40">40% TD / 60% Exam</option>
                <option value="50">50% TD / 50% Exam</option>
            </select>
            <label>
                <input type="checkbox" onchange="toggleExam(this)"> No Exam
            </label>
            <input type="number" placeholder="Coef" value="1" min="1">
        </div>
        <input type="number" placeholder="Exam Mark" min="0" max="20" step="0.1" class="exam-input">
    `;
    document.getElementById('modules').appendChild(module);
}

// Toggle Exam Field
function toggleExam(checkbox) {
    const examInput = checkbox.closest('.module').querySelector('.exam-input');
    examInput.disabled = checkbox.checked;
    examInput.value = checkbox.checked ? '' : ''; // Clear exam mark if no exam
}

// Calculate Average (Algerian Formula)
function calculate() {
    const modules = document.querySelectorAll('.module');
    let total = 0, totalCoef = 0;

    modules.forEach(module => {
        const tdMark = parseFloat(module.children[1].value) || 0;
        const split = parseInt(module.querySelector('select').value);
        const examMark = parseFloat(module.querySelector('.exam-input').value) || 0;
        const hasExam = !module.querySelector('input[type="checkbox"]').checked;
        const coef = parseFloat(module.querySelector('input[type="number"][placeholder="Coef"]').value) || 1;

        let moduleAvg;
        if (hasExam) {
            moduleAvg = (tdMark * split/100) + (examMark * (100 - split)/100);
        } else {
            moduleAvg = tdMark; // No exam = TD mark is 100%
        }

        total += moduleAvg * coef;
        totalCoef += coef;
    });

    const avg = total / totalCoef;
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <h3>Semester Average:</h3>
        <div style="font-size:24px;color:${avg >= 10 ? 'var(--primary)' : 'red'}">${avg.toFixed(2)}/20</div>
        <p>${avg >= 10 ? '✅ Pass!' : '❌ Fail!'}</p>
    `;
}

// Initialize first module
window.onload = addModule;