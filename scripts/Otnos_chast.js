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

// -------------------------------------------------

function solveTask3_1() {
    const n = parseFloat(document.getElementById('t3-1-n').value);
    const p = parseFloat(document.getElementById('t3-1-p').value);
    const epsilon = parseFloat(document.getElementById('t3-1-eps').value);
    const q = 1 - p;

    const factorSquared = n / (p * q);
    const factor = Math.sqrt(factorSquared);
    
    const x = epsilon * factor;
    
    const phi_val = LaplaceIntegral(x);
    
    const result = 2 * phi_val;

    const output = document.getElementById('output-3-1');
    output.innerHTML = `
        <div class="step-box">
            <strong>1. Вычисляем вспомогательный множитель:</strong><br>
            $npq = ${n} \\cdot ${p} \\cdot ${formatNum(q)} = ${formatNum(n * p * q)}$<br>
            $\\sqrt{\\frac{n}{pq}} = \\sqrt{\\frac{${n}}{${p} \\cdot ${formatNum(q)}}} = \\sqrt{${formatNum(factorSquared)}} \\approx ${formatNum(factor)}$
        </div>

        <div class="step-box">
            <strong>2. Находим аргумент функции Лапласа:</strong><br>
            $x = \\varepsilon \\cdot \\sqrt{\\frac{n}{pq}} = ${epsilon} \\cdot ${formatNum(factor)} \\approx ${formatNum(x)}$
        </div>

        <div class="step-box">
            <strong>3. По таблице находим значение:</strong><br>
            $\\Phi(${formatNum(x)}) \\approx ${formatNum(phi_val)}$
        </div>

        <div class="alert alert-primary">
            <strong>Ответ:</strong> $P \\approx 2\\Phi(x) = 2 \\cdot ${formatNum(phi_val)} = ${formatNum(result, 5)}$
        </div>
    `;
    output.style.display = 'block';
    updateMath();
}

function solveTask3_2() {
    const n = parseFloat(document.getElementById('t3-2-n').value);
    const p = parseFloat(document.getElementById('t3-2-p').value);
    const epsilon = parseFloat(document.getElementById('t3-2-eps').value);
    const q = 1 - p;

    const val_under_root = n / (p * q);
    const factor = Math.sqrt(val_under_root);
    const x = epsilon * factor;
    const phi_val = LaplaceIntegral(x);
    const result = 2 * phi_val;

    const output = document.getElementById('output-3-2');
    output.innerHTML = `
        <div class="step-box">
            <strong>1. Параметры:</strong><br>
            $n=${n}, \\quad p=${p}, \\quad q=${formatNum(q)}, \\quad \\varepsilon=${epsilon}$
        </div>

        <div class="step-box">
            <strong>2. Аргумент x:</strong><br>
            $x = \\varepsilon \\sqrt{\\frac{n}{pq}} = ${epsilon} \\cdot \\sqrt{\\frac{${n}}{${formatNum(p*q)}}}$<br>
            $x \\approx ${epsilon} \\cdot ${formatNum(factor)} \\approx ${formatNum(x)}$
        </div>

        <div class="step-box">
            <strong>3. Вероятность:</strong><br>
            $\\Phi(${formatNum(x)}) \\approx ${formatNum(phi_val)}$<br>
            $P = 2\\Phi(x)$
        </div>

        <div class="alert alert-primary">
            <strong>Ответ:</strong> $P \\approx 2 \\cdot ${formatNum(phi_val)} = ${formatNum(result, 5)}$
        </div>
    `;
    output.style.display = 'block';
    updateMath();
}