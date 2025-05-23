export const Scrool = (id) => {
  const element = document.getElementById(id);
  const navbarHeight = 100; // ajuster selon la hauteur de ton navbar
  if (element) {
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - navbarHeight;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
};
