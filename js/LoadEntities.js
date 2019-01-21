
function loadEntities() {

    var entityFactories = {};

    function add(name) {
        return factory => entityFactories[name] = factory;
    }

    return Promise.all([
        loadMario().then(add('mario')),
        loadGoomba().then(add('goomba')),
        loadKoopa().then(add('koopa')),
        loadChance().then(add('chance')),
    ]).then(() => entityFactories)
}