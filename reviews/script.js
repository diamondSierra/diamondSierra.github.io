document.getElementById('menu-button').addEventListener('click', function() {
    const slideMenu = document.getElementById('slide-menu');
    slideMenu.classList.toggle('show');
});

const currentPage = window.location.pathname.split('/').pop();
const menuItems = document.querySelectorAll('.menu-item');

menuItems.forEach(item => {
    if (item.getAttribute('href') === currentPage) {
        item.classList.add('active');
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const gameList = document.getElementById("game-list");

    fetch('games.json')
        .then(response => response.json())
        .then(games => {
            games.forEach(game => {
                const img = document.createElement('img');
                img.src = game.thumbnail;
                img.alt = game.title;
                img.title = game.title;
                gameList.appendChild(img);
            });
        })
        .catch(error => console.error('Error loading games:', error));
});
