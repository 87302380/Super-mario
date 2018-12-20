function loadMarioSprites() {
    return loadImage("img/characters.gif")
        .then(image =>{
            var sprites = new SpriteSheet(image, 24, 32);
            sprites.define("mario", 276, 42, 16, 16);
            return sprites;});
}
