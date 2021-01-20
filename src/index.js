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
  // formRating.dataset.id = ramen.id
  formComment.textContent = ramen.comment;
  // formComment.dataset.id = ramen.id

  ramenDetailDiv.append(imageDetail);
  ramenDetailDiv.append(nameDetail);
  ramenDetailDiv.append(restaurantDetail);

  ramenRatingForm.append(formRating);
  ramenRatingForm.append(formComment);
  // ramenRatingForm.dataset.id = ramen.id
};

ramenMenuDiv.addEventListener("click", findAndRenderDetail);

const updateRatingComment = (updatedRatingComment) => {
  console.log(updatedRatingComment)
  return fetch(`http://localhost:3000/ramens/${updatedRatingComment.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      rating: updatedRatingComment.rating,
      comment: updatedRatingComment.comment,
    }),
  }).then((response) => response.json());
};

ramenRatingForm.addEventListener("submit", (event) => {
  console.log(event)
  event.preventDefault();

  const ratingInput = event.target.rating.value;
  const commentInput = event.target.comment.value;

  const rating = {
    rating: ratingInput,
    comment: commentInput,
  };

  updateRatingComment(rating)
  .then((ramenData) => {renderUpdatedRatingComment(rating);
  });
});

const renderUpdatedRatingComment = (rating) => {
  
}

