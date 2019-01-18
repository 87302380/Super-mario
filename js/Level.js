class Level{
    constructor(){

        this.gravity = 70;                   //重力 影响跳跃的高度
        this.totalTime = 0;

        this.comp = new Compositor();
        this.entites = new Set();

        this.tileCollider = null;
    }

    setCollisionGrid(matrix){
        this.tileCollider = new TileCollider(matrix);
    }

    update(deltaTime){
        this.entites.forEach(entity =>{
            entity.update(deltaTime);

            entity.pos.x += entity.vel.x * deltaTime*10 ;
            this.tileCollider.checkX(entity);

            entity.bounds.top += entity.vel.y * deltaTime*10 ;
            this.tileCollider.checkY(entity);

            entity.vel.y += this.gravity * deltaTime;
        });

        this.totalTime += deltaTime;
    }
}