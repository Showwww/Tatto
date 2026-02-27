const workTrack = document.getElementById('workTrack')

if (workTrack) {
  const imagePaths = [
    './assets/images/Знімок екрана 2026-02-22 о 8.46.56 пп.png',
    './assets/images/Знімок екрана 2026-02-23 о 10.59.05 дп.png',
    './assets/images/Знімок екрана 2026-02-23 о 11.01.19 дп.png',
    './assets/images/Знімок екрана 2026-02-23 о 11.01.56 дп.png',
    './assets/images/Знімок екрана 2026-02-23 о 11.02.21 дп.png',
    './assets/images/Знімок екрана 2026-02-23 о 11.03.12 дп.png',
    './assets/images/Знімок екрана 2026-02-23 о 11.04.33 дп.png',
    './assets/images/Знімок екрана 2026-02-23 о 11.05.22 дп.png',
    './assets/images/Знімок екрана 2026-02-23 о 11.06.04 дп.png',
    './assets/images/Знімок екрана 2026-02-23 о 11.06.40 дп.png',
  ]

  const createSlide = (src, alt) => {
    const slide = document.createElement('div')
    slide.className = 'work-slide'

    const img = document.createElement('img')
    img.src = src
    img.alt = alt

    slide.appendChild(img)
    return slide
  }

  imagePaths.forEach((src, index) => {
    workTrack.appendChild(createSlide(src, `Татуювання ${index + 1}`))
  })

  imagePaths.forEach((src, index) => {
    workTrack.appendChild(createSlide(src, `Татуювання ${index + 1} (дубль)`))
  })

  let offset = 0
  let trackWidth = 0
  let singleSetWidth = 0

  const recalcSizes = () => {
    trackWidth = workTrack.scrollWidth
    singleSetWidth = trackWidth / 2
  }

  window.addEventListener('load', recalcSizes)
  window.addEventListener('resize', recalcSizes)
  recalcSizes()

  const SPEED = 0.2

  const animate = () => {
    offset += SPEED
    if (singleSetWidth > 0 && offset >= singleSetWidth) {
      offset = 0
    }
    workTrack.style.transform = `translateX(${-offset}px)`
    requestAnimationFrame(animate)
  }

  animate()
}

