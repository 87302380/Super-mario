
var canvas = document.getElementById("screen");
var context = canvas.getContext("2d");


Promise.all([
    creatMario(),
    loadLevel("1"),
]).then(([mario,level])=> {

        mario.pos.set(100, 400);            //马里奥生成的初始位置
        mario.vel.set(2 , -10);             //马里奥跳跃的距离高度设置

        createCollisionLayer(level);

        level.entites.add(mario);

        var input = setupKeyboard(mario);
        input.lisenTo(window);

        ['mousedown', 'mousemove'].forEach(eventN =>{
            canvas.addEventListener(eventN, event =>{
                if (event.buttons === 1){
                    mario.vel.set(0,0);
                    mario.pos.set(event.offsetX, event.offsetY);
                }
            });
        });

        var timer = new Timer(1/60);

        timer.update = function update(deltaTime){

            level.update(deltaTime);
            level.comp.draw(context);
        };

        timer.start();
});







