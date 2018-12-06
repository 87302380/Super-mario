class SpriteSheet{
    constructor(image, width, height){
        this.image = image;
        this.width = width;
        this.height = height;
        this.tile = new Map();
    }

    define(name, x, y) {
        var buffer = document.createElement("canvas");
        buffer.width = this.width;
        buffer.height = this.height;
        buffer
            .getContext("2d")
            .drawImage(
                this.image,
                x * this.width,
                y * this.height,
                this.width,
                this.height,
                0,
                0,
                this.width,
                this.height);
        this.tile.set(name, buffer)
    }

    draw(name, context, x, y){
        var buffer = this.tile.get(name);
        context.drawImage(buffer, x , y);
    }

    drawTile(name, context, x, y){
        this.draw(name, context, x*this.width, y*this.height);
    }
}