var PRESSED = 1;
var RELEASED = 0;

function setupKeyboard(entity) {

    var input = new keyboard();
    input.addMapping(32, keyState => {    //space is 32
        if (keyState){
            entity.jump.start();
        }else{
            entity.jump.cancel();
        }
    });
    input.addMapping(39, keyState => {   //right is 39
        entity.go.dir += keyState ? 1 : -1;
    });
    input.addMapping(37, keyState => {  //left is 37
        entity.go.dir += -keyState ? -1 : 1;
    });
    return input;
}

class keyboard {
    constructor(){
        this.keyStates = new Map();

        this.keyMap = new Map();
    }

    addMapping(keyCode, callback){
        this.keyMap.set(keyCode, callback);
    }

    handleEvent(event){
        var {keyCode} = event;

        if (!this.keyMap.has(keyCode)){
            return;
        }

        event.preventDefault();

        var keyState = event.type !== 'keydown' ? RELEASED : PRESSED;

        if (this.keyStates.get(keyCode) === keyState){
            return;
        }
        
        this.keyStates.set(keyCode, keyState);


        this.keyMap.get(keyCode)(keyState);
    }

    lisenTo(window){
        ['keydown', 'keyup'].forEach(eventName => {
            window.addEventListener(eventName, event =>{
                this.handleEvent(event);
            });
        })

    }
}