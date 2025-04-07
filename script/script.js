document.addEventListener('DOMContentLoaded', () => {
	let specific_pokemons = [];
	let all_gens = [];
	let all_types = [];
	let all_pokemons = [];

	get_specific_pokemons();
	get_all_types();
	get_all_gens();
	get_all_pokemons();

	// document.querySelector('.roll-button').addEventListener('mouseenter', () => {
	// 	document.querySelector('.roll-button').src = 'medias/images/content/button_hover.png';
	// });
	
	// document.querySelector('.roll-button').addEventListener('mouseleave', () => {
	// 	document.querySelector('.roll-button').src = 'medias/images/content/button_background.png';
	// });
});