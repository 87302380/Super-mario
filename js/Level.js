class Level{
    constructor(){

        this.gravity = 1000;
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

            entity.pos.x += entity.vel.x * deltaTime ;
            this.tileCollider.checkX(entity);

            entity.pos.y += entity.vel.y * deltaTime ;
            this.tileCollider.checkY(entity);

            entity.vel.y += this.gravity * deltaTime;

        });

        this.entites.forEach(entity =>{
            this.entityCollider.check(entity);
        });

        this.entites.forEach(entity => {
            entity.finalize();
        });

        this.totalTime += deltaTime;
    }
}