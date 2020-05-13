(function () {
  const menuIcon = document.querySelector('#nav-icon')
  const menuContent = document.querySelector('.menu-list')
  const mainContent = document.querySelector('.main')

  menuIcon.addEventListener('click', () => {
    const open = menuIcon.classList.contains('open')
    if (!open) {
      menuIcon.classList.add('open')
      mainContent.classList.add('menu-transition-hide')
      mainContent.classList.remove('menu-transition')
      menuContent.classList.add('menu-transition')
      menuContent.classList.remove('menu-transition-hide')
    } else {
      menuIcon.classList.remove('open')
      mainContent.classList.remove('menu-transition-hide')
      mainContent.classList.add('menu-transition')
      menuContent.classList.remove('menu-transition')
      menuContent.classList.add('menu-transition-hide')
    }
  })
})(document)
