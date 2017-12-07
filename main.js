function getAllPhotos() {
    fetch("http://acdesign.in/MyWordPress/wp-json/wp/v2/tattoo?_embed")
        .then(res => res.json())
        .then(showPhotos);
}
function showPhotos(data){
    //console.log(data);
    let list = document.querySelector("#list");
    let template = document.querySelector("#gallery-template").content;

     data.forEach(function (theTattoo) {
         console.log(theTattoo);
          let clone = template.cloneNode(true);
    let title = clone.querySelector("h2");
    let img = clone.querySelector("img");

    title.innerHTML = theTattoo.title.rendered;
    img.setAttribute("src", theTattoo.acf.photo.sizes.medium);
          list.appendChild(clone);
     })



}
getAllPhotos();
