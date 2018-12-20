
function creatMario() {

    return loadMarioSprites()
        .then(sprite => {
            var mario = new Entity();

            mario.size.set(16, 16);

            mario.addtrait(new Go());
            mario.addtrait(new Jump());

            mario.draw = function drawMario(context){
                sprite.draw("mario", context, 0, 0);
            };

            return mario;
        })
}