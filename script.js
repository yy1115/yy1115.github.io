// script.js
const optionInput = document.getElementById('option-input');
const addOptionBtn = document.getElementById('add-option');
const spinWheelBtn = document.getElementById('spin-wheel');
const canvas = document.getElementById('wheel');
const ctx = canvas.getContext('2d');
let options = JSON.parse(localStorage.getItem('options')) || [];

function drawWheel() {
    const segments = options.length;
    const angle = 2 * Math.PI / segments;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    options.forEach((option, index) => {
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, canvas.height / 2);
        ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, angle * index, angle * (index + 1));
        ctx.closePath();
        ctx.fillStyle = `hsl(${360 / segments * index}, 100%, 50%)`;
        ctx.fill();
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(angle * index + angle / 2);
        ctx.fillStyle = '#fff';
        ctx.fillText(option, 120, 10);
        ctx.restore();
    });
}

function spinWheel() {
    const spinAngle = Math.random() * 360 + 720;
    let currentAngle = 0;
    const spinInterval = setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate((spinAngle + currentAngle) * Math.PI / 180);
        ctx.translate(-canvas.width / 2, -canvas.height / 2);
        drawWheel();
        ctx.restore();
        currentAngle += 10;
        if (currentAngle >= spinAngle) {
            clearInterval(spinInterval);
        }
    }, 20);
}

function addOption() {
    const option = optionInput.value.trim();
    if (option) {
        options.push(option);
        optionInput.value = '';
        localStorage.setItem('options', JSON.stringify(options));
        drawWheel();
    }
}

addOptionBtn.addEventListener('click', addOption);
spinWheelBtn.addEventListener('click', spinWheel);

// 页面加载时绘制转盘
drawWheel();
