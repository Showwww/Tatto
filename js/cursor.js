const cursor = document.getElementById("cursor");
const ring = document.getElementById("cursorRing");

let tx = -100;
let ty = -100;
let cx = -100;
let cy = -100;
let rx = -100;
let ry = -100;

document.addEventListener("pointermove", (e) => {
  tx = e.clientX;
  ty = e.clientY;
});

function animate() {
  cx += (tx - cx) * 0.35;
  cy += (ty - cy) * 0.35;
  cursor.style.left = `${cx}px`;
  cursor.style.top = `${cy}px`;

  rx += (tx - rx) * 0.25;
  ry += (ty - ry) * 0.25;
  ring.style.left = `${rx}px`;
  ring.style.top = `${ry}px`;

  requestAnimationFrame(animate);
}
animate();

document.querySelectorAll('a, button, [role="button"]').forEach((el) => {
  el.addEventListener("mouseenter", () => {
    cursor.classList.add("hover");
    ring.classList.add("hover");
  });
  el.addEventListener("mouseleave", () => {
    cursor.classList.remove("hover");
    ring.classList.remove("hover");
  });
});
