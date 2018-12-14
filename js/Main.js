
var canvas = document.getElementById("screen");
var context = canvas.getContext("2d");



Promise.all([
    creatMario(),
    loadBackgroundSprites(),
    loadLevel("1"),
]).then(([mario,backgroundsprites,level])=> {

        var compositor = new Compositor();

        var backgroundLayer = createBackgroundLayer(level.backgrounds, backgroundsprites);
        compositor.layers.push(backgroundLayer);

        var gravity = 40; //重力 影响跳跃的高度
        mario.pos.set(100, 380);            //马里奥生成的初始位置
        mario.vel.set(2 , -10);             //马里奥跳跃的距离高度设置


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

        var spritesLayer = createSpritesLayer(mario);
        compositor.layers.push(spritesLayer);

        var timer = new Timer(1/60);

        timer.update = function update(deltaTime){

            mario.update(deltaTime);
            compositor.draw(context);
            mario.vel.y += gravity * deltaTime;
        }

        timer.start();
});







