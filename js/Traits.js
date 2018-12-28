class Jump extends Trait{
    constructor() {
        super("jump");

        this.duration = 0.1;
        this.velocity = 30;
        this.engageTime = 0;
    }

    start(){
        this.engageTime = this.duration;
    }

    cancel(){
        this.engageTime = 0;
    }

    update(entity, deltaTime){
        if (this.engageTime > 0){
            entity.vel.y = -this.velocity;
            this.engageTime -= deltaTime;
        }
    }
}

class Go extends Trait{
    constructor() {
        super("go");

        this.dir = 0;
        this.speed = 1000;

        this.distance = 0;
        this.heading = 1;
    }

    update(entity, deltaTime){
        entity.vel.x = this.speed * this.dir * deltaTime;
        
        if (this.dir){
            this.heading = this.dir;
            this.distance += Math.abs(entity.vel.x) * deltaTime;
        }else {
            this.distance = 0;
        }
    }
}

