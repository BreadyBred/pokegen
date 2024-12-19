document.addEventListener('DOMContentLoaded', () => {
	document.querySelector('.reroll-button').addEventListener('mouseenter', () => {
		document.querySelector('.reroll-button').src = 'medias/images/content/button_hover.png';
	});
	
	document.querySelector('.reroll-button').addEventListener('mouseleave', () => {
		document.querySelector('.reroll-button').src = 'medias/images/content/button_background.png';
	});
});