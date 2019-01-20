



function loadRank() {

    var url = "./rank/rankData.json";
    var ranks = [];

    var data = loadJSON(url);
    data.then(rank => {

        rank.rank.forEach(data =>{
            ranks.push(data.name +': ' +data.score);
        })
        makeOL(ranks);
    });

}


function makeOL(ranks){

    var text = '<ol>' + '\n';

    ranks.forEach(data => {
        text = text + '<li>' + data + '</li>' + '\n';
        console.log(data);
    })

    text = text + '</ol>';

    document.getElementById('rank').innerHTML = text;
}
loadRank();
//makeOL();
