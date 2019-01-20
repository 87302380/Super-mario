class Jump extends Trait{
    constructor() {
        super("jump");

        this.ready = 0;
        this.duration = 0.3;
        this.engageTime = 0;
        this.requestTime = 0;
        this.gracePeriod = 0.1;
        this.speedBoost = 0.3;
        this.velocity = 200;
    }

    get falling(){
        return this.ready < 0;
    }

    start(){
        if (this.ready > 0){
            this.requestTime = this.gracePeriod;
        }
    }

    cancel(){
        this.engageTime = 0;
        this.requestTime = 0;
    }

    obstruct(entity, side){
        if (side === Sides.BOTTOM){
            this.ready = 1;
        }else if (side === Sides.TOP) {
            this.cancel();
        }
    }

    update(entity, deltaTime){
        if (this.requestTime > 0){
            if (this.ready > 0){
                this.engageTime = this.duration;
                this.requestTime = 0;
            }

            this.requestTime -= deltaTime;
        }
        
        if (this.engageTime > 0){
            entity.vel.y = -(this.velocity + Math.abs(entity.vel.x) * this.speedBoost);
            this.engageTime -= deltaTime;
        }

        this.ready--;
    }
}

class Go extends Trait{
    constructor() {
        super("go");

        this.dir = 0;
        this.acceleration = 400;
        this.deceleration = 300;
        this.dragFactor = 1/5000;

        this.distance = 0;
        this.heading = 1;
    }

    update(entity, deltaTime){
        var absX = Math.abs(entity.vel.x);

        if (this.dir !== 0){
            entity.vel.x += this.acceleration *  deltaTime * this.dir;

            if (entity.jump){
                if (entity.jump.falling === false){
                    this.heading = this.dir;
                }
            }else {
                this.heading = this.dir;
            }

        }else if (entity.vel.x !==0 ) {
            var decel = Math.min(absX, this.deceleration * deltaTime);
            entity.vel.x += entity.vel.x > 0 ? -decel : decel;
        }else {
            this.distance = 0;
        }

        var drag = this.dragFactor * entity.vel.x * Math.abs(entity.vel.x);
        entity.vel.x -= drag;

        this.distance += absX * deltaTime;
    }
}


class Walk extends Trait{
    constructor() {
        super("walk");
        this.enabled = true;
        this.speed = -30;
    }

    obstruct(entity, side){
        if (side === Sides.LEFT || side === Sides.RIGHT){
            this.speed = -this.speed;
        }
    }

    update(entity, deltaTime){
        if (this.enabled){
            entity.vel.x = this.speed;
        }
    }
}

class Stomper extends Trait{
    constructor() {
        super("stomper");
        this.bounceSpeed = 200;

        this.onStomp = function () {
        }
    }

    bounce(us, them) {
        us.bounds.bottom = them.bounds.top;
        us.vel.y = -this.bounceSpeed;
    }

    collides(us, them) {
        if (!them.killable || them.killable.dead) {
            return;
        }

        if (us.vel.y > them.vel.y) {
            this.bounce(us, them);
            this.onStomp(us, them);
        }
    }
}

class Killable extends Trait{
    constructor() {
        super("killable");
        this.dead = false;
        this.deltaTime = 0;
        this.removeAfter = 1;
    }

    kill(){
        this.queue(() => this.dead = true);
    }

    revive(coins){
        if (coins === 0){
            return;
        }

        this.dead = false;
        this.deltaTime = 0;
        coins = coins - 1;

        return coins;
    }

    update(entity, deltaTime, level){
        if (this.dead){
            this.deltaTime += deltaTime;
            if (this.deltaTime > this.removeAfter){
                this.queue(() => {
                    level.entites.delete(entity);
                });
            }
        }
    }
}

class Solid extends Trait{
    constructor() {
        super("solid");
        this.obstructs = true;

    }
    obstruct(entity, side, match){
        if (!this.obstructs) {
            return;
        }

        if (side === Sides.BOTTOM) {
            entity.bounds.bottom = match.y1;
            entity.vel.y = 0;
        } else if (side === Sides.TOP) {
            entity.bounds.top = match.y2;
            entity.vel.y = 0;
        } else if (side === Sides.LEFT) {
            entity.bounds.left = match.x2;
            entity.vel.x = 0;
        } else if (side === Sides.RIGHT) {
            entity.bounds.right = match.x1;
            entity.vel.x = 0;
        }
    }
}

class PlayerController extends Trait{
    constructor() {
        super('playerController');
        this.checkpoint = new Vec2(0, 0);
        this.player = null;
        this.score = 0;
        this.coins = 13;
        this.input = null;
        this.time = 300;
    }

    setPlayerInput(input){
        this.input = input;
        console.log(this.input);
    }

    setPlayer(entity){
        this.player = entity;

        this.player.stomper.onStomp = () => {
            this.score += 100;
        }
    }

    update(entity, deltaTime, level){
        if (!level.entites.has(this.player)){
            this.coins = this.player.killable.revive(this.coins);
            if (this.coins >= 0){
                this.player.pos.set(this.checkpoint.x, this.checkpoint.y);
                level.entites.add(this.player);
            }

         }else {
            this.time -= deltaTime;
         }

        if (this.player.pos.y > 500){
            this.coins = this.player.killable.revive(this.coins);
            if (this.coins >= 0){
                this.player.pos.set(this.checkpoint.x, this.checkpoint.y);
                level.entites.add(this.player);
            }
        }

    }

}