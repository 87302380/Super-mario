
var canvas = document.getElementById("screen");
var context = canvas.getContext("2d");


Promise.all([
    creatMario(),
    loadLevel("1"),
]).then(([mario,level])=> {

        var camera = new Camera();
        window.camera = camera;

        mario.pos.set(16, 0);            //马里奥生成的初始位置
        mario.vel.set(2 , -10);             //马里奥跳跃的距离高度设置

        createCollisionLayer(level);

        level.entites.add(mario);


        setupMouseControl(canvas, mario, camera);
        var input = setupKeyboard(mario);
        input.lisenTo(window);


        var timer = new Timer(1/60);

        timer.update = function update(deltaTime){

            level.update(deltaTime);

            if (mario.pos.x > 100){
                camera.pos.x = mario.pos.x - 100;
            }

            level.comp.draw(context, camera);
        };

        timer.start();
});







