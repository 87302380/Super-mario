
function drawBackground(background, context, sprites) {
    background.ranges.forEach(([x1, x2, y1, y2]) =>{
        for (let x = x1; x<x2; x++){
            for (let y = y1;y<y2;y++){
                sprites.drawTile(background.tile,context,x,y);
            }
        }
    });
}

var canvas = document.getElementById("screen");
var context = canvas.getContext("2d");

loadImage("img/tile.png").then(image =>{

    var sprites = new SpriteSheet(image, 16, 16);
    sprites.define("ground", 0, 0);
    sprites.define("sky", 3, 23);

    loadLevel("1").then(level => {
        // console.log(level.backgrounds[0]);
        level.backgrounds.forEach(tile =>{
            drawBackground(tile, context, sprites);
        })

    });




});

