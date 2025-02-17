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
        <input type="text" placeholder="Module Name" required>
        <input type="number" placeholder="TD Mark" min="0" max="20" step="0.1" required>
        <div class="module-options">
            <select>
                <option value="40">40% TD / 60% Exam</option>
                <option value="50">50% TD / 50% Exam</option>
            </select>
            <label>
                <input type="checkbox" onchange="toggleExam(this)"> No Exam
            </label>
            <input type="number" placeholder="Coef" value="1" min="1" required>
        </div>
        <input type="number" placeholder="Exam Mark" min="0" max="20" step="0.1" class="exam-input" required>
    `;
    document.getElementById('modules').appendChild (module);
}

// Calculate Average (Algerian Formula)
function calculate() {
    const modules = document.querySelectorAll('.module');
    let total = 0, totalCoef = 0;

    modules.forEach(module => {
        const tdMark = parseFloat(module.children[1].value) || 0;
        const examMark = parseFloat(module.querySelector('.exam-input').value) || 0;
        const coef = parseFloat(module.querySelector('input[type="number"]:last-child').value) || 1;

        if (tdMark && examMark) {
            total += (tdMark * 0.4 + examMark * 0.6) * coef;
        } else if (tdMark) {
            total += tdMark * coef; // If no exam, consider only TD
        }
        totalCoef += coef;
    });

    const average = total / totalCoef;
    document.getElementById('result').innerText = `Your Average: ${average.toFixed(2)}`;
    document.getElementById('result').className = average >= 10 ? 'pass' : 'fail';
}

// Share on Social Media
function shareOnFacebook() {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
}

function shareOnWhatsApp() {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://api.whatsapp.com/send?text=${url}`, '_blank');
        }
