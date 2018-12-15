class TileResolver {
    constructor(matrix, tileSize = 16){
        this.matrix = matrix;
        this.tileSize = tileSize;
    }

    toIndex(pos){
        return Math.floor(pos / this.tileSize);
    }

    getByIndex(indexX, indexY){
        var tile = this.matrix.get(indexX, indexY);
        if (tile){
            return {
                tile,
            };
        }
    }

    matchByPosition(posX, posY){
        return this.getByIndex(this.toIndex(posX), this.toIndex(posY));
    }
}

class Tile {
    constructor(tileMatrix){
        this.tiles = new  TileResolver(tileMatrix);
    }

    test(entity){
        var match = this.tiles.matchByPosition(entity.pos.x, entity.pos.y);
        if (match) {
            console.log(match, match.tile);
        }

    }
}