function loadImage(url) {
    return new Promise(resolve => {
        var image = new Image();
        image.addEventListener("load",() =>{
            resolve(image);
        });
        image.src = url;
    })
}

function loadLevel(name) {
    var path = "./level/"+name+".json";

    return fetch(path)
        .then(a => a.json());
}