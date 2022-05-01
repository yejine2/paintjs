// canvas 위에 마우스를 올리면 감지할 수 있게 하기
const canvas = document.getElementById('js-canvas');
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName('js-color');
const range = document.getElementById('js-range');
const mode = document.getElementById('js-mode');
const saveBtn = document.getElementById('js-save');

const INITIAL_COLOR = '#2c2c2c';
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = '#fff';
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

// 기본적으로 false, 마우스로 클릭했을 때 true가 될 것
let painting = false;
// 채우지 않은 상태
let filling = false;

function stopPainting() {
  painting = false;
}
function startPainting() {
  painting = true;
}

// canvas 존재 여부 확인, 캔버스 내에서의 좌표 값
function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    // painting상태가 아닐 때 = 클릭하고 있지 않을 떄
    ctx.beginPath(); // path(선)만 만들어짐
    ctx.moveTo(x, y); //선 시작 좌표
  } else {
    // painting 상태라면 true, startPainting
    ctx.lineTo(x, y); // 선 끝 자표
    ctx.stroke();
  }
}
// Change Color
function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color; // override
  ctx.fillStyle = color;
}
// Brush Size
function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size; // override
}
// Saving the Image
function handleSaveClick() {
  const image = canvas.toDataURL();
  const link = document.createElement('a');
  link.href = image;
  link.download = 'PaintJS[🎨]';
  link.click();
}

function handleModeClick() {
  if (filling === true) {
    filling = false;
    mode.innerHTML = 'Fill';
  } else {
    filling = true;
    mode.innerText = 'Paint';
  }
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

function handleCM(event) {
  event.preventDefault();
}

if (canvas) {
  canvas.addEventListener('mousemove', onMouseMove); // 마우스 감지
  canvas.addEventListener('mousedown', startPainting); // mousedown은 클릭했을때 발생하는 event
  canvas.addEventListener('mouseup', stopPainting); // 마우스를 놓으면 painting 상태가 false
  canvas.addEventListener('mouseleave', stopPainting); // 캔버스를 벗어나면 painting 상태가 false
  canvas.addEventListener('click', handleCanvasClick);
  canvas.addEventListener('contextmenu', handleCM);
}

Array.from(colors).forEach((color) =>
  color.addEventListener('click', handleColorClick)
);

if (range) {
  range.addEventListener('input', handleRangeChange);
}

if (mode) {
  mode.addEventListener('click', handleModeClick);
}

if (saveBtn) {
  saveBtn.addEventListener('click', handleSaveClick);
}
