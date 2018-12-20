
function createBackgroundLayer(level, sprites){
    var tiles = level.tiles;
    var resolver =level.tileCollider.tiles;

    var Buffer = document.createElement("canvas");
    Buffer.width = 512 + 16; //只提前加载一格
    Buffer.height = 480;

    var context = Buffer.getContext("2d");

    let startIndex, endIndex;
    function redraw(drawFrom, drawTo){
        if (drawFrom === startIndex && drawTo === endIndex){
            return;
        }

        startIndex = drawFrom;
        endIndex = drawTo;

        for (let x = startIndex; x<= endIndex; x++){
            var col = tiles.grid[x];
            if (col){
                col.forEach((tile, y) =>{
                    sprites.drawTile(tile.name, context, x - startIndex, y);
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
 //   var tileSize = tileResolver.tileSize;

    var getByIndexOriginal = tileResolver.getByIndex;
    tileResolver.getByIndex = function getByIndexFake(x, y) {
        resolvedTiles.push({x, y});
        return getByIndexOriginal.call(tileResolver, x, y);
    }

    // return function drawCollision(context) {
    //
    //   //  context.strokeStyle = 'blue';
    //     resolvedTiles.forEach(({x, y}) =>{
    //         console.log("123", x, y);
    //         // context.beginPath();
    //         // context.rect(x * tileSize, y * tileSize, tileSize, tileSize);
    //         // context.stroke();
    //     });
    //
    //     resolvedTiles.length = 0;
    // }



}