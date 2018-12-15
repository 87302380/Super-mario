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
    }

    update(entity, deltaTime){
        entity.vel.x = this.speed * this.dir * deltaTime;
    }
}

// class Velocity extends Trait{
//     constructor() {
//         super("velocity");
//     }
//
//     update(entity, deltaTime){
//         entity.pos.x += entity.vel.x * deltaTime*10 ;
//         entity.pos.y += entity.vel.y * deltaTime*10 ;
//     }
// }

