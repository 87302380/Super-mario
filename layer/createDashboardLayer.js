function createDashboardLayer(font, playerEnv) {

    var LINE1 = font.size;
    var LINE2 = font.size * 2;

    return function drawDashboard(context) {

        var {score, time, coins} = playerEnv.playerController;

        font.print('MARIO', context, 16, LINE1);
        font.print(score.toString().padStart(6, '0'), context, 16, LINE2);
        if (coins >= 0){
            font.print('@x' + coins.toString().padStart(2, '0'), context, 120, LINE2);
        }else {
            font.print('@x' + '0'.padStart(2, '0'), context, 120, LINE2);
            font.print('GAME OVER', context, 280, 240);
        }


        font.print('WORLD', context, 296, LINE1);
        font.print('1-1', context, 304, LINE2);

        font.print('TIME', context, 588, LINE1);
        font.print(time.toFixed().toString().padStart(3, '0'), context, 596, LINE2);
    };
}