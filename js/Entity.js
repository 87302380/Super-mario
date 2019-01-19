
const Sides = {
    TOP: Symbol('top'),
    BOTTOM: Symbol('bottom'),
    RIGHT: Symbol('left'),
    LEFT: Symbol('right'),
};

class Trait {
    constructor(name){
        this.NAME = name;
    }

    collides(us, them) {

    }

    obstruct(){

    }

    update(){

    }
}

class Entity{
    constructor(){
        this.canCollide = true;

        this.pos = new Vec2(0, 0);
        this.vel = new Vec2(0, 0);
        this.size = new Vec2(0, 0);
        this.offset = new Vec2(0, 0);
        this.bounds = new BoundingBox(this.pos, this.size, this.offset);
        this.lifetime = 0;

        this.traits = [];
    }
    addtrait(trait){
        this.traits.push(trait);
        this[trait.NAME] =trait;
    }

    collides(candidate) {
        this.traits.forEach(trait => {
            trait.collides(this, candidate);
        });
    }

    obstruct(side){
        this.traits.forEach(trait =>{
            trait.obstruct(this, side);
        });
    }

    draw(){

    }

    update(deltaTime, level){
        this.traits.forEach(trait =>{
            trait.update(this, deltaTime, level);
        });

        this.lifetime += deltaTime;
    }

}

