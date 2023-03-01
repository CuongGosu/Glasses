const images = document.querySelectorAll('.img-thumb');
const lazyLoadImage = (image) => {
  fetch(image.getAttribute('data-src'))
    .then((response) => response.blob())
    .then((blob) => {
      console.log(blob);
      const url = URL.createObjectURL(blob);
      image.setAttribute('src', url);
      image.onload = () => {
        URL.revokeObjectURL(url);
      };
    })
    .catch((error) => console.error(error));
};

const options = {
  threshold: 0,
  rootMargin: '0px 0px 200px 0px',
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      lazyLoadImage(entry.target);
      observer.unobserve(entry.target);
    }
  });
}, options);

images.forEach((image) => {
  observer.observe(image);
});
