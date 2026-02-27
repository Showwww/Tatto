document.querySelectorAll('.accordion-header').forEach((header) => {
  header.addEventListener('click', () => {
    const item = header.closest('.accordion-item')
    if (!item) return

    document.querySelectorAll('.accordion-item').forEach((i) => {
      if (i !== item) i.classList.remove('active')
    })
    item.classList.toggle('active')
  })
})
