
var canvas = document.getElementById("screen");
var context = canvas.getContext("2d");


Promise.all([
    creatMario(),
    loadLevel("1"),
]).then(([mario,level])=> {

        var gravity = 40; //重力 影响跳跃的高度
        mario.pos.set(100, 380);            //马里奥生成的初始位置
        mario.vel.set(2 , -10);             //马里奥跳跃的距离高度设置

        level.entites.add(mario);

        var SPACE = 32;
        var input = new keyboard();
        input.addMapping(SPACE, keyState => {
            if (keyState){
                console.log("test1");
                mario.jump.start();
            }else{
                mario.jump.cancel();
            }
        });
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
            mario.vel.y += gravity * deltaTime;
        };

        timer.start();
});







