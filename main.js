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


// showing the photos and description in artists.html


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
        parent.appendChild(clone);


    })

}

// showing the photos of specific artist in artist.html

function showPhotos(data) {
    //console.log(data);
    let list = document.querySelector("#list");
    let template = document.querySelector("#gallery-template").content;



    data.forEach(function (theTattoo) {
        //  console.log(theTattoo);
        let clone = template.cloneNode(true);

        let img = clone.querySelector("img");


        img.setAttribute("src", theTattoo.acf.photo.sizes.medium);
        list.appendChild(clone);
    })



}


// Show single bio  of artist next to gallery in artist.html from different database as gallery is

function getSingleBio(){

          fetch("http://acdesign.in/MyWordPress/wp-json/wp/v2/artist?_embed")
        .then(res => res.json())
        .then(showSingleBio);
}

function showSingleBio(json){

    console.log(json);

    let list = document.querySelector("#bio");
    let template = document.querySelector("#about-artist").content;

    json.forEach(function(theArtist){

        let clone= template.cloneNode(true);
        let name = clone.querySelector("h2");
        let style = clone.querySelector("h4");
        let description = clone.querySelector("p");
        let img = clone.querySelector("img");

        name.textContent = theArtist.acf.name;

        style.textContent = theArtist.acf.style;
        description.textContent = theArtist.acf.description;
        img.setAttribute("src", theArtist._embedded["wp:featuredmedia"]["0"].media_details.sizes.medium.source_url);


        list.appendChild(clone);



    })

}



function getArtists() {
    fetch("http://acdesign.in/MyWordPress/wp-json/wp/v2/categories")
        .then(res => res.json())
        .then(showArtists);

}

function showArtists(categories) {
   // console.log(categories);







}

getBio();
getArtists();
getAllPhotos();
getSingleBio();

