/* OBJECTS */

let data1 = {
    photo: 'https://www.boraszportal.hu/images/cikk/6482/badacsony_l_1.jpg',
    title: 'My first photo',
    description: 'This photo has beautiful colors. This photo has beautiful colors. This photo has beautiful colors. This photo has beautiful colors. This photo has beautiful colors.'
    };

let data2 = {
    photo: 'http://www.tihanyiapatsag.hu/images/tihany_apatsag_banner2.jpg',
    title: 'My second photo with a long title',
    description: 'This is a big but shallow lake in Hungary. This is a big but shallow lake in Hungary. This is a big but shallow lake in Hungary. This is a big but shallow lake in Hungary.'
    };

let data3 = {
    photo: 'https://static.regon.hu/so/2019/06/leo-szabo-klasszikus-cirkalo-lillafured-tramontana-sirocco-vitorlas-hajo-balaton-balatonfured-tihany-hajozashu-1.jpg',
    title: 'My third photo',
    description: 'These are colorful sailing boats. These are colorful sailing boats. These are colorful sailing boats. These are colorful sailing boats. These are colorful sailing boats.'
    };

let data4 = {
    photo: 'https://mapio.net/images-p/10488216.jpg',
    title: 'My forth photo',
    description: 'You can see boats in this picture. You can see boats in this picture. You can see boats in this picture. You can see boats in this picture. You can see boats in this picture.'
    };

let data5 = {
    photo: 'https://csodalatosmagyarorszag.hu/wp-content/uploads/2019/02/Kis-Balaton-Zalakaros-Turizmus-Statisztika-2018-Belfold-CsodalatosMagyarorszag.jpg',
    title: 'My fifth photo',
    description: 'This is a really nice bridge. This is a really nice bridge. This is a really nice bridge. This is a really nice bridge. This is a really nice bridge.'
    };

/* LOADING PHOTO AREA AND TEXT AREA */

let currentPhoto = 0;
let imagesData = [data1, data2, data3, data4, data5];
let loadPhoto = (photoNumber) => {
    $('#photo').attr('src', imagesData[photoNumber].photo);
    $("#photo-title").text(imagesData[photoNumber].title);
    $("#photo-description").text(imagesData[photoNumber].description);
    }
loadPhoto(currentPhoto);
/* A 'currentPhoto' felveszi a 0 értéket, a 'loadPhoto' függvény lefut 'currentPhoto' értékre.
   Amikor a 'currentPhoto' értéke megváltozik és újra lefut a 'loadPhoto' függvény, a képek és a feliratok megváltoznak. */

/* ARROW EVENTS */

$('#right-arrow').click(() => {
    if (currentPhoto < imagesData.length - 1) {
        currentPhoto++;
        };
    loadPhoto(currentPhoto);
    });
/* A 'right-arrow'-ra kattintva a 'currentPhoto' értéke 1-gyel nő (max. a képek száma) és újra lefut a 'loadPhoto' függvény. */

$('#left-arrow').click(() => {
    if (currentPhoto > 0) {
        currentPhoto--;
        };
    loadPhoto(currentPhoto);
    });
/* A 'left-arrow'-ra kattintva a 'currentPhoto' értéke 1-gyel nő (max. a képek száma) és újra lefut a 'loadPhoto' függvény. */

/* CREATING AND LOADING THUMBNAIL CONTAINER */

/* Minden objectre létrehoz egy div-et (bennük szöveg és kép elemmel).
   Elkészültekor mindegyik div/szöveg/elem megkapja a saját index számát (a vonatkozó object sorszáma az 'imageData' array-ben).
   Miután elkészül egy div-szöveg-kép egység, rögtön fel is töltődik az index száma alapján (a szöveg és a kép kiemelődik
   az adott indexű objectből).
   Újra lefut a forEach függvény, jöhet a második div/szöveg/elem egység...
   A :last-child miatt csak az éppen létrehozott div töltődik fel, a már előzőleg létrehozottakat nem írja felül. */

imagesData.forEach((item, index) => {
    $('#thumbnailcontainer').append(`<div class="thumbnaildivs" data-index="${index}">
        <p class="thumbnailtitles" data-index="${index}"></p>
        <img class="thumbnails" data-index="${index}" src="" alt="">
        </div>`);
    $('.thumbnaildivs:last-child .thumbnailtitles').text(imagesData[index].title);
    $('.thumbnaildivs:last-child .thumbnails').attr('src', imagesData[index].photo);
    });

$('.thumbnaildivs:first-child .thumbnails').css('border', '7px solid sienna');

/* THUMBNAIL EVENTS */

$('.thumbnails').click((event) => {
    let imageDataIndex = $(event.target).attr('data-index');
    currentPhoto = imageDataIndex;
    loadPhoto(currentPhoto);
    $('.thumbnails').css('border', '3px solid sienna');
    let allThumbnails = document.querySelectorAll('.thumbnails');
    let selectedThumbnailIndex = $(event.target).attr('data-index');
    allThumbnails[selectedThumbnailIndex].style.border = '7px solid sienna';
    });
/* A thumbnailre kattintva:
   - a 'currentPhoto' értéke a thumbnail létrehozásakor megkapott index számára változik és újra lefut a 'loadPhoto' függvény,
   - minden thumbnail border-je eredeti állapotába tér vissza, a kiválasztott thumbnail border-je vastagabb lesz.*/

$('.thumbnails').mouseenter((event) => {
    let thumbnailDataIndex = $(event.target).attr('data-index');
    $(event.target.parentNode.childNodes[1]).css('visibility', 'visible');
    $(event.target).css('position', 'relative');
    $(event.target).css('bottom', '5px');
    });
/* Ha az egeret a thumbnail fölé visszük:
   - a thumbnail saját div-beli 1-es számú "szomszédjának" (=thumbailtitle) láthatósága megváltozik,
   - a thumbnail maga egy kicsit feljebb pozicionálja magát. */

$('.thumbnails').mouseleave((event) => {
    let thumbnailDataIndex = $(event.target).attr('data-index');
    $(event.target.parentNode.childNodes[1]).css('visibility', 'hidden');
    $(event.target).css('position', 'relative');
    $(event.target).css('bottom', '0px');
  });
/* Ha az egeret elvisszük a thumbnailről:
   - a thumbnail saját div-beli 1-es számú "szomszédjának" (=thumbailtitle) láthatósága megváltozik,
   - a thumbnail maga egy visszapozicionálja magát eredeti helyzetébe. */