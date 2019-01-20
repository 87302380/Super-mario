
function createSpritesLayer(entities, width = 64, height = 64){

    var spritBuffer = document.createElement("canvas");
    spritBuffer.width = width;
    spritBuffer.height = height;

    var spritBufferContext = spritBuffer.getContext("2d");

    return function drawSpritesLayer(context) {
        entities.forEach(entity =>{
            spritBufferContext.clearRect(0, 0, width, height);

            entity.draw(spritBufferContext);

            context.drawImage(
                spritBuffer,
                entity.pos.x - camera.pos.x,
                entity.pos.y - camera.pos.y);
        });

    };
}
