var specific_pokemons = [];
get_specific_pokemons();

var all_types = [];
get_all_types();

var all_gens = [];
get_all_gens();

var all_pokemons = [];
get_all_pokemons();

function get_site_root(secured = true) {
    if (window.location.hostname === 'localhost')
        return 'http://localhost/travail/projets/pokeshuffle';

    if (!secured)
        return 'http://pokeshuffle.freesite.online';

    return 'https://pokeshuffle.freesite.online';
}

function get_medias_folder() {
    return `${get_site_root()}/medias`;
}

function get_all_pokemons() {
    return new Promise((resolve, reject) => {
        fetch(`${get_medias_folder()}/files/pokemons.json`)
            .then(response => response.json())
                .then(data => {
                    all_pokemons = process_pokemon_data(data);
                    resolve(all_pokemons);
                })
                .catch(error => {
                    console.error('Error loading JSON:', error);
                    reject(error);
                });
    });
}

function process_pokemon_data(data) {
    const processed_pokemons = {};

    for (const id in data) {
        if (data.hasOwnProperty(id)) {
            const pokemon = data[id];
            processed_pokemons[id] = {
                id: pokemon.id,
                name: pokemon.name,
                types: pokemon.types,
                stats: pokemon.stats,
                gen: pokemon.gen
            };
        }
    }

    return processed_pokemons;
}

function get_specific_pokemons() {
    return new Promise((resolve, reject) => {
        fetch(`${get_medias_folder()}/files/specific_pokemons.json`)
            .then(response => response.json())
                .then(data => {
                    specific_pokemons = [...data.names];
                    resolve(specific_pokemons);
                })
                .catch(error => {
                    console.error('Error loading JSON:', error);
                    reject(error);
                });
    });
}

function get_all_types() {
    return new Promise((resolve, reject) => {
        fetch(`${get_medias_folder()}/files/all_types.json`)
            .then(response => response.json())
                .then(data => {
                    all_types = [...data.types];
                    resolve(all_types);
                })
                .catch(error => {
                    console.error('Error loading JSON:', error);
                    reject(error);
                });
    });
}

function get_all_gens() {
    return new Promise((resolve, reject) => {
        fetch(`${get_medias_folder()}/files/all_gens.json`)
            .then(response => response.json())
                .then(data => {
                    all_gens = Object.values(data.gens);
                    resolve(all_gens);
                })
                .catch(error => {
                    console.error('Error loading JSON:', error);
                    reject(error);
                });
    });
}