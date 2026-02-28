;(function () {
  const lightbox = document.getElementById('carouselLightbox')
  const lightboxImg = lightbox ? lightbox.querySelector('.carousel-lightbox-img') : null

  if (!lightbox || !lightboxImg) return

  document.querySelectorAll('.gallery-item img').forEach((img) => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src
      lightboxImg.alt = img.alt
      lightbox.classList.add('is-open')
      lightbox.setAttribute('aria-hidden', 'false')
    })
  })
})()
