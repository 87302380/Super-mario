var PRESSED = 1;
var RELEASED = 0;

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