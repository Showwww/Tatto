document.querySelectorAll('.faq-question').forEach((question) => {
  question.addEventListener('click', () => {
    const item = question.closest('.faq-item')
    if (!item) return

    document.querySelectorAll('.faq-item').forEach((i) => {
      if (i !== item) i.classList.remove('active')
    })

    item.classList.toggle('active')
  })
})

