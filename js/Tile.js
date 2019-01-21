class TileResolver {
    constructor(matrix, tileSize = 16){
        this.matrix = matrix;
        this.tileSize = tileSize;
    }

    toIndexRange(pos1, pos2){
        var pMax = Math.ceil(pos2 / this.tileSize) * this.tileSize;
        var range = [];
        let pos = pos1;
        do {
            range.push(this.toIndex(pos));
            pos += this.tileSize;
        } while (pos < pMax);
        return range;
    }

    toIndex(pos){
        return Math.floor(pos / this.tileSize);
    }

    getByIndex(indexX, indexY){
        var tile = this.matrix.get(indexX, indexY);
        if (tile){
            var x1 = indexX * this.tileSize;
            var x2 = x1 + this.tileSize;
            var y1 = indexY * this.tileSize;
            var y2 = y1 + this.tileSize;
            return {
                tile,
                x1,
                x2,
                y1,
                y2,
            };
        }
    }

    serchByRange(x1, x2, y1, y2){
        var matches = [];
        this.toIndexRange(x1, x2).forEach(indexX => {
            this.toIndexRange(y1, y2).forEach(indexY => {
                var match = this.getByIndex(indexX, indexY);
                if (match){
                    matches.push(match);
                }
            });
        });
        return matches;
    }
}

class TileCollider {
    constructor(tileMatrix){
        this.tiles = new  TileResolver(tileMatrix);
    }
    checkX(entity){
        let x;
        if (entity.vel.x > 0) {
            x = entity.bounds.right;
        } else if (entity.vel.x < 0) {
            x = entity.bounds.left;
        } else {
            return;
        }

        var matches = this.tiles.serchByRange(
            x, x,
            entity.bounds.top, entity.bounds.bottom);
        matches.forEach(match => {

            if (match.tile.type !== 'ground' && match.tile.type !== 'chance'){
                return;
            }

            if (entity.vel.x > 0){
                if (entity.bounds.right > match.x1){
                    entity.obstruct(Sides.RIGHT, match);
                }
            }else if(entity.vel.x<0){
                if (entity.bounds.left < match.x2){
                    entity.obstruct(Sides.LEFT, match);
                }
            }
        });
    }

    checkY(entity){
        let y;
        if (entity.vel.y > 0) {
            y = entity.bounds.bottom;
        } else if (entity.vel.y < 0){
            y = entity.bounds.top;
        } else {
            return;
        }

        var matches = this.tiles.serchByRange(
            entity.bounds.left, entity.bounds.right,
            y, y);
        matches.forEach(match => {

            if (match.tile.type !== 'ground' && match.tile.type !== 'chance' ){
                return;
            }

            if (entity.vel.y > 0){
                if (entity.bounds.bottom > match.y1){

                    entity.obstruct(Sides.BOTTOM, match);
                }
            }else if(entity.vel.y<0){
                if (entity.bounds.top < match.y2){
                    if (match.tile.type === 'chance'){
                        entity.obstruct(Sides.CHANCE, match);
                    }else {
                        entity.obstruct(Sides.TOP, match);

                    }
                }
            }
        });
    }
}