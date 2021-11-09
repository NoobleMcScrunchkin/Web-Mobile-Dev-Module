var template = "<article onclick='document.querySelector(\".SLUG\").showModal();'>\n\
    <img src='data/img/placeholder.png' data-src='data/img/SLUG.jpg' alt='NAME'>\n\
    <h3>#POS. NAME</h3>\n\
    <ul>\n\
        <li><span>Price:</span> <strong>PRICE</strong></li>\n\
        <li><span>Brand:</span> <strong>BRAND</strong></li>\n\
        <li><span>Model:</span> <strong>MODEL</strong></li>\n\
        <li><span>Year:</span> <strong>YEAR</strong></li>\n\
    </ul>\n\
</article>\n\
<dialog class='mdl-dialog SLUG'>\n\
    <h4 class='mdl-dialog__title'>NAME</h4>\n\
    <div class='mdl-dialog__content'>\n\
        <p>Type: TYPE</p>\n\
        <p>Fuel type: FUEL</p>\n\
        <p>Gear: GEAR</p>\n\
        <p>Mileage: MILEAGE</p>\n\
        <p>Description: DESCR</p>\n\
    </div>\n\
    <div class='mdl-dialog__actions'>\n\
        <button id='ID' type='button' class='mdl-button close' onclick='document.querySelector(\".SLUG\").close();'>Close</button>\n\
    </div>\n\
</dialog>\n\
";

var content = '';
for (let i = 0; i < cars.length; i++) {
    var entry = template.replace(/POS/g, (i + 1))
        .replace(/SLUG/g, cars[i].slug)
        .replace(/NAME/g, cars[i].name)
        .replace(/PRICE/g, cars[i].price)
        .replace(/BRAND/g, cars[i].brand)
        .replace(/MODEL/g, cars[i].model)
        .replace(/YEAR/g, cars[i].year)
        .replace(/TYPE/g, cars[i].type)
        .replace(/FUEL/g, cars[i].fuel_type)
        .replace(/GEAR/g, cars[i].gear)
        .replace(/MILEAGE/g, cars[i].mileage)
        .replace(/ID/g, cars[i].id)
        .replace(/DESCR/g, cars[i].description);
    entry = entry.replace('<a href=\'http:///\'></a>', '-');
    content += entry;
};
document.getElementById('content').innerHTML = content;

var d = document.querySelector('dialog.mdl-dialog');

dialogContent = d.innerHTML;
for (let i = 0; i < cars.length; i++) {
    var entry = dialogContent.replace(/NAME/g, cars[i].name);
    content += entry;
}

d.innerHTML = dialogContent;

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js');
}

let imagesToLoad = document.querySelectorAll('img[data-src]');

const loadImages = function (image) {
    image.setAttribute('src', image.getAttribute('data-src'));
    image.onload = function () {
        image.removeAttribute('data-src');
    }
}

if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (items, observer) {
        items.forEach((item) => {
            if (item.isIntersecting) {
                loadImages(item.target);
                observer.unobserve(item.target);
            }
        });
    });
    imagesToLoad.forEach((img) => {
        observer.observe(img);
    });
} else {
    imagesToLoad.forEach((img) => {
        loadImages(img);
    });
}