function createPlayerEnv(playerEntity){
    var playerEnv = new Entity();
    var playerControl = new PlayerController();

    playerControl.checkpoint.set(64, 64);
    playerControl.setPlayer(playerEntity);
    playerEnv.addtrait(playerControl);
    return playerEnv;
}

async function main(canvas) {
    var context = canvas.getContext('2d');
    var [entityFactory, font] = await Promise.all([
        loadEntities(),
        loadFont(),
    ]);
    var loadLevel = await createLevelLoader(entityFactory);

    var camera = new Camera();
    window.camera = camera;

    var mario = entityFactory.mario();

    var playerEnv = createPlayerEnv(mario);
    var l = playerEnv.playerController.level;

    var level = await loadLevel(l);
    level.entites.add(playerEnv);

    level.comp.layers.push(createDashboardLayer(font, playerEnv));

    setupMouseControl(canvas, mario, camera);

    var input = setupKeyboard(mario);
    input.lisenTo(window);

    var timer = new Timer(1/60);

    timer.update = function update(deltaTime){
        level.update(deltaTime);

        camera.pos.x = Math.max(0, mario.pos.x - 100);

        level.comp.draw(context, camera);

    }


    timer.start();
}

var canvas = document.getElementById('screen');
main(canvas);





