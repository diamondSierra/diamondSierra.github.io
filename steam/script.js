async function loadGames() {
    const response = await fetch('list.json');
    const data = await response.json();
    const gamesList = document.getElementById('gamesList');
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
    });

    document.querySelectorAll(".game").forEach((g) => g.title=g.textContent)
}
document.addEventListener("DOMContentLoaded", loadGames);
