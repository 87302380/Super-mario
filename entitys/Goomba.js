
function loadGoomba() {
    return loadSpritSheet('goomba')
        .then(creatGoombaFactor);
}

function creatGoombaFactor(sprite) {

    var walkAnim  = sprite.animations.get("walk");

    function drawGoomba(context) {
        sprite.draw(walkAnim(this.lifetime), context, 0, 0);
    }

    return function createGoomba() {
        var goomba = new Entity();

        goomba.size.set(16, 16);

        goomba.addtrait(new Walk());
        goomba.draw = drawGoomba;

        return goomba;
    }
}