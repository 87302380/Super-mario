function loadLevel(name) {
    var url = "./level/"+name+".json";
    return loadJSON(url)
        .then(levelSpec => Promise.all([
            levelSpec,
            loadSpritSheet(levelSpec.spriteSheet),
        ]))
        .then(([levelSpec, backgroundsprites]) => {
            var level = new Level();

            const mergedTiles = levelSpec.layers.reduce((mergedTiles, layerSpec) =>{
                return mergedTiles.concat(layerSpec.tiles);
            }, []);
            var collisionGrid = createCollisionGrid(mergedTiles, levelSpec.patterns);
            level.setCollisionGrid(collisionGrid);

            levelSpec.layers.forEach(layer => {
                var backgroundGrid = createBackgroundGrid(layer.tiles, levelSpec.patterns);
                var backgroundLayer = createBackgroundLayer(level, backgroundGrid, backgroundsprites);
                level.comp.layers.push(backgroundLayer);
            });

            var spritesLayer = createSpritesLayer(level.entites);
            level.comp.layers.push(spritesLayer);

            return level;
        })
}

function createCollisionGrid(tiles, patterns) {
    var grid = new Matrix();

    for (const {tile, x, y} of expandTiles(tiles, patterns)){
        grid.set(x, y, {type : tile.type,});
    }

    return grid;
}

function createBackgroundGrid(tiles, patterns) {
    var grid = new Matrix();

    for (const {tile, x, y} of expandTiles(tiles, patterns)){
        grid.set(x, y, {name : tile.name,});
    }

    return grid;
}

function *expandSpan(xStart, xLen, yStart, yLen) {
    var coords = [];
    var xEnd = xStart + xLen;
    var yEnd = yStart + yLen;
    for (let x = xStart; x < xEnd; x++) {
        for (let y = yStart; y < yEnd; y++) {
            yield ({x, y});
        }
    }
}

function expandRange(range) {
    if (range.length === 4){
        const [xStart, xLen, yStart, yLen] = range;
        return expandSpan(xStart, xLen, yStart, yLen);
    } else if (range.length === 2){
        const [xStart, yStart] = range;
        return expandSpan(xStart, 1, yStart, 1);
    }
}

function* expandRanges(ranges) {
    for (var range of ranges){
        for (var item of expandRange(range)){
            yield item;
        }
    }
}

function expandTiles(tiles, patterns) {
    var expandTiles = [];

    function walkTiles(tiles, offsetX, offsetY) {
        for (var tile of tiles) {
            for (const {x, y} of expandRanges(tile.ranges)){
                var derivedX = x + offsetX;
                var derivedY = y + offsetY;

                if (tile.pattern) {
                    var tiles = patterns[tile.pattern].tiles;
                    walkTiles(tiles, derivedX, derivedY);
                }else {
                    expandTiles.push({
                        tile,
                        x: derivedX,
                        y: derivedY,
                    })
                }
            }
        }
    }

    walkTiles(tiles, 0, 0);

    return expandTiles;
}