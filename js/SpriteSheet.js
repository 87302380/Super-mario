class SpriteSheet{
    constructor(image, width, height){
        this.image = image;
        this.width = width;
        this.height = height;
        this.tile = new Map();
        this.animations = new Map();
    }

    defineAnim(name, animation){
        this.animations.set(name, animation);
    }

    define(name, x, y, width, height) {

        var buffers = [false, true].map(flip =>{
            var buffer = document.createElement("canvas");
            buffer.width = width;
            buffer.height = height;

            var context = buffer.getContext("2d");
            
            if (flip){
                context.scale(-1, 1);
                context.translate(-width, 0);
            }

            context.drawImage(
                this.image,
                x,
                y,
                width,
                height,
                0,
                0,
                width,
                height);

            return buffer;
        });



        this.tile.set(name, buffers);
    }

    defineTile(name, x, y){
        this.define(name, x * this.width, y * this.height, this.width, this.height);
    }

    draw(name, context, x, y, flip = false){
        var buffer = this.tile.get(name)[flip ? 1 : 0];
        context.drawImage(buffer, x , y);
    }

    drawAnim(name, context, x, y, distance){
        const animation = this.animations.get(name);
        this.drawTile(animation(distance), context, x, y);
    }

    drawTile(name, context, x, y){
        this.draw(name, context, x * this.width, y * this.height);
    }
}