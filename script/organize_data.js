// function enable_single_roll() {
// 	document.querySelectorAll(".pokemon-case").forEach((element) => {
// 		element.addEventListener("click", roll_single_pokemon);
// 	});
// }

function generate_team(event) {
	const button = event.currentTarget
	button.disabled = true;
	const pokemon_ids = get_random_team_ids();
	// let i = 0;

	// document.querySelectorAll(".pokemon-case").forEach((pokemon_case) => {
	// 	pokemon_case.innerHTML = `
	// 		<img src="${get_pokemon_sprite(pokemon_ids[i])}" id="${i}" class="pokemon-sprites">
	// 	`;

	// 	display_pokemon_details(pokemon_ids[i], i);
	// 	i++;
	// });

	for (let i = 0; i < 6; i++) {
		display_pokemon_details(pokemon_ids[i], i);
	}

	setTimeout(() => {
		button.removeAttribute("disabled");
		// enable_single_roll();
	}, 500);
}

function roll_single_pokemon(event) {
	const pokemon_id = get_random_id(get_gen());
	const single_case = document.querySelector(`#case-${event.target.id}`);

	single_case.innerHTML = `
		<img src="${get_pokemon_sprite(pokemon_id)}" id="${event.target.id}" class="pokemon-sprites">
	`;

	display_pokemon_details(pokemon_id, event.target.id);
}

function display_pokemon_details(pokemon_id, case_id) {
	function format_pokemon_name(name) {
        if (specific_pokemons.includes(name)) {
            return name.replace(/-/g, " ").replace(/\b\w/g, char => char.toUpperCase());
        } else {
            const index = name.indexOf("-");

            if (index !== -1) {
                return name.substring(0, index);
			}

            return name;
        }
	}

	function capitalize_first_letter(str) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}

	function stat_checker(stats) {
		const highest_value = Math.max(...stats.map(stat => stat.value));
		const lowest_value = Math.min(...stats.map(stat => stat.value));

		const highest_stats = stats
			.filter((stat) => stat.value === highest_value)
				.map((stat) => stat.name);

		const lowest_stats = stats
			.filter((stat) => stat.value === lowest_value)
				.map((stat) => stat.name);
	
		return {
			"lowest": lowest_stats,
			"highest": highest_stats
		};
	}

	function format_stat_name(stat_name) {
		switch(stat_name) {
			case "hp":
				return "HP";
			case "attack":
				return "Atk";
			case "defense":
				return "Def";
			case "special-attack":
				return "SpAtk";
			case "special-defense":
				return "SpDef";
			case "speed":
				return "SpD";
			default:
				return stat_name;
		}
	}

	const pokemon_detail_element = document.querySelector(`#detail-${case_id}`);
	pokemon_detail_element.style.opacity = 0;

	setTimeout(() => {
		const pokemon_infos = get_pokemon_infos(pokemon_id);
		pokemon_infos.name = pokemon_infos.name.toLowerCase();
		const stat_check = stat_checker(pokemon_infos.stats);
		const highest = stat_check["highest"];
		const lowest = stat_check["lowest"];

		const pokemon_details = `
		<span class="pokemon-infos">
			<h2>${capitalize_first_letter(format_pokemon_name(pokemon_infos.name))}</h2>
			<p><strong>No.:</strong> ${pokemon_infos.id}</p>
		</span>
		<table>
			${(() => {
				const chunks = [];
				for (let i = 0; i < pokemon_infos.stats.length; i += 3) {
				chunks.push(pokemon_infos.stats.slice(i, i + 3));
				}
				
				return chunks.map(chunk => `
				<tbody>
					${chunk.map(stat => {
					const real_stat_percent = stat.value * 100 / 180;

					let class_name = "";
					if (highest.includes(stat.name)) {
						class_name = "highest";
					} else if (lowest.includes(stat.name)) {
						class_name = "lowest";
					}

					let color = "";
					if (stat.value <= 30) {
						color = "low";
					} else if (stat.value <= 60) {
						color = "mid";
					} else if (stat.value <= 80) {
						color = "good";
					} else {
						color = "better";
					}

					return `
						<tr>
						<td class="${class_name}">${format_stat_name(stat.name)}:</td>
						<td>
							<span class="progress-container">
							<span class="progress-bar ${color}" style="width:${real_stat_percent}%" id="progress-bar"></span>
							</span>
						</td>
						</tr>
					`;
					}).join("")}
				</tbody>
				`).join("")
			})()}
		</table>
		<span class="sprites">
			<img src="${get_pokemon_sprite(pokemon_infos.id)}" id="${pokemon_infos.id}" alt="${capitalize_first_letter(pokemon_infos.name)}" title="${capitalize_first_letter(pokemon_infos.name)}" class="pokemon-sprite">
			<span class="type">
				${pokemon_infos.types.map((type) => `<img src="medias/images/types/${type}.png" class="type-sprites" alt="${type}">`).join("")}
			</span>
		</span>
	</span>`;
	
		if (pokemon_detail_element.classList.contains("unused")) {
			pokemon_detail_element.classList.remove("unused");
			pokemon_detail_element.classList.add("used");
		}
	
		// all_types.forEach((type) => {
		// 	pokemon_detail_element.classList.remove(type);
		// });
	
		// pokemon_detail_element.classList.add(pokemon_infos.types[0]);
	
		setTimeout(() => {
			pokemon_detail_element.style.opacity = "1";
		}, 300);
	
		pokemon_detail_element.innerHTML = pokemon_details;
	}, 300);
}

function get_pokemon_infos(pokemon_id) {
	const pokemon = all_pokemons[pokemon_id];

    return {
        name: pokemon.name,
        id: pokemon.id,
        types: pokemon.types,
        stats: Object.entries(pokemon.stats).map(([name, value]) => ({
            name,
            value
        }))
    };
}

function change_gen() {
	const selected_element = document.getElementById("gen_setter");
	const gen_getter = document.getElementById("gen_getter");
	gen_getter.setAttribute("data-id", selected_element.value);
}

function get_random_team_ids() {
    const ids = [];

    for (let i = 0; i < 6; i++) {
        ids.push(get_random_id(get_gen()));
	}

    return ids;
}

function get_random_id(gen) {
	if(gen < 1 || gen > 9) {
		return Math.floor(Math.random() * 1025) + 1;
	}

	min = parseInt(all_gens[gen-1][0]);
	max = parseInt(all_gens[gen-1][1]);
	
	return Math.floor(Math.random() * (max - min + 1) + min);
}

document.addEventListener("DOMContentLoaded", () => {
	document.querySelector(".generate-button").addEventListener("click", generate_team);
	document.querySelector("#gen-setter").addEventListener("change", change_gen);
	// document.querySelector("#order-update").addEventListener("change", change_order);
});
