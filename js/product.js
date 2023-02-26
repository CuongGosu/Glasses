const itemList = document.querySelector(".view-products");
const gridViewBtn = document.querySelector(".view-grid");
const detailsViewBtn = document.querySelector(".view-detail");

gridViewBtn.classList.add("active-btn");
gridViewBtn.addEventListener("click", () => {
  gridViewBtn.classList.add("active-btn");
  detailsViewBtn.classList.remove("active-btn");
  itemList.classList.remove("info-detail");
});

detailsViewBtn.addEventListener("click", () => {
  detailsViewBtn.classList.add("active-btn");
  gridViewBtn.classList.remove("active-btn");
  itemList.classList.add("info-detail");
});
