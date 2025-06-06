const pokeFetch = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
};

const renderPokebolas = async () => {
    const categories = [
        'https://pokeapi.co/api/v2/item-category/standard-balls',
        'https://pokeapi.co/api/v2/item-category/special-balls',
        'https://pokeapi.co/api/v2/item-category/apricorn-balls'
    ];

    const pokebolaContainer = document.querySelector('.pokebolaContainer');

    if (!pokebolaContainer) {
        return;
    }

    for (const categoryUrl of categories) {
        const categoryData = await pokeFetch(categoryUrl);
        const items = categoryData.items;

        for (const item of items) {
            const itemData = await pokeFetch(item.url);

            const bollCard = document.createElement('div');
            bollCard.className = 'card';

            const pokebolaImage = document.createElement('img');
            pokebolaImage.src = itemData.sprites.default;
            pokebolaImage.style.width = '100px';
            pokebolaImage.style.height = '100px';

            const idPokebolla = document.createElement('div');
            idPokebolla.className = 'id';
            idPokebolla.textContent = '#' + itemData.id;

            const nameBoll = document.createElement('div');
            nameBoll.className = 'name';
            nameBoll.textContent = itemData.name.charAt(0).toUpperCase() + itemData.name.slice(1).toLowerCase();

            bollCard.appendChild(pokebolaImage);
            bollCard.appendChild(idPokebolla);
            bollCard.appendChild(nameBoll);

            pokebolaContainer.appendChild(bollCard);
        }
    }
};

const hideLoadingOverlay = () => {
    const loadingOverlay = document.querySelector('.loading-overlay');
    if (loadingOverlay) {
        loadingOverlay.style.display = 'none';
    }
};

renderPokebolas().then(() => {
    hideLoadingOverlay();
});
