export function scrollToHash(hash, smooth = true) {
  const id = hash.replace("#", "");
  const element = document.getElementById(id);

  if (element) {
    setTimeout(() => {
      element.scrollIntoView({
        behavior: smooth ? "smooth" : "auto",
        block: "start",
      });
    }, 100);
  }
}
