
function createBackgroundLayer(level, tiles, sprites){

    var resolver = new TileResolver(tiles);
    var Buffer = document.createElement("canvas");
    Buffer.width = 512 + 16; //只提前加载一格
    Buffer.height = 480;

    var context = Buffer.getContext("2d");

    function redraw(startIndex, endIndex){

        context.clearRect(0, 0, Buffer.width, Buffer.height);

        for (let x = startIndex; x<= endIndex; x++){
            var col = tiles.grid[x];
            if (col){
                col.forEach((tile, y) =>{
                    if (sprites.animations.has(tile.description)) {
                        sprites.drawAnim(tile.description, context, x - startIndex, y, level.totalTime);
                    }else {
                        sprites.drawTile(tile.name, context, x - startIndex, y);
                    }
                });
            }
        }
    }

    return function drowBackgroundLayer(context, camera) {
        var drawWidth = resolver.toIndex(camera.size.x);
        var drawFrom = resolver.toIndex(camera.pos.x);
        var drawTo = drawFrom + drawWidth;
        redraw(drawFrom, drawTo);

        context.drawImage(Buffer, -camera.pos.x % 16 , -camera.pos.y);
    };
}

function createSpritesLayer(entities, width = 64, height = 64){

    var spritBuffer = document.createElement("canvas");
    spritBuffer.width = width;
    spritBuffer.height = height;

    var spritBufferContext = spritBuffer.getContext("2d");

    return function drawSpritesLayer(context) {
        entities.forEach(entity =>{
            spritBufferContext.clearRect(0, 0, width, height);

            entity.draw(spritBufferContext);

            context.drawImage(
                spritBuffer,
                entity.pos.x - camera.pos.x,
                entity.pos.y - camera.pos.y);
        });

    };
}

function createCollisionLayer(level) {
    var resolvedTiles = [];

    var tileResolver = level.tileCollider.tiles;

    var getByIndexOriginal = tileResolver.getByIndex;
    tileResolver.getByIndex = function getByIndexFake(x, y) {
        resolvedTiles.push({x, y});
        return getByIndexOriginal.call(tileResolver, x, y);
    }

}