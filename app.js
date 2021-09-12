// variables ---------------------------------------------------------------

const canvas = document.getElementById("paintCanvas");
canvas.width = 700;
canvas.height = 700; // canvas의, 즉 pixel modifier에 사이즈를 정해줘야 함

// <canvas>는 HTML의 태그중 한 종류인데 다른 점은 context를 갖는다는것
// getContext()
// context는 요소안에서 내가 픽셀( <canvas> 여깄는 픽셀들 </canvas> )에 접근할 수 있는 방법이다!
// 방법은 매우 간단함. 바로 아래처럼 하면 됨
const ctx = canvas.getContext("2d");

const initial_color = "#2c2c2c";

ctx.fillStyle = "#fff";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = initial_color;
ctx.fillStyle = initial_color;
ctx.lineWidth = 2.5;

const colors = document.getElementsByClassName("controls_color");

const range = document.getElementById("brushRange");

const paintBtn = document.getElementById("paintBtn");
const fillBtn = document.getElementById("fillBtn");
//---------------------------------------------------------------------

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("onMouseLeave", stopPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("click", changeColorFill);
}

// painting -----------------------------------------------------------

let painting = false;
let filling = false;

function onMouseMove(event) {
  // console.log(event);
  // 로그를 찍으면 event안에는 많은 정보가 있음.
  //MouseEvent {isTrusted: true, screenX: 864, screenY: 670, clientX: 960, clientY: 630, …}
  // 여기서 내가 필요한건 offset X, Y. 이건 캔버스 부분과 관련있는 값.
  // client X,Y는 이 윈도우 전체의 범위내에서 마우스 위치값을 나타내는 건데 나는 캔버스 안에서 그릴거니까 윈도우 전체가 필요있는게 아니여서 offset X, Y만 알면된다.
  // 만약에 캔버스를 스크린 사이즈로 만든다면, client X,Y와 offset X, Y의 값은 같을 것이다.

  const x = event.offsetX;
  const y = event.offsetY;

  // path를 만드는건 기본적으로 line의 시작점을 만드는것이다
  // ctx, 즉 context는 canvas안에서 픽셀을 다루는것!!
  if (!painting) {
    ctx.beginPath(); // painting을 하지 않는다면 path를 시작하고
    ctx.moveTo(x, y); //그리고 그걸 x와 y좌표로 옮길거야
    // 즉, 그냥 마우스를 움직이면 path가 만들어지는거고
    // 마우스가 가는곳으로 path를 옮기는 것이다.
  } else {
    // 처음엔 path를 만들고 나서 lineTo()를 호출하면 moveTo()에서 만들어진 점을 lineTo()로 연결되는거
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

// mousedown했을 때 painting은 true가 되고
function startPainting() {
  painting = true;
}

// mouseleave하면 painting은 false가 되고
// mouseup을 했을 때도 painting 은 false가 됨
function stopPainting() {
  painting = false;
}

// Change Colors ------------------------------------------------------------------
function changeColorClick(event) {
  console.log(event.target.style);
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}
console.log(colors);
console.log(Array.from(colors));

// colors는 ===> const colors = document.getElementsByClassName("controls_color");
// controls_color 이름을 가진 클래스가 많음. 그래서 Array에서 colors를 가지고 오고 forEach로 하나씩 뽑는거지
Array.from(colors).forEach((color) =>
  color.addEventListener("click", changeColorClick)
);

//------------------------------------------------------------------------------------

// brush range
function changeRangeInput(event) {
  const brushSize = event.target.value;
  ctx.lineWidth = brushSize;
}

if (range) {
  range.addEventListener("input", changeRangeInput);
}

//------------------------------------------------------------------------------------

if (fillBtn) {
  fillBtn.addEventListener("click", fillMode);
}

if (paintBtn) {
  paintBtn.addEventListener("click", paintMode);
}

function fillMode() {
  filling = true;
  console.log(filling);
  // if (filling === true) {
  //   // filling 모드 였으면, painting 모드로 바꿀거지
  //   filling = false;
  // } else {
  //   // 이제 filling모드
  //   filling = true;
  //   changeColorFill();
  // }
}

// fill color
function changeColorFill() {
  if (filling) {
    console.log("111");
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  } else {
    console.log("222");
  }
}

function paintMode() {
  filling = false;
}

// reset
function resetCanvas() {
  ctx.fillStyle = "#fff";
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// save canvas
function saveCanvas() {
  const image = canvas.toDataURL("image/jpeg");
  console.log(image);
  const link = document.createElement("a"); // <a> 를 만들어주는거야

  link.href = image;
  link.download = "my_painting";
  link.click();
}
