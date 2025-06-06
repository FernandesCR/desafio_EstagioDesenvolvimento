const pkmnImg = document.querySelector(".pokemonImage");
const pkmnNum = document.querySelector(".pokemonNumber");
const pkmnNome = document.querySelector(".pokemonName");
const tiposImgs = document.querySelector(".typeImages");
const tiposNomesImgs = document.querySelector(".typeImagesName");
const statsTotal = document.getElementById("totalStatsValor");
const tipoTitulo = document.getElementById("tipos");
const corFundo = document.getElementById("cor2");
const caixaCor = document.getElementById("cor");
const caixaInfo = document.getElementById("container");
const botaoNormal = document.getElementById("btnNormal");
const botaoShiny = document.getElementById("btnShiny");
const inputBusca = document.querySelector(".search");
const formBusca = document.querySelector(".form");
const listaPkmn = document.getElementById("pokemonList");

const compPkmn1Div = document.getElementById("pokemonComparacao1");
const compPkmn2Div = document.getElementById("pokemonComparacao2");
const btnSelComp1 = document.getElementById("btnSelectComparar1");
const btnSelComp2 = document.getElementById("btnSelectComparar2");
const btnComp = document.getElementById("btnComparar");
const btnDescomp = document.getElementById("btnDescomparar");
const resultComp = document.getElementById("resultadoComparacao");
const compContainer = document.getElementById("comparadorContainer");
let pkmn1 = null;
let pkmn2 = null;
let pkmnAtual = null;

const coresTipos = {
    grass: "#63BB5B", fire: "#FF9C54", electric: "#ffd500", water: "#4D90D5",
    ground: "#ffc388", rock: "#C7B78B", fairy: "#EC8FE6", poison: "#AB6AC8",
    bug: "#90C12C", dragon: "#7766EE", psychic: "#F97176", flying: "#92AADE",
    fighting: "#CE4069", normal: "#969ea5", ghost: "#5269AC", steel: "#5A8EA1",
    dark: "#5A5366", ice: "#74CEC0"
};

function pegaPokemon(nome) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${nome.toLowerCase()}`)
        .then(resp => {
            if (!resp.ok) {
                alert("Pokemon nao achado!");
                return null;
            }
            return resp.json();
        })
        .then(data => {
            if (data) {
                mostraPokemonNaTela(data);
            }
        })
        .catch(err => {
            console.log("Erro:", err);
            alert("Deu erro ao buscar.");
        });
}

function mostraPokemonNaTela(dados) {
    pkmnAtual = dados;
    pkmnNome.textContent = dados.name.charAt(0).toUpperCase() + dados.name.slice(1);
    pkmnNum.textContent = dados.id;
    pkmnImg.src = dados.sprites.other["official-artwork"].front_default;
    pkmnImg.alt = dados.name;

    tiposImgs.innerHTML = "";
    tiposNomesImgs.innerHTML = "";
    let corTipo1 = "#DDD";
    if (dados.types.length > 0) {
        corTipo1 = coresTipos[dados.types[0].type.name] || "#DDD";
    }

    dados.types.forEach(t => {
        const tNome = t.type.name;
        const imgT = document.createElement("img");
        imgT.src = `imagens/tipos/Pokemon_Type_Icon_${tNome.charAt(0).toUpperCase() + tNome.slice(1)}.png`;
        imgT.alt = tNome;
        tiposImgs.appendChild(imgT);

        const imgNomeT = document.createElement("img");
        imgNomeT.src = `imagens/tipos-nomes/${tNome}_en.png`;
        imgNomeT.alt = tNome;
        tiposNomesImgs.appendChild(imgNomeT);
    });

    tipoTitulo.textContent = dados.types.length > 1 ? "Tipos" : "Tipo";


corFundo.style.backgroundColor = corTipo1;
caixaCor.style.border = `1px solid ${corTipo1}`;
caixaInfo.style.border = `1px solid ${corTipo1}`;
compPkmn1Div.style.borderColor = corTipo1;
compPkmn2Div.style.borderColor = corTipo1;
compContainer.style.borderColor = corTipo1;


const botoesPrincipais = [btnComp, btnDescomp];
botoesPrincipais.forEach(btn => {
    btn.style.borderColor = corTipo1;
    btn.style.backgroundColor = corTipo1;
    btn.style.color = "#fff";
});


const botoesSecundarios = [botaoShiny, botaoNormal, btnSelComp1, btnSelComp2];
botoesSecundarios.forEach(btn => {
    btn.style.borderColor = corTipo1;
    btn.style.backgroundColor = corTipo1;
    btn.style.color = "#fff";
});

    let total = 0;
    dados.stats.forEach(s => {
        total += s.base_stat;
    });
    statsTotal.textContent = total;
}

formBusca.addEventListener("submit", (e) => {
    e.preventDefault();
    const v = inputBusca.value.trim();
    if (v) {
        pegaPokemon(v);
    }
    inputBusca.value = "";
});

botaoShiny.addEventListener("click", () => {
    if (pkmnAtual) {
        pkmnImg.src = pkmnAtual.sprites.other["official-artwork"].front_shiny;
    }
});

botaoNormal.addEventListener("click", () => {
    if (pkmnAtual) {
        pkmnImg.src = pkmnAtual.sprites.other["official-artwork"].front_default;
    }
});

function carregaLista() {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=2000")
        .then(r => r.json())
        .then(d => {
            listaPkmn.innerHTML = "";
            d.results.forEach(p => {
                const li = document.createElement("li");
                li.classList.add("pokemon-list-item");

                const img = document.createElement("img");
                const id = p.url.split("/")[6];
                img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
                img.classList.add("pokemon-image-list");
                img.alt = p.name;

                const span = document.createElement("span");
                span.textContent = p.name.charAt(0).toUpperCase() + p.name.slice(1);
                span.classList.add("pokemon-name-list");

                li.addEventListener("click", () => {
                    pegaPokemon(p.name);
                });

                li.appendChild(img);
                li.appendChild(span);
                listaPkmn.appendChild(li);
            });
        })
        .catch(err => {
            console.log("Erro lista:", err);
            listaPkmn.innerHTML = "<li>Erro!</li>";
        });
}

function limpaComp() {
    pkmn1 = null;
    pkmn2 = null;
    compPkmn1Div.textContent = "Selecione o 1º Pokémon";
    compPkmn2Div.textContent = "Selecione o 2º Pokémon";
    resultComp.textContent = "";
    btnComp.disabled = true;
    btnComp.style.display = "inline-block";
    btnDescomp.style.display = "none";
}

btnSelComp1.addEventListener("click", () => {
    if (pkmnAtual) {
        pkmn1 = pkmnAtual.name;
        compPkmn1Div.textContent = `1: ${pkmnAtual.name.charAt(0).toUpperCase() + pkmnAtual.name.slice(1)}`;
        if (pkmn1 && pkmn2) {
            btnComp.disabled = false;
        }
    } else {
        alert("Escolhe um pokemon antes!");
    }
});

btnSelComp2.addEventListener("click", () => {
    if (pkmnAtual) {
        pkmn2 = pkmnAtual.name;
        compPkmn2Div.textContent = `2: ${pkmnAtual.name.charAt(0).toUpperCase() + pkmnAtual.name.slice(1)}`;
        if (pkmn1 && pkmn2) {
            btnComp.disabled = false;
        }
    } else {
        alert("Escolhe um pokemon antes!");
    }
});

btnComp.addEventListener("click", () => {
    resultComp.textContent = "Comparando...";

    Promise.all([
        fetch(`https://pokeapi.co/api/v2/pokemon/${pkmn1}`).then(res => res.json()),
        fetch(`https://pokeapi.co/api/v2/pokemon/${pkmn2}`).then(res => res.json())
    ]).then(([d1, d2]) => {
        let total1 = 0;
        d1.stats.forEach(s => total1 += s.base_stat);
        let total2 = 0;
        d2.stats.forEach(s => total2 += s.base_stat);

        let res = "";
        const n1 = d1.name.charAt(0).toUpperCase() + d1.name.slice(1);
        const n2 = d2.name.charAt(0).toUpperCase() + d2.name.slice(1);

        if (total1 > total2) {
            res = `${n1} (${total1}) eh mais forte que ${n2} (${total2}).`;
        } else if (total2 > total1) {
            res = `${n2} (${total2}) eh mais forte que ${n1} (${total1}).`;
        } else {
            res = `${n1} (${total1}) e ${n2} (${total2}) tem a mesma força.`;
        }
        resultComp.textContent = res;
        btnComp.style.display = "none";
        btnDescomp.style.display = "inline-block";

    }).catch(err => {
        console.log("Erro comparar:", err);
        resultComp.textContent = "Erro ao comparar.";
    });
});

btnDescomp.addEventListener("click", () => {
    limpaComp();
});

pegaPokemon("1");
carregaLista();
limpaComp();

document.addEventListener('DOMContentLoaded', function () {
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function (event) {
            event.preventDefault();
            const dropdownMenu = this.nextElementSibling;

            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                if (menu !== dropdownMenu) {
                    menu.style.display = 'none';
                }
            });

            if (dropdownMenu.style.display === 'block') {
                dropdownMenu.style.display = 'none';
            } else {
                dropdownMenu.style.display = 'block';
            }
        });
    });

    window.addEventListener('click', function (event) {
        if (!event.target.matches('.dropdown-toggle')) {
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                menu.style.display = 'none';
            });
        }
    });
});

