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

function createTiles(level, backgrounds) {
    function applyRange(background,xStart, xLen, yStart, yLen) {
        var xEnd = xStart + xLen;
        var yEnd = yStart + yLen;
        for (let x = xStart; x<xEnd; x++){
            for (let y = yStart;y<yEnd;y++){
                level.tiles.set(x, y, {
                    name : background.tile,
                    description : background.description,
                    type : background.type,
                });
            }
        }
    }
    backgrounds.forEach(background =>{
        background.ranges.forEach(range =>{
            if (range.length === 4){
                const [xStart, xLen, yStart, yLen] = range;
                applyRange(background, xStart, xLen, yStart, yLen);
            } else if (range.length === 2){
                const [xStart, yStart] = range;
                applyRange(background, xStart, 1, yStart, 1);
            }
        });
    });
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

function loadLevel(name) {
    var url = "./level/"+name+".json";
    return loadJSON(url)
        .then(levelSpec => Promise.all([
            levelSpec,
            loadSpritSheet(levelSpec.spriteSheet),
        ]))
        .then(([levelSpec, backgroundsprites]) => {
            var level = new Level();

            createTiles(level, levelSpec.backgrounds);

            var backgroundLayer = createBackgroundLayer(level, backgroundsprites);
            level.comp.layers.push(backgroundLayer);

            var spritesLayer = createSpritesLayer(level.entites);
            level.comp.layers.push(spritesLayer);

            return level;
        })
}