const toggleMenu = document.querySelector(".navigation button");
const menu = document.querySelector(".navigation ul");
const footer = document.querySelector(".footer");

toggleMenu.addEventListener("click", function () {
  const open = JSON.parse(toggleMenu.getAttribute("aria-expanded"));
  toggleMenu.setAttribute("aria-expanded", !open);
  menu.hidden = !menu.hidden;
  footer.hidden = !footer.hidden;
  if (menu.hidden) {
    menu.style.display = "none";
  } else {
    menu.style.display = "flex";
  }
});
