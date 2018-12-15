//在这里调整画面的大小
function createBackgroundLayer(level, sprites){
    var Buffer = document.createElement("canvas");
    Buffer.width = 600;
    Buffer.height = 480;

    var context = Buffer.getContext("2d");

    level.tiles.forEach((tile, x, y) => {
        sprites.drawTile(tile.name,context,x, y);
    });

    return function drowBackgroundLayer(context) {
        context.drawImage(Buffer, 0, 0);
    }
}

function createSpritesLayer(entities){
    return function drawSpritesLayer(context) {
        entities.forEach(entity =>{
            entity.draw(context);
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