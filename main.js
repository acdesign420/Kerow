function getAllPhotos() {
    let searchParams = new URLSearchParams(window.location.search);
    let tagid = searchParams.get('categoryid');
    if(tagid){
        fetch("http://acdesign.in/MyWordPress/wp-json/wp/v2/tattoo?_embed&categories="+tagid)
        .then(res => res.json())
        .then(showPhotos);
    }

}
function getBio(){

          fetch("http://acdesign.in/MyWordPress/wp-json/wp/v2/artist?_embed")
        .then(res => res.json())
        .then(showBio);
}

function showBio(json){

    console.log(json);
    let template = document.querySelector("#artist-bio").content;
    let parent = document.querySelector("#artists-grid");

    json.forEach(function(theArtist){

        let clone= template.cloneNode(true);
        let name = clone.querySelector("h3");
        let style = clone.querySelector("h5");
        let description = clone.querySelector("p");
        let img = clone.querySelector("img");

        name.textContent = theArtist.acf.name;
        style.textContent = theArtist.acf.style;
        description.textContent = theArtist.acf.description;
        img.setAttribute("src", theArtist._embedded["wp:featuredmedia"]["0"].media_details.sizes.medium.source_url);

        clone.querySelector('.containerP').addEventListener('click', function(){
            location =  'artist.html?artistid='+theArtist.id+'&categoryid='+theArtist.acf.categoryid;
        })
        parent.appendChild(clone)
    })

}

function showPhotos(data) {
    //console.log(data);
    let list = document.querySelector("#list");
    let template = document.querySelector("#gallery-template").content;

    data.forEach(function (theTattoo) {
        //  console.log(theTattoo);
        let clone = template.cloneNode(true);
        let title = clone.querySelector("h2");
        let img = clone.querySelector("img");

        title.innerHTML = theTattoo.title.rendered;
        img.setAttribute("src", theTattoo.acf.photo.sizes.medium);
        list.appendChild(clone);
    })



}

function getArtists() {
    fetch("http://acdesign.in/MyWordPress/wp-json/wp/v2/categories")
        .then(res => res.json())
        .then(showArtists);

}

function showArtists(categories) {
    console.log(categories);


    let sa = document.querySelector("#sort-artist").content;

    categories.forEach(function (category) {
        let clone = sa.cloneNode(true);
        let parent = document.querySelector("#artists-categories");
        clone.querySelector("a").textContent = category.name;
        clone.querySelector("a").setAttribute("href","gallery.html?tagid="+ category.id);
        parent.appendChild(clone);


    })




}

getBio();
getArtists();
getAllPhotos();

