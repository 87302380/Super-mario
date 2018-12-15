function loadImage(url) {
    return new Promise(resolve => {
        var image = new Image();
        image.addEventListener("load",() =>{
            resolve(image);
        });
        image.src = url;
    })
}

function createTiles(level, backgrounds) {
    backgrounds.forEach(background =>{
        background.ranges.forEach(([x1, x2, y1, y2]) =>{
            for (let x = x1; x<x2; x++){
                for (let y = y1;y<y2;y++){
                    level.tiles.set(x, y, {
                        name : background.tile,
                    });
                }
            }
        });
    });

}

function loadLevel(name) {
    var path = "./level/"+name+".json";
    return Promise.all([
        fetch(path).then(a => a.json()),
        loadBackgroundSprites(),
    ]).then(([levelSpec, backgroundsprites]) => {
            var level = new Level();

            createTiles(level, levelSpec.backgrounds);

            var backgroundLayer = createBackgroundLayer(level, backgroundsprites);
            level.comp.layers.push(backgroundLayer);

            var spritesLayer = createSpritesLayer(level.entites);
            level.comp.layers.push(spritesLayer);

            return level;
        })
}