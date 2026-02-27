const cursor = document.getElementById('cursor')
const ring = document.getElementById('cursorRing')

let mx = 0
let my = 0
let rx = 0
let ry = 0

document.addEventListener('mousemove', (e) => {
  mx = e.clientX
  my = e.clientY
  cursor.style.left = `${mx}px`
  cursor.style.top = `${my}px`
})

function animateRing() {
  rx += (mx - rx) * 0.12
  ry += (my - ry) * 0.12
  ring.style.left = `${rx}px`
  ring.style.top = `${ry}px`
  requestAnimationFrame(animateRing)
}

animateRing()

document.querySelectorAll('a, button').forEach((el) => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width = '20px'
    cursor.style.height = '20px'
    ring.style.width = '60px'
    ring.style.height = '60px'
  })

  el.addEventListener('mouseleave', () => {
    cursor.style.width = '10px'
    cursor.style.height = '10px'
    ring.style.width = '36px'
    ring.style.height = '36px'
  })
})

