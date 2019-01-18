
function loadMario() {
    return loadSpritSheet('mario')
        .then(creatMarioFactor);
}

function creatMarioFactor(sprite) {

    var runAnim  = sprite.animations.get("run");

    function routeFrame(mario){
        if (mario.jump.falling){
            return 'jump';
        }
        if (mario.go.distance > 0){
            if ((mario.vel.x > 0 && mario.go.dir < 0) || (mario.vel.x < 0 && mario.go.dir > 0)){
                return "break";
            }

            return runAnim(mario.go.distance);
        }
        return "mario";
    }

    function drawMario(context) {
        sprite.draw(routeFrame(this), context, 0, 0, this.go.heading < 0);
    }

    return function createMario() {
        var mario = new Entity();

        mario.size.set(16, 16);

        mario.addtrait(new Go());
        mario.addtrait(new Jump());

        mario.draw = drawMario;

        return mario;
    }
}