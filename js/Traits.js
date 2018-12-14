class Jump extends Trait{
    constructor() {
        super("jump");

        this.duration = 0.5;
        this.velocity = 5;
        this.engageTime = 0;
    }

    start(){
        this.engageTime = this.duration;
    }

    cancel(){
        this.engageTime = 0;
    }

    update(entity, deltaTime){
        entity.pos.x += 1;
        if (this.engageTime > 0){
            entity.vel.y = -this.velocity;
            this.engageTime -= deltaTime;
        }
    }
}

class Velocity extends Trait{
    constructor() {
        super("velocity");
    }

    update(entity, deltaTime){
        entity.pos.y += entity.vel.y ;
    }
}