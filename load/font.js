
const CHARS = ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~';

class Font {
    constructor(sprites, size) {
        this.sprites = sprites;
        this.size = size;
    }

    print(text, context, x, y) {
        [...text].forEach((char, pos) => {
            this.sprites.draw(char, context, x + pos * this.size, y);
        });
    }
}

function loadFont() {
    return loadImage('./img/font.png')
        .then(image => {
            var fontSprite = new SpriteSheet(image);

            var size = 8;
            var rowLen = image.width;

            for (let [index, char] of [...CHARS].entries()) {
                var x = index * size % rowLen;
                var y = Math.floor(index * size / rowLen) * size;
                fontSprite.define(char, x, y, size, size);
            }

            return new Font(fontSprite, size);
        });
}