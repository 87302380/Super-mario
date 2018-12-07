function loadMarioSprites() {
    return loadImage("img/characters.gif")
        .then(image =>{
            var sprites = new SpriteSheet(image, 24, 32);
            sprites.define("mario", 276, 42, 16, 16);
            return sprites;});
}

function loadBackgroundSprites(){

    return loadImage("img/tile.png")
        .then(image =>{
            var sprites = new SpriteSheet(image, 16, 16);
            sprites.defineTile("ground", 0, 0);
            sprites.defineTile("sky", 3, 23);
            return sprites;});
}