

var canvas = document.getElementById("screen");
var context = canvas.getContext("2d");

function createSpritesLayer(sprites, pos){
    return function drawSpritesLayer(context) {
        for (let i = 0; i<20; i++){
            sprites.draw("mario", context, pos.x+i, pos.y+i);
        }
    };
}


Promise.all([
    loadMarioSprites(),
    loadBackgroundSprites(),
    loadLevel("1"),
]).then(([marioSprites,backgroundsprites,level])=> {

        var compositor = new Compositor();
        var backgroundLayer = createBackgroundLayer(level.backgrounds, backgroundsprites);
        compositor.layers.push(backgroundLayer);

        var pos = {
            x : 1,
            y : 5,
        };

        var spritesLayer = createSpritesLayer(marioSprites, pos);
        compositor.layers.push(spritesLayer);

        function update(){
            compositor.draw(context);
            pos.x +=2;
            pos.y +=2;
            requestAnimationFrame(update);
        }
        update();
});







