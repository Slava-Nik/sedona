var navigation = document.querySelector(".navigation");
navigation.classList.remove("navigation--no-js");

var buttonOpen = document.querySelector(".toggle-menu");
var buttonClose = document.querySelector(".navigation__button-close");

buttonOpen.onclick = function(){
	menu.classList.remove('navigation--hidden');
}
buttonClose.onclick = function(){
	menu.classList.add('navigation--hidden');
}
