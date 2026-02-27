const carouselTrack = document.getElementById('carouselTrack')
const prevArrow = document.querySelector('.carousel-arrow--prev')
const nextArrow = document.querySelector('.carousel-arrow--next')
const lightbox = document.getElementById('carouselLightbox')
const lightboxImg = lightbox ? lightbox.querySelector('.carousel-lightbox-img') : null

if (carouselTrack && prevArrow && nextArrow) {
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
    slide.className = 'carousel-slide'

    const img = document.createElement('img')
    img.src = src
    img.alt = alt

    slide.appendChild(img)
    return slide
  }

  imagePaths.forEach((src, index) => {
    carouselTrack.appendChild(createSlide(src, `Татуювання ${index + 1}`))
  })
  imagePaths.forEach((src, index) => {
    carouselTrack.appendChild(createSlide(src, `Татуювання ${index + 1}`))
  })

  const slides = Array.from(carouselTrack.children)
  let offset = 0
  let singleSetWidth = 0
  const SPEED = 0.70

  const recalcSizes = () => {
    singleSetWidth = carouselTrack.scrollWidth / 2
  }

  const updatePosition = () => {
    carouselTrack.style.transform = `translateX(${-offset}px)`
  }

  const animate = () => {
    offset += SPEED
    if (singleSetWidth > 0 && offset >= singleSetWidth) offset = 0
    updatePosition()
    requestAnimationFrame(animate)
  }

  nextArrow.addEventListener('click', () => {
    const step = singleSetWidth > 0 ? singleSetWidth / slides.length : 0
    if (step) offset = (offset + step) % singleSetWidth
  })

  prevArrow.addEventListener('click', () => {
    const step = singleSetWidth > 0 ? singleSetWidth / slides.length : 0
    if (step) offset = (offset - step + singleSetWidth) % singleSetWidth
  })

  window.addEventListener('load', recalcSizes)
  window.addEventListener('resize', recalcSizes)
  recalcSizes()
  updatePosition()
  animate()

  // Zoom / lightbox
  if (lightbox && lightboxImg) {
    slides.forEach((slide) => {
      const img = slide.querySelector('img')
      if (!img) return

      img.addEventListener('click', () => {
        lightboxImg.src = img.src
        lightboxImg.alt = img.alt
        lightbox.classList.add('is-open')
        lightbox.setAttribute('aria-hidden', 'false')
      })
    })

    lightbox.addEventListener('click', () => {
      lightbox.classList.remove('is-open')
      lightbox.setAttribute('aria-hidden', 'true')
    })
  }
}

// Портфоліо: клік по фото відкриває той самий лайтбокс
if (lightbox && lightboxImg) {
  document.querySelectorAll('.portfolio-grid img').forEach((img) => {
    img.addEventListener('click', (e) => {
      e.preventDefault()
      lightboxImg.src = img.src
      lightboxImg.alt = img.alt
      lightbox.classList.add('is-open')
      lightbox.setAttribute('aria-hidden', 'false')
    })
  })
}

