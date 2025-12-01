function phi(x) {
    return (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * Math.pow(x, 2));
}

function LaplaceIntegral(x) {
    if (x < 0) return -LaplaceIntegral(-x);
    if (x > 5) return 0.5;

    let sum = 0;
    const step = 0.001;
    for (let t = 0; t < x; t += step) {
        sum += Math.exp(-0.5 * t * t) * step;
    }
    return (1 / Math.sqrt(2 * Math.PI)) * sum;
}

function formatNum(num, digits = 4) {
    return Number(num).toFixed(digits).replace(/\.?0+$/, "");
}

function updateMath() {
    if (window.MathJax) {
        MathJax.typesetPromise();
    }
}

// ------------------------------------------------------

function solveTask2_1() {
    const n = parseFloat(document.getElementById('t2-1-n').value);
    const k = parseFloat(document.getElementById('t2-1-k').value);
    const p = parseFloat(document.getElementById('t2-1-p').value);
    const q = 1 - p;

    const np = n * p;
    const npq = n * p * q;
    const sqrt_npq = Math.sqrt(npq);
    const x = (k - np) / sqrt_npq;
    const phi_val = phi(x);
    const result = (1 / sqrt_npq) * phi_val;

    const output = document.getElementById('output-2-1');
    output.innerHTML = `
        <div class="step-box">
            <strong>1. Параметры:</strong><br>
            $np = ${formatNum(np)}, \\quad q = ${formatNum(q)}$<br>
            $\\sqrt{npq} = \\sqrt{${formatNum(npq)}} \\approx ${formatNum(sqrt_npq)}$
        </div>
        <div class="step-box">
            <strong>2. Аргумент функции:</strong><br>
            $x = \\frac{k - np}{\\sqrt{npq}} = \\frac{${k} - ${formatNum(np)}}{${formatNum(sqrt_npq)}} \\approx ${formatNum(x)}$
        </div>
        <div class="step-box">
            <strong>3. Значение функции (по таблице):</strong><br>
            $\\varphi(${formatNum(x)}) \\approx ${formatNum(phi_val)}$
        </div>
        <div class="alert alert-primary">
            <strong>Ответ:</strong> $P_{${n}}(${k}) \\approx \\frac{${formatNum(phi_val)}}{${formatNum(sqrt_npq)}} \\approx ${formatNum(result, 5)}$
        </div>
    `;
    output.style.display = 'block';
    updateMath();
}

function solveTask2_2() {
    const n = parseFloat(document.getElementById('t2-2-n').value);
    const k = parseFloat(document.getElementById('t2-2-k').value);
    const p = parseFloat(document.getElementById('t2-2-p').value);
    const q = 1 - p;

    const np = n * p;
    const npq = n * p * q;
    const sqrt_npq = Math.sqrt(npq);
    const x = (k - np) / sqrt_npq;
    const phi_val = phi(x);
    const result = (1 / sqrt_npq) * phi_val;

    const output = document.getElementById('output-2-2');
    output.innerHTML = `
        <div class="step-box">
            <strong>1. Расчет x:</strong><br>
            $np = ${formatNum(np)}, \\sqrt{npq} \\approx ${formatNum(sqrt_npq)}$<br>
            $x = \\frac{${k} - ${formatNum(np)}}{${formatNum(sqrt_npq)}} \\approx ${formatNum(x)}$
        </div>
        <div class="alert alert-primary">
            <strong>Ответ:</strong> $P \\approx \\frac{\\varphi(${formatNum(x)})}{${formatNum(sqrt_npq)}} \\approx ${formatNum(result, 5)}$
        </div>
    `;
    output.style.display = 'block';
    updateMath();
}

function solveTask2_3() {
    const n = parseFloat(document.getElementById('t2-3-n').value);
    const k = parseFloat(document.getElementById('t2-3-k').value);
    const p_pass = parseFloat(document.getElementById('t2-3-p').value);

    const p = 1 - p_pass;
    const q = p_pass;

    const np = n * p;
    const npq = n * p * q;
    const sqrt_npq = Math.sqrt(npq);
    const x = (k - np) / sqrt_npq;
    const phi_val = phi(x);
    const result = (1 / sqrt_npq) * phi_val;

    const output = document.getElementById('output-2-3');
    output.innerHTML = `
        <div class="step-box">
            <strong>1. Пересчет вероятности:</strong><br>
            Нас интересуют машины, которые <em>не прошли</em>.<br>
            $p = 1 - ${p_pass} = ${formatNum(p)}$
        </div>
        <div class="step-box">
            <strong>2. Вычисления:</strong><br>
            $np = ${formatNum(np)}, \\quad \\sqrt{npq} \\approx ${formatNum(sqrt_npq)}$<br>
            $x = \\frac{${k} - ${formatNum(np)}}{${formatNum(sqrt_npq)}} \\approx ${formatNum(x)}$
        </div>
        <div class="alert alert-success">
            <strong>Ответ:</strong> $P \\approx ${formatNum(result, 5)}$
        </div>
    `;
    output.style.display = 'block';
    updateMath();
}

function solveTask2_4() {
    const n = parseFloat(document.getElementById('t2-4-n').value);
    const m1 = parseFloat(document.getElementById('t2-4-m1').value);
    const m2 = parseFloat(document.getElementById('t2-4-m2').value);
    const p = parseFloat(document.getElementById('t2-4-p').value);
    const q = 1 - p;

    const np = n * p;
    const sqrt_npq = Math.sqrt(n * p * q);

    const x1 = (m1 - np) / sqrt_npq;
    const x2 = (m2 - np) / sqrt_npq;

    const Phi_x1 = LaplaceIntegral(x1);
    const Phi_x2 = LaplaceIntegral(x2);
    const result = Phi_x2 - Phi_x1;

    const output = document.getElementById('output-2-4');
    output.innerHTML = `
        <div class="step-box">
            <strong>1. Границы интеграла:</strong><br>
            $np = ${formatNum(np)}, \\quad \\sqrt{npq} \\approx ${formatNum(sqrt_npq)}$<br>
            $x_1 = \\frac{${m1} - ${formatNum(np)}}{${formatNum(sqrt_npq)}} \\approx ${formatNum(x1)}$<br>
            $x_2 = \\frac{${m2} - ${formatNum(np)}}{${formatNum(sqrt_npq)}} \\approx ${formatNum(x2)}$
        </div>
        <div class="step-box">
            <strong>2. Значения функции Лапласа:</strong><br>
            $\\Phi(x_2) \\approx ${formatNum(Phi_x2)}$<br>
            $\\Phi(x_1) \\approx ${formatNum(Phi_x1)}$
        </div>
        <div class="alert alert-warning text-dark">
            <strong>Ответ:</strong> $P = \\Phi(x_2) - \\Phi(x_1) \\approx ${formatNum(result, 5)}$
        </div>
    `;
    output.style.display = 'block';
    updateMath();
}

function solveTask2_5() {
    const n = parseFloat(document.getElementById('t2-5-n').value);
    const m2 = parseFloat(document.getElementById('t2-5-m2').value);
    const p = parseFloat(document.getElementById('t2-5-p').value);
    const m1 = 0;

    const np = n * p;
    const sqrt_npq = Math.sqrt(n * p * (1 - p));

    const x1 = (m1 - np) / sqrt_npq;
    const x2 = (m2 - np) / sqrt_npq;

    const Phi_x1 = LaplaceIntegral(x1);
    const Phi_x2 = LaplaceIntegral(x2);
    const result = Phi_x2 - Phi_x1;

    const output = document.getElementById('output-2-5');
    output.innerHTML = `
        <div class="step-box">
            <strong>1. Границы:</strong><br>
            Интервал: $[0; ${m2}]$<br>
            $x_1 = \\frac{0 - ${formatNum(np)}}{${formatNum(sqrt_npq)}} \\approx ${formatNum(x1)}$<br>
            $x_2 = \\frac{${m2} - ${formatNum(np)}}{${formatNum(sqrt_npq)}} \\approx ${formatNum(x2)}$
        </div>
        <div class="step-box">
            <strong>2. Функция Лапласа (учтем нечетность):</strong><br>
            $\\Phi(${formatNum(x2)}) \\approx ${formatNum(Phi_x2)}$<br>
            $\\Phi(${formatNum(x1)}) \\approx ${formatNum(Phi_x1)}$
        </div>
        <div class="alert alert-info text-dark">
            <strong>Ответ:</strong> $P \\approx ${formatNum(Phi_x2)} - (${formatNum(Phi_x1)}) = ${formatNum(result, 5)}$
        </div>
    `;
    output.style.display = 'block';
    updateMath();
}

function solveTask2_6() {
    const N = 10000;
    const n = 2 * N;
    const p = 0.5;
    const q = 0.5;

    const np = n * p;
    const sqrt_npq = Math.sqrt(n * p * q);

    const x1 = -1;
    const x2 = 1;
    const Phi_x2 = LaplaceIntegral(x2);
    const Phi_x1 = LaplaceIntegral(x1);
    const result = Phi_x2 - Phi_x1;

    const output = document.getElementById('output-2-6');
    output.innerHTML = `
        <div class="step-box">
            <strong>1. Анализ условия:</strong><br>
            $n = 2N, \\quad p=0.5$<br>
            $np = N, \\quad \\sqrt{npq} = \\frac{\\sqrt{2N}}{2}$
        </div>
        <div class="step-box">
            <strong>2. Границы интервала:</strong><br>
            $m_{1,2} = N \\pm \\frac{\\sqrt{2N}}{2}$<br>
            Отклонение от $np$: $m - np = \\pm \\frac{\\sqrt{2N}}{2}$
        </div>
        <div class="step-box">
            <strong>3. Переход к x:</strong><br>
            $x = \\frac{m - np}{\\sqrt{npq}} = \\frac{\\pm \\sqrt{2N}/2}{\\sqrt{2N}/2} = \\pm 1$
        </div>
        <div class="alert alert-dark text-white">
            <strong>Ответ:</strong> $P \\approx \\Phi(1) - \\Phi(-1) = 2\\Phi(1) \\approx ${formatNum(result, 4)}$
        </div>
    `;
    output.style.display = 'block';
    updateMath();
}