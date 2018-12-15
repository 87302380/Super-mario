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