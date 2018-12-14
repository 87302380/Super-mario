
function creatMario() {

    return loadMarioSprites()
        .then(sprite => {
            var mario = new Entity();

            mario.addtrait(new Velocity());
            mario.addtrait(new Jump());


            mario.draw = function drawMario(context){
                sprite.draw("mario", context, this.pos.x, this.pos.y);
            }

            return mario;
        })
}