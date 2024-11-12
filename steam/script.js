async function loadGames() {
    const response = await fetch('list.json');
    const data = await response.json();
    const gamesList = document.getElementById('gamesList');
    const audio = new Audio("click.wav");

    function short(url) {
        const regex = /apps\/(\d+)\//;
        const match = url.match(regex);
        return match ? match[1] : null;
    }

    data.games.forEach(game => {
        const gameDiv = document.createElement('div');
        gameDiv.classList.add('game');
        const icon = document.createElement('img');
        icon.classList.add('ico');
        icon.src = game.i;
        const gameName = document.createElement('span');
        gameName.textContent = game.n;
        gameDiv.appendChild(icon);
        gameDiv.appendChild(gameName);
        gamesList.appendChild(gameDiv);

        gameDiv.title = gameName.textContent;
        gameDiv.addEventListener("click", function() {
            audio.play();
            const appId = short(game.i);
            if (appId) {
                window.open(`https://store.steampowered.com/app/${appId}`, "_blank");
            }
        });
        gameDiv.addEventListener("contextmenu", function() {
            if (appId) {
                window.open(`https://steamdb.info/app/${appId}/info`, "_blank");
            }
        });
    });
}
document.addEventListener("DOMContentLoaded", loadGames);
