document.addEventListener('DOMContentLoaded', () => {
	let specific_pokemons = [];
	let all_gens = [];
	let all_types = [];
	let all_pokemons = [];

	get_specific_pokemons();
	get_all_types();
	get_all_gens();
	get_all_pokemons();

	document.querySelector(".reset-button").addEventListener("click", reset_cards);
	document.querySelector(".generate-button").addEventListener("click", generate_team);
	document.querySelector("#gen-setter").addEventListener("change", change_gen);
	// document.querySelector("#order-update").addEventListener("change", change_order);
});
