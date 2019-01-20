function createBackgroundLayer(level, tiles, sprites){

    var resolver = new TileResolver(tiles);
    var Buffer = document.createElement("canvas");
    Buffer.width = 640 + 16; //只提前加载一格
    Buffer.height = 480;

    var context = Buffer.getContext("2d");

    function redraw(startIndex, endIndex){

        context.clearRect(0, 0, Buffer.width, Buffer.height);

        for (let x = startIndex; x<= endIndex; x++){
            var col = tiles.grid[x];
            if (col){
                col.forEach((tile, y) =>{
                    if (sprites.animations.has(tile.name)) {
                        sprites.drawAnim(tile.name, context, x - startIndex, y, level.totalTime);
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