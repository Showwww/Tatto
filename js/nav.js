const nav = document.getElementById('nav')
const burger = document.querySelector('.nav-burger')
const links = document.querySelectorAll('.nav-links a')

if (nav && burger) {
  burger.addEventListener('click', () => {
    const open = nav.classList.toggle('nav-open')
    burger.setAttribute('aria-expanded', open)
  })

  links.forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('nav-open')
      burger.setAttribute('aria-expanded', 'false')
    })
  })
}
