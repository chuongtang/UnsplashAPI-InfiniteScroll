const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API 
let imgCount = 5;
const apiKey = '8HpyfqNnYjU90O0vPe7Jr6Rkz2scHSdHX_d0utRf-aw';
let apiUrl =`https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${imgCount}`;

// Function to check if images are loaded
function loadImages(){
    imagesLoaded++
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true
        console.log('ready status is: ', ready);
        imgCount = 28;
        apiUrl =`https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${imgCount}`;
    }
}

// create setAttributes function for reuse.
function setAttributes (element, attributes){
    for (const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}

// Create element for links and photos then add to DOM
function displayPhotos () {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log('Total images loaded is: ', totalImages);
    photosArray.forEach((photo) => {
        // create <a> to link to unplash
        const item = document.createElement('a');
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target', '_blank');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        });
        // create <img> for photo
        const img = document.createElement('img');        
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });

        //  Evenlisterner to check when each is finish loading
        img.addEventListener('load', loadImages);
        //  Put <img> inside item then both inside imgContainer
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get photos from Unsplash API
async function getPixFromUnplash (){
    try {
        const reponse = await fetch(apiUrl);
        photosArray = await reponse.json();
        displayPhotos();      
    } catch (error) {
        // Catch Error Here
    }
}

//  Add E.listerner to load the photos
window.addEventListener('scroll',() =>{
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){ 
        getPixFromUnplash();
        ready = false;
    }
})
// On Load
getPixFromUnplash();