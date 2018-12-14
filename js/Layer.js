function drawBackground(background, context, sprites) {
    background.ranges.forEach(([x1, x2, y1, y2]) =>{
        for (let x = x1; x<x2; x++){
            for (let y = y1;y<y2;y++){
                sprites.drawTile(background.tile,context,x,y);
            }
        }
    });
}


//在这里调整画面的大小

function createBackgroundLayer(backgrounds, sprites){
    var Buffer = document.createElement("canvas");
    Buffer.width = 600;
    Buffer.height = 480;

    backgrounds.forEach(background =>{
        drawBackground(background, Buffer.getContext("2d"), sprites);
    });
    return function drowBackgroundLayer(context) {
        context.drawImage(Buffer, 0, 0);
    }
}

function createSpritesLayer(entity){
    return function drawSpritesLayer(context) {
        entity.draw(context);
    };
}