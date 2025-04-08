function get_site_root(secured = true) {
	if (window.location.hostname === 'localhost') {
		return 'http://localhost/travail/projets/pokegen';
	}

	if (!secured) {
		return 'https://pokegen.42web.io/';
	}

	return 'https://pokegen.42web.io/';
}

function get_medias_folder() {
	return `${get_site_root()}/medias`;
}

function get_pokemon_sprite(pokemon_id) {
	return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon_id}.png`;
}

function get_gen() {
	return document.getElementById('gen-getter').getAttribute('data-id');
}

function get_all_pokemons() {
	return new Promise((resolve, reject) => {
		fetch(`${get_medias_folder()}/files/pokemons.json`)
		.then((response) => response.json())
		.then((data) => {
			all_pokemons = process_pokemon_data(data);
			resolve(all_pokemons);
		})
		.catch((error) => {
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
		.then((response) => response.json())
		.then((data) => {
			specific_pokemons = [...data.names];
			resolve(specific_pokemons);
		})
		.catch((error) => {
			console.error('Error loading JSON:', error);
			reject(error);
		});
	});
}

function get_all_types() {
	return new Promise((resolve, reject) => {
		fetch(`${get_medias_folder()}/files/all_types.json`)
		.then((response) => response.json())
		.then((data) => {
			all_types = [...data.types];
			resolve(all_types);
		})
		.catch((error) => {
			console.error('Error loading JSON:', error);
			reject(error);
		});
	});
}

function get_all_gens() {
	return new Promise((resolve, reject) => {
		fetch(`${get_medias_folder()}/files/all_gens.json`)
		.then((response) => response.json())
		.then((data) => {
			all_gens = Object.values(data.gens);
			resolve(all_gens);
		})
		.catch((error) => {
			console.error('Error loading JSON:', error);
			reject(error);
		});
	});
}

function reset_cards() {
	const pokemon_cards = document.querySelector(".pokemon-details");
	pokemon_cards.innerHTML = `
		<h1>Current team</h1>
		<span id="detail-0" class="pokemon-detail unused">
			<h2>Empty placeholder</h2>
		</span>
		<span id="detail-1" class="pokemon-detail unused">
			<h2>Empty placeholder</h2>
		</span>
		<span id="detail-2" class="pokemon-detail unused">
			<h2>Empty placeholder</h2>
		</span>
		<span id="detail-3" class="pokemon-detail unused">
			<h2>Empty placeholder</h2>
		</span>
		<span id="detail-4" class="pokemon-detail unused">
			<h2>Empty placeholder</h2>
		</span>
		<span id="detail-5" class="pokemon-detail unused">
			<h2>Empty placeholder</h2>
		</span>
	`;
}

function copy_team() {
	const pokemon_elements = document.querySelectorAll('.pokemon-detail > .pokemon-infos > h2');
	
	if (pokemon_elements.length === 0) {
	  	return;
	}
	
	const pokemon_names = [];
	pokemon_elements.forEach((element) => {
		pokemon_names.push(element.innerHTML);
	});
	
	const text_to_copy = pokemon_names.join('\n\n');
	navigator.clipboard.writeText(text_to_copy);
}
