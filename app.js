const canvas = document.getElementById("paintCanvas");

function onMouseMove(event) {
  // console.log(event);
  // 로그를 찍으면 event안에는 많은 정보가 있음.
  //MouseEvent {isTrusted: true, screenX: 864, screenY: 670, clientX: 960, clientY: 630, …}
  // 여기서 내가 필요한건 offset X, Y. 이건 캔버스 부분과 관련있는 값.
  // client X,Y는 이 윈도우 전체의 범위내에서 마우스 위치값을 나타내는 건데 나는 캔버스 안에서 그릴거니까 윈도우 전체가 필요있는게 아니여서 offset X, Y만 알면된다.
  // 만약에 캔버스를 스크린 사이즈로 만든다면, client X,Y와 offset X, Y의 값은 같을 것이다.

  const x = event.offsetX;
  const y = event.offsetY;
}

// painting이라는 액션용으로 하나 만들어놓고
let painting = false;

// mousedown했을 때 painting은 true가 되고
function onMouseDown(event) {
  painting = true;
}

// mouseleave하면 painting은 false가 되고
function onMouseLeave(event) {
  painting = false;
}

// mouseup을 했을 때도 painting 은 false가 됨
function onMouseUp(event) {
  painting = false;
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", onMouseDown);
  canvas.addEventListener("onMouseLeave", onMouseLeave);
  canvas.addEventListener("mouseup", onMouseUp);
}
