class Level{
    constructor(){

        this.gravity = 70;
        this.totalTime = 0;

        this.comp = new Compositor();
        this.entites = new Set();

        this.entityCollider = new EntityCollider(this.entites);
        this.tileCollider = null;
    }

    setCollisionGrid(matrix){
        this.tileCollider = new TileCollider(matrix);
    }

    update(deltaTime){
        this.entites.forEach(entity =>{
            entity.update(deltaTime, this);

            entity.pos.x += entity.vel.x * deltaTime*10 ;
            if (entity.canCollide){
                this.tileCollider.checkX(entity);
            }

            entity.bounds.top += entity.vel.y * deltaTime*10 ;
            if (entity.canCollide){
                this.tileCollider.checkY(entity);
            }

            entity.vel.y += this.gravity * deltaTime;
        });

        this.entites.forEach(entity =>{
            if (entity.canCollide){
                this.entityCollider.check(entity);
            }
        })

        this.totalTime += deltaTime;
    }
}