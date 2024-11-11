document.querySelectorAll(".game").forEach((g) => g.title=g.textContent)
async function setGameIcons() {
    document.querySelectorAll(".ico").forEach(async (icon) => {
        const appId = icon.getAttribute("aid");
        const response = await fetch(`https://store.steampowered.com/api/appdetails?appids=${appId}`);
        const data = await response.json();
        if (data[appId]?.success) {
            icon.src = `https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/apps/${appId}/${data[appId].data.img_icon_url}.ico`;
        }
    });
}

document.addEventListener("DOMContentLoaded", setGameIcons);
