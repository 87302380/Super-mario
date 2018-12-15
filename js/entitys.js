
function creatMario() {

    return loadMarioSprites()
        .then(sprite => {
            var mario = new Entity();

            mario.size.set(16, 16);

            mario.addtrait(new Go());
     //       mario.addtrait(new Velocity());
            mario.addtrait(new Jump());

            mario.draw = function drawMario(context){
                sprite.draw("mario", context, this.pos.x, this.pos.y);
            };

            return mario;
        })
}