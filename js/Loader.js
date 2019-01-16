function loadImage(url) {
    return new Promise(resolve => {
        var image = new Image();
        image.addEventListener("load",() =>{
            resolve(image);
        });
        image.src = url;
    })
}

function loadJSON(url) {
    return fetch(url).then(r => r.json());
}

function loadSpritSheet(name) {
    var url = "./sprite/"+name+".json";
    return loadJSON(url).then(sheetSpec => Promise.all([
        sheetSpec,
        loadImage(sheetSpec.imageURL),
    ])).then(([sheetSpec, image]) =>{
        var sprites = new SpriteSheet(image, sheetSpec.tileW, sheetSpec.tileH);
        if (sheetSpec.tiles){
            sheetSpec.tiles.forEach(tileSpec => {
                sprites.defineTile(
                    tileSpec.name,
                    tileSpec.index[0],
                    tileSpec.index[1]
                );
            });
        }
        
        if (sheetSpec.frames){
            sheetSpec.frames.forEach(framSpec => {
                sprites.define(framSpec.name, ...framSpec.rect);
            });
        }

        if (sheetSpec.animation){
            sheetSpec.animation.forEach(animSpec => {
                var animation = creatAnim(animSpec.frames, animSpec.frameLen);
                sprites.defineAnim(animSpec.name, animation);
            });
        }
        return sprites;
    });
}

