class Level{
    constructor(){

        this.gravity = 70;                   //重力 影响跳跃的高度
        this.totalTime = 0;

        this.comp = new Compositor();
        this.entites = new Set();
        this.tiles = new Matrix();

        this.tileCollider = new TileCollider(this.tiles);
    }

    update(deltaTime){
        this.entites.forEach(entity =>{
            entity.update(deltaTime);

            entity.pos.x += entity.vel.x * deltaTime*10 ;
            this.tileCollider.checkX(entity);

            entity.pos.y += entity.vel.y * deltaTime*10 ;
            this.tileCollider.checkY(entity);

            entity.vel.y += this.gravity * deltaTime;
        });

        this.totalTime += deltaTime;
    }
}