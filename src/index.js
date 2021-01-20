let ramenJSON;

const ramenMenuDiv = document.querySelector("#ramen-menu");
const ramenDetailDiv = document.querySelector("#ramen-detail");
const imageDetail = document.querySelector(".detail-image");
const nameDetail = document.querySelector(".name");
const restaurantDetail = document.querySelector(".restaurant");
const ramenRatingForm = document.querySelector("#ramen-rating");
const formRating = document.querySelector("#rating");
const formComment = document.querySelector("#comment");

const getRamens = () => {
  return fetch("http://localhost:3000/ramens").then((response) =>
    response.json()
  );
};

const getAndRenderRamens = () => {
  getRamens().then((ramenData) => {
    ramenData.forEach((ramen) => renderRamenImage(ramen));
    ramenJSON = ramenData;
  });
};

getAndRenderRamens();

const renderRamenImage = (ramen) => {
  const imageTag = document.createElement("img");
  imageTag.dataset.id = ramen.id;
  const ramenImage = ramen.image;
  imageTag.src = ramenImage;
  ramenMenuDiv.append(imageTag);
};

const findAndRenderDetail = (event) => {
  const ramenId = event.target.dataset.id;
  const ramen = ramenJSON.find(
    (ramenObj) => String(ramenObj.id) === String(ramenId)
  );
  imageDetail.src = ramen.image;
  nameDetail.textContent = ramen.name;
  restaurantDetail.textContent = ramen.restaurant;

  formRating.value = ramen.rating;
  formComment.textContent = ramen.comment;

  ramenDetailDiv.append(imageDetail);
  ramenDetailDiv.append(nameDetail);
  ramenDetailDiv.append(restaurantDetail);

  ramenRatingForm.append(formRating)
  ramenRatingForm.append(formComment)
};

ramenMenuDiv.addEventListener("click", findAndRenderDetail);
