const pokeFetch = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
};

const renderBerrys = async () => {
    const response = await fetch('https://pokeapi.co/api/v2/berry?limit=64');
    const data = await response.json();
    const berrys = data.results;

    const berryConteiner = document.querySelector('.berryConteiner');

    for (const berryDados of berrys) {
        const berryInfo = await pokeFetch(berryDados.url);
        const itemInfo = await pokeFetch(berryInfo.item.url);

        const berryCard = document.createElement('div');
        berryCard.className = 'card';

        const berryimage = document.createElement('img');
        berryimage.src = itemInfo.sprites.default;
        berryimage.style.width = '100px';
        berryimage.style.height = '100px';

        const idBerry = document.createElement('div');
        idBerry.className = 'id';
        idBerry.textContent = '#' + itemInfo.id;

        const nameBarry = document.createElement('div');
        nameBarry.className = 'name';
        nameBarry.textContent = itemInfo.name.charAt(0).toUpperCase() + itemInfo.name.slice(1).toLowerCase();

        berryCard.appendChild(berryimage);
        berryCard.appendChild(idBerry);
        berryCard.appendChild(nameBarry);

        berryConteiner.appendChild(berryCard);
    }
};

const hideLoadingOverlay = () => {
    const loadingOverlay = document.querySelector('.loading-overlay');
    loadingOverlay.style.display = 'none';
};

renderBerrys().then(() => {
    hideLoadingOverlay();
});
