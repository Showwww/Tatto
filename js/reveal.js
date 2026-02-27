const revealEls = document.querySelectorAll('.reveal')

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
        entry.target.querySelectorAll('.skill-fill').forEach((bar) => {
          setTimeout(() => bar.classList.add('animated'), 300)
        })
      }
    })
  },
  { threshold: 0.15 },
)

revealEls.forEach((el) => observer.observe(el))

const skillSection = document.querySelector('.craft')

const skillObserver = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting) {
      document.querySelectorAll('.skill-fill').forEach((bar) => {
        bar.classList.add('animated')
      })
    }
  },
  { threshold: 0.3 },
)

if (skillSection) skillObserver.observe(skillSection)

