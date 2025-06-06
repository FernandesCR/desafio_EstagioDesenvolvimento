const typeImagesNameContainer = document.querySelector('#typeImagesNameContainer');

const fetchPokemonData = async (pokemonURL) => {
    const response = await fetch(pokemonURL);
    const data = await response.json();
    return data;
};

const renderPokemon = async () => {
    const response = await fetch('https://pokeapi.co/api/v2/type/15');
    const data = await response.json();
    const normalTypePokemon = data.pokemon;

    const pokeCardContainer = document.getElementById('pokeCardContainer');
    pokeCardContainer.innerHTML = '';



    for (const pokemonData of normalTypePokemon) {
        const response = await fetchPokemonData(pokemonData.pokemon.url);
        const pokemonInfo = response;

        const pokemonImage = document.createElement('img');
        const spriteInfo = pokemonInfo['sprites'];

        if (spriteInfo['versions']['generation-v']['black-white']['animated']['front_default']) {
            pokemonImage.src = spriteInfo['versions']['generation-v']['black-white']['animated']['front_default'];
        } else if (spriteInfo['front_default']) {
            pokemonImage.src = spriteInfo['front_default'];
        } else if (spriteInfo['other']['official-artwork']['front_default']) {
            pokemonImage.src = spriteInfo['other']['official-artwork']['front_default'];
        }


        pokemonImage.style.width = '90px';
        pokemonImage.style.height = '90px';

        const pokeCard = document.createElement('div');
        pokeCard.className = 'pokeCard';

        const idPokemon = document.createElement('div');
        idPokemon.className = 'idPokemon';
        idPokemon.textContent = '#' + pokemonInfo.id;

        const namePokemon = document.createElement('div');
        namePokemon.className = 'namePokemon';
        namePokemon.textContent = pokemonInfo.name.charAt(0).toUpperCase() + pokemonInfo.name.slice(1).toLowerCase();

        pokeCard.appendChild(pokemonImage);
        pokeCard.appendChild(idPokemon);
        pokeCard.appendChild(namePokemon);

        const typeNames = pokemonInfo.types.map(type => type.type.name);

        for (const typeName of typeNames) {
            const typeImageName = document.createElement('img');
            typeImageName.src = `../../imagens/tipos-nomes/${typeName}_en.png`;
            typeImageName.style.width = '46%';
            typeImageName.style.height = '40%';
            typeImageName.style.marginRight = '5px';
            pokeCard.appendChild(typeImageName);
        }
        pokeCardContainer.appendChild(pokeCard);
    }

};

const hideLoadingOverlay = () => {
    const loadingOverlay = document.querySelector('.loading-overlay');
    loadingOverlay.style.display = 'none';
};

renderPokemon().then(() => {
    hideLoadingOverlay();
});

