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

    serchByPosition(posX, posY){
        return this.getByIndex(this.toIndex(posX), this.toIndex(posY));
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
        var matches = this.tiles.serchByRange(
            entity.pos.x, entity.pos.x + entity.size.x,
            entity.pos.y, entity.pos.y + entity.size.y);
        matches.forEach(match => {
            if (match.tile.name !== 'ground'){
                return;
            }
            if (entity.vel.x > 0){
                if (entity.pos.x + entity.size.x > match.x1){
                    entity.pos.x = match.x1 - entity.size.x;
                    entity.vel.x = 0;
                }
            }else if(entity.vel.x<0){
                if (entity.pos.x < match.x2){
                    entity.pos.x = match.x2;
                    entity.vel.x = 0;
                }
            }
        });
    }

    checkY(entity){
        var matches = this.tiles.serchByRange(
            entity.pos.x, entity.pos.x + entity.size.x,
            entity.pos.y, entity.pos.y + entity.size.y);
        matches.forEach(match => {
            if (match.tile.name !== 'ground'){
                return;
            }
            if (entity.vel.y > 0){
                if (entity.pos.y + entity.size.y > match.y1){
                    entity.pos.y = match.y1 - entity.size.y;
                    entity.vel.y = 0;
                }
            }else if(entity.vel.y<0){
                if (entity.pos.y < match.y2){
                    entity.pos.y = match.y2;
                    entity.vel.y = 0;
                }
            }
        });
    }
}