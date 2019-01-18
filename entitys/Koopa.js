
function loadKoopa() {
    return loadSpritSheet('koopa')
        .then(creatKoopaFactor);
}

function creatKoopaFactor(sprite) {

    var walkAnim  = sprite.animations.get("walk");

    function drawKoopa(context) {
        sprite.draw(walkAnim(this.lifetime), context, 0, 0, this.vel.x < 0);
    }

    return function createKoopa() {
        var koopa = new Entity();

        koopa.size.set(16, 16);
        koopa.offset.y = 8;

        koopa.addtrait(new Walk());
        koopa.draw = drawKoopa;

        return koopa;
    }
}