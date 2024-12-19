document.addEventListener('DOMContentLoaded', () => {
	let specific_pokemons = [];
	let all_gens = [];
	let all_types = [];
	let all_pokemons = [];

	get_specific_pokemons();
	get_all_types();
	get_all_gens();
	get_all_pokemons();

	document.querySelector('.reroll-button').addEventListener('mouseenter', () => {
		document.querySelector('.reroll-button').src = 'medias/images/content/button_hover.png';
	});
	
	document.querySelector('.reroll-button').addEventListener('mouseleave', () => {
		document.querySelector('.reroll-button').src = 'medias/images/content/button_background.png';
	});
});