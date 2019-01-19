

async function main(canvas) {
    var context = canvas.getContext('2d');
    var entityFactory = await loadEntities();

    var  loadLevel = await createLevelLoader(entityFactory);

    var level = await loadLevel('1');

    var camera = new Camera();
    window.camera = camera;

    var mario = entityFactory.mario();
    // mario.pos.set(16, 0);
    mario.vel.set(2 , -10);



    level.entites.add(mario);

    //setupMouseControl(canvas, mario, camera);
    var input = setupKeyboard(mario);
    input.lisenTo(window);


    var timer = new Timer(1/60);

    timer.update = function update(deltaTime){

        level.update(deltaTime);

        if (mario.pos.x > 100){
            camera.pos.x = mario.pos.x - 100;
        }

        level.comp.draw(context, camera);
    }

    timer.start();

}

var canvas = document.getElementById('screen');
main(canvas);





