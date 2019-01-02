
function creatMario() {
    return loadSpritSheet('mario')
        .then(sprite => {

            var mario = new Entity();

            mario.size.set(16, 16);

            mario.addtrait(new Go());
            mario.addtrait(new Jump());

            var runAnim  = creatAnim(["run-1", "run-2", "run-3"], 2);

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

            mario.draw = function drawMario(context) {
                sprite.draw(routeFrame(this), context, 0, 0, mario.go.dir < 0);
            };

            return mario;
        });

}