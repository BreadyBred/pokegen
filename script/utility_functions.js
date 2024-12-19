var specific_pokemons = [];
get_specific_pokemons();

var all_types = [];
get_all_types();

var all_gens = [];
get_all_gens();

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