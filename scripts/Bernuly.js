function factorial(n) {
    if (n < 0) return undefined;
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

function combination(n, k) {
    if (k < 0 || k > n) return 0;
    return factorial(n) / (factorial(k) * factorial(n - k));
}

function formatNum(num, digits = 5) {
    return Number(num).toFixed(digits).replace(/\.?0+$/, "");
}

// ------------------------------------------------------

function solveTask1_Interactive() {
    const n = parseInt(document.getElementById('t1-n').value);
    const k = parseInt(document.getElementById('t1-k').value);
    const p_error = parseFloat(document.getElementById('t1-p-err').value);

    if (k > n) {
        alert("Количество успехов (k) не может быть больше общего числа (n)!");
        return;
    }

    const p = 1 - p_error;
    const q = p_error;

    const C_nk = combination(n, k);
    const p_pow_k = Math.pow(p, k);
    const q_pow_nk = Math.pow(q, n - k);
    const result = C_nk * p_pow_k * q_pow_nk;

    const outputContainer = document.getElementById('output-1');
    const contentBox = document.getElementById('result-content-1');

    contentBox.innerHTML = `
        <div class="step-box">
            <strong>Шаг 1. Определение вероятностей:</strong><br>
            Так как ищем документы <em>без ошибок</em>:<br>
            Вероятность успеха: $p = 1 - ${p_error} = ${formatNum(p)}$<br>
            Вероятность неудачи: $q = ${p_error}$
        </div>

        <div class="step-box">
            <strong>Шаг 2. Расчет биномиального коэффициента:</strong><br>
            $C_{${n}}^{${k}} = \\frac{${n}!}{${k}!(${n}-${k})!} = ${C_nk}$
        </div>

        <div class="step-box">
            <strong>Шаг 3. Подстановка в формулу Бернулли:</strong><br>
            $P_{${n}}(${k}) = ${C_nk} \\cdot (${formatNum(p)})^{${k}} \\cdot (${formatNum(q)})^{${n - k}}$<br>
            <br>
            $P_{${n}}(${k}) = ${C_nk} \\cdot ${formatNum(p_pow_k)} \\cdot ${formatNum(q_pow_nk)}$
        </div>

        <div class="alert alert-success mt-2">
            <strong>Ответ:</strong> $P \\approx ${formatNum(result, 6)}$
        </div>
    `;

    outputContainer.style.display = 'block';

    if (window.MathJax) {
        MathJax.typesetPromise([outputContainer]);
    }
}

function solveTask2_Interactive() {
    const n = parseInt(document.getElementById('t2-n').value);
    const k = parseInt(document.getElementById('t2-k').value);
    const p = parseFloat(document.getElementById('t2-p').value);

    if (k > n) {
        alert("k не может быть больше n!");
        return;
    }

    const q = 1 - p;

    const C_nk = combination(n, k);
    const p_pow_k = Math.pow(p, k);
    const q_pow_nk = Math.pow(q, n - k);
    const result = C_nk * p_pow_k * q_pow_nk;

    const outputContainer = document.getElementById('output-2');
    const contentBox = document.getElementById('result-content-2');

    contentBox.innerHTML = `
        <div class="step-box">
            <strong>Шаг 1. Определение параметров:</strong><br>
            $n = ${n}, k = ${k}$<br>
            Вероятность события $p = ${p}$<br>
            Вероятность обратного события $q = 1 - ${p} = ${formatNum(q)}$
        </div>

        <div class="step-box">
            <strong>Шаг 2. Число сочетаний:</strong><br>
            $C_{${n}}^{${k}} = \\frac{${n}!}{${k}! \\cdot ${n - k}!} = ${C_nk}$
        </div>

        <div class="step-box">
            <strong>Шаг 3. Расчет по формуле:</strong><br>
            $P_{${n}}(${k}) = ${C_nk} \\cdot (${p})^{${k}} \\cdot (${formatNum(q)})^{${n - k}}$
        </div>

        <div class="alert alert-success mt-2">
            <strong>Ответ:</strong> $P \\approx ${formatNum(result, 6)}$
        </div>
    `;

    outputContainer.style.display = 'block';

    if (window.MathJax) {
        MathJax.typesetPromise([outputContainer]);
    }
}