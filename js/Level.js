class Level{
    constructor(){
        this.comp = new Compositor();
        this.entites = new Set();
        this.tiles = new Matrix();

        this.tileCollider = new Tile(this.tiles);
    }

    update(deltaTime){
        this.entites.forEach(entity =>{
            entity.update(deltaTime);

            this.tileCollider.test(entity);
        });
    }
}