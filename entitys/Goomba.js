
function loadGoomba() {
    return loadSpritSheet('goomba')
        .then(creatGoombaFactor);
}

class BehaviorGoomba extends Trait {
    constructor() {
        super('behavior');
    }

    collides(us, them) {
        if (us.killable.dead){
            return;
        }

        if (them.stomper){
            if (them.vel.y > us.vel.y){
                us.killable.kill();
                us.walk.speed = 0;
            } else {
                them.killable.kill();
            }
        }
    }
}

function creatGoombaFactor(sprite) {

    var walkAnim  = sprite.animations.get("walk");

    function routeAnim(goomba) {

        if (goomba.killable.dead){
            return 'flat';
        }
        
        return walkAnim(goomba.lifetime);

    }

    function drawGoomba(context) {
        sprite.draw(routeAnim(this), context, 0, 0);
    }

    return function createGoomba() {
        var goomba = new Entity();

        goomba.size.set(16, 16);

        goomba.addtrait(new Walk());
        goomba.addtrait(new BehaviorGoomba());
        goomba.addtrait(new Killable());
        goomba.draw = drawGoomba;

        return goomba;
    }
}