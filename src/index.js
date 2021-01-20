const ramenMenuDiv = document.querySelector("#ramen-menu");

const getRamens = () => {
  return fetch("http://localhost:3000/ramens").then((response) =>
    response.json()
  );
};

const getAndRenderRamens = () => {
  getRamens().then((ramenData) => {
    ramenData.forEach((ramen) => renderRamenImage(ramen));
  });
};

getAndRenderRamens()

const renderRamenImage = (ramen) => {
  const imageTag = document.createElement("img");
  const ramenImage = ramen.image;
  imageTag.src = ramenImage;
  ramenMenuDiv.append(imageTag);
};
