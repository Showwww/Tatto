(function () {
  'use strict'

  const hero = document.querySelector('.hero')
  if (!hero) return

  const CONFIG = {
    particleCount: 150,
    particleColor: '#4af7e2',
    lineColor: 'rgba(74,247,226,0.1)',
    mouseRadius: 150,
    lineDistance: 70,
    speedFactor: 0.4,
    repulsionStrength: 1.5,
  }

  const canvas = document.createElement('canvas')
  canvas.id = 'heroParticleCanvas'

  hero.appendChild(canvas)

  const ctx = canvas.getContext('2d')

  let width = 0
  let height = 0
  let particles = []
  let heroRect = hero.getBoundingClientRect()

  const mouse = {
    x: null,
    y: null,
    radius: CONFIG.mouseRadius,
  }

  const trail = []
  const TRAIL_LENGTH = 60

  function initCanvas() {
    heroRect = hero.getBoundingClientRect()
    width = heroRect.width
    height = heroRect.height

    const dpr = window.devicePixelRatio || 1
    canvas.width = width * dpr
    canvas.height = height * dpr
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    particles = []
    for (let i = 0; i < CONFIG.particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * CONFIG.speedFactor,
        vy: (Math.random() - 0.5) * CONFIG.speedFactor,
        size: Math.random() * 2 + 1,
      })
    }
  }

  initCanvas()

  window.addEventListener('mousemove', (e) => {
    heroRect = hero.getBoundingClientRect()
    const insideX = e.clientX >= heroRect.left && e.clientX <= heroRect.right
    const insideY = e.clientY >= heroRect.top && e.clientY <= heroRect.bottom

    if (insideX && insideY) {
      mouse.x = e.clientX - heroRect.left
      mouse.y = e.clientY - heroRect.top

      trail.push({ x: mouse.x, y: mouse.y })
      if (trail.length > TRAIL_LENGTH) trail.shift()
    } else {
      mouse.x = null
      mouse.y = null
      trail.length = 0
    }
  })

  function draw() {
    ctx.clearRect(0, 0, width, height)

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i]

      p.x += p.vx
      p.y += p.vy

      if (p.x < 0 || p.x > width) p.vx *= -1
      if (p.y < 0 || p.y > height) p.vy *= -1

      if (mouse.x !== null && mouse.y !== null) {
        const dx = p.x - mouse.x
        const dy = p.y - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < mouse.radius) {
          const angle = Math.atan2(dy, dx)
          const force = (mouse.radius - dist) / mouse.radius
          p.x += Math.cos(angle) * force * CONFIG.repulsionStrength
          p.y += Math.sin(angle) * force * CONFIG.repulsionStrength
        }
      }

      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
      ctx.fillStyle = CONFIG.particleColor
      ctx.fill()

      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j]
        const dx = p.x - p2.x
        const dy = p.y - p2.y
        const d = Math.sqrt(dx * dx + dy * dy)
        if (d < CONFIG.lineDistance) {
          ctx.strokeStyle = CONFIG.lineColor
          ctx.lineWidth = 0.5
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(p2.x, p2.y)
          ctx.stroke()
        }
      }
    }

    // rainbow cursor trail
    for (let i = 0; i < trail.length; i++) {
      const ratio = i / trail.length
      const point = trail[i]
      ctx.beginPath()
      ctx.arc(point.x, point.y, 12 * (1 - ratio), 0, Math.PI * 2)
      ctx.fillStyle = `hsla(${i * 4}, 100%, 60%, ${0.8 * (1 - ratio)})`
      ctx.fill()
    }

    requestAnimationFrame(draw)
  }

  draw()

  window.addEventListener('resize', initCanvas)
})()

