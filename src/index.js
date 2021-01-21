let ramenJSON;

const ramenMenuDiv = document.querySelector("#ramen-menu");
const ramenDetailDiv = document.querySelector("#ramen-detail");
const imageDetail = document.querySelector(".detail-image");
const nameDetail = document.querySelector(".name");
const restaurantDetail = document.querySelector(".restaurant");
const ramenRatingForm = document.querySelector("#ramen-rating");
const formRating = document.querySelector("#rating");
const formComment = document.querySelector("#comment");
const newRamenForm = document.querySelector("#new-ramen");
const deleteButton = document.querySelector("#delete-ramen");

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
  imageTag.className = `thumbnail-${ramen.id}`;
  const ramenImage = ramen.image;
  imageTag.src = ramenImage;
  imageTag.alt = ramen.name;
  ramenMenuDiv.append(imageTag);
};

const findAndRenderDetail = (event) => {
  ramenId = event.target.dataset.id;
  const ramen = ramenJSON.find(
    (ramenObj) => String(ramenObj.id) === String(ramenId)
  );

  renderRamenDetail(ramen);

  ramenRatingForm.addEventListener("submit", (event) => {
    event.preventDefault();

    ramen.rating = event.target.rating.value;
    ramen.comment = event.target.comment.value;

    updateRatingComment(ramen).then((ramenData) => {
      renderUpdatedRatingComment(ramenData);
    });
  });
  const deleteRamen = () => {
    fetch(`http://localhost:3000/ramens/${ramen.id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        const imageTag = document.querySelector(`.thumbnail-${ramen.id}`);
        imageTag.remove();
        imageDetail.remove();
        nameDetail.remove();
        restaurantDetail.remove();
        formRating.remove();
        formComment.remove();
      });
  };

  deleteButton.addEventListener("click", deleteRamen);
};

ramenMenuDiv.addEventListener("click", findAndRenderDetail);

const renderUpdatedRatingComment = (ramenData) => {
  formRating.value = ramenData.rating;
  formComment.textContent = ramenData.comment;

  ramenRatingForm.append(formRating);
  ramenRatingForm.append(formComment);
};

const updateRatingComment = (updatedRatingComment) => {
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

const renderRamenDetail = (ramen) => {
  imageDetail.src = ramen.image;
  nameDetail.textContent = ramen.name;
  restaurantDetail.textContent = ramen.restaurant;

  formRating.value = ramen.rating;
  formComment.textContent = ramen.comment;

  ramenDetailDiv.append(imageDetail);
  ramenDetailDiv.append(nameDetail);
  ramenDetailDiv.append(restaurantDetail);

  ramenRatingForm.append(formRating);
  ramenRatingForm.append(formComment);
};

const getRamenOne = () => {
  return fetch("http://localhost:3000/ramens/1")
    .then((response) => response.json())
    .then((ramenOneData) => renderRamenDetail(ramenOneData));
};

getRamenOne();
ramenRatingForm.addEventListener("submit", (event) => {
  event.preventDefault();

  ramen.rating = event.target.rating.value;
  ramen.comment = event.target.comment.value;

  updateRatingComment(ramen).then((ramenData) => {
    renderUpdatedRatingComment(ramenData);
  });
});
newRamenForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const newRamen = {
    name: event.target.name.value, 
    restaurant: event.target.restaurant.value, 
    image: event.target.image.value, 
    rating: event.target.rating.value, 
    comment: event.target.comment.value
  }

  postNewRamenForm(newRamen)

  .then((newRamenData) => {
    renderRamenImage(newRamenData); 
    renderRamenDetail(newRamenData);
  }); 
});

const postNewRamenForm = (newRamen) => {
  return fetch("http://localhost:3000/ramens", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newRamen),
  }).then((response) => response.json());
};
