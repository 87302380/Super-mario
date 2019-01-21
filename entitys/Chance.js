
function loadChance() {
    return loadSpritSheet('chance')
        .then(createChanceFactory);
}



class BehaviorChance extends Trait {
    constructor() {
        super('behavior');
        this.haveScore = true;

        this.hit = function () {

        }
    }

    collides(us, them) {
        if (us.bounds.bottom >= them.bounds.top && this.haveScore) {
            this.haveScore = false;
            this.hit();
        }
    }
}

function createChanceFactory(sprite) {



    var chanceAnim  = sprite.animations.get("chance");

    function routeAnim(chance) {

        if (!chance.behavior.haveScore){
            return 'chance-4';
        }

        return chanceAnim(chance.lifetime);

    }

    function drawChance(context) {
        sprite.draw(routeAnim(this), context, 0, 0);
    }

    return function createChance() {
        var chance = new Entity();

        chance.size.set(16, 16.1);
        chance.addtrait(new Solid());
        chance.addtrait(new BehaviorChance());
        chance.addtrait(new Stop());

        chance.draw = drawChance;

        return chance;
    }
}