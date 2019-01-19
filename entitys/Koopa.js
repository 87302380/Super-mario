
function loadKoopa() {
    return loadSpritSheet('koopa')
        .then(creatKoopaFactor);
}

var STATE_WALKING = Symbol('walking');
var STATE_HIDING = Symbol('hiding');
var STATE_PANIC = Symbol('panic');

class BehaviorKoop extends Trait {
    constructor() {
        super('behavior');
        this.hideTime = 0;
        this.hideDuration = 5;

        this.walkSpeed = null;
        this.panicSpeed = 30;

        this.state = STATE_WALKING;

    }

    collides(us, them) {
        if (us.killable. dead){
            return;
        }

        if (them.stomper){
            if (them.vel.y > us.vel.y){
                this.handleStomp(us, them);
            } else {
                this.handleNudge(us, them);
            }
        }
    }

    handleNudge(us, them){
        if (this.state === STATE_WALKING){
            them.killable.kill();
        }else if (this.state === STATE_HIDING) {
            this.panic(us, them);
        } else if (this.state === STATE_PANIC){
            var travelDir = Math.sign(us.vel.x);
            var impactDir = Math.sign(us.pos.x - them.pos.x);
            if (travelDir !== 0 && travelDir !== impactDir) {
                them.killable.kill();
            }
        }
    }

    handleStomp(us, them) {
        if (this.state === STATE_WALKING) {
            this.hide(us);
        } else if (this.state === STATE_HIDING){
            us.killable.kill();
            us.vel.set(20,-20);
            us.canCollide = false;
        } else if (this.state === STATE_PANIC) {
            this.hide(us);
        }
    }

    hide(us) {
        us.vel.x = 0;
        us.walk.enabled = false;
        if (this.walkSpeed === null) {
            this.walkSpeed = us.walk.speed;
        }
        this.hideTime = 0;
        this.state = STATE_HIDING
    }

    unhide(us) {
        us.walk.enabled = true;
        us.walk.speed = this.walkSpeed;
        this.state = STATE_WALKING
    }

    panic(us, them) {
        us.walk.enabled = true;
        us.walk.speed = this.panicSpeed * Math.sign(them.vel.x);
        this.state = STATE_PANIC;
    }

    update(us, deltaTime){
        if (this.state === STATE_HIDING ){
            this.hideTime += deltaTime;
            if (this.hideTime > this.hideDuration){
                this.unhide(us);
            }
        }
    }
}

function creatKoopaFactor(sprite) {

    var walkAnim  = sprite.animations.get('walk');
    var wakeAnim = sprite.animations.get('wake');

    function routeAnim(koopa) {

        if (koopa.behavior.state === STATE_HIDING || koopa.behavior.state === STATE_PANIC){
            if (koopa.behavior.hideTime > 3){
                return wakeAnim(koopa.behavior.hideTime);
            }
            return 'hiding';
        }

        if (koopa.behavior.state === STATE_PANIC){
            return 'hiding';
        }

        return walkAnim(koopa.lifetime);

    }

    function drawKoopa(context) {
        sprite.draw(routeAnim(this), context, 0, 0, this.vel.x < 0);
    }

    return function createKoopa() {
        var koopa = new Entity();

        koopa.size.set(16, 16);
        koopa.offset.y = 8;

        koopa.addtrait(new Walk());
        koopa.addtrait(new Killable());
        koopa.addtrait(new BehaviorKoop());

        koopa.draw = drawKoopa;

        return koopa;
    }
}