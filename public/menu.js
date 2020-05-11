const menu = document.querySelector(".menu-list");
const main = document.querySelector(".main");
const menucito = document.querySelector("#nav-icon")

menucito.addEventListener('click', () => {
  const open = menucito.classList.contains('open')
  if (!open) {
    menucito.classList.add('open')
    main.classList.add('menu-transition-hide')
    main.classList.remove('menu-transition')
    menu.classList.add('menu-transition')
    menu.classList.remove('menu-transition-hide')
  } else {
    menucito.classList.remove('open')
    main.classList.remove('menu-transition-hide')
    main.classList.add('menu-transition')
    menu.classList.remove('menu-transition')
    menu.classList.add('menu-transition-hide')
  }
})
