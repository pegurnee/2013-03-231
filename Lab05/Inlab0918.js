function yellowToGreen() {
	var yellows = document.getElementsByClassName("yellow");
	for (var i = 0; i < yellows.length; i++) {
		yellows[i].style="background-color:#00FF00";
	};
};
function redToOrange() {
	var reds = document.getElementsByClassName("red");
	for (var i = 0; i < reds.length; i++) {
		reds[i].style="background-color:#FFA500";
	};
};
function blueToPurple() {
	var blues = document.getElementsByClassName("blue");
	for (var i = 0; i < blues.length; i++) {
		blues[i].style="background-color:#FF00FF";
	};
};
function whiteToGray() {
	var whites = document.getElementsByClassName("white");
	for (var i = 0; i < whites.length; i++) {
		whites[i].style="background-color:#C0C0C0";
	};
};
function resetColors() {
	var yellows = document.getElementsByClassName("yellow");
	for (var i = 0; i < yellows.length; i++) {
		yellows[i].style="background-color:#FFFF00";
	};
	var reds = document.getElementsByClassName("red");
	for (var i = 0; i < reds.length; i++) {
		reds[i].style="background-color:#FF0000";
	};
	var blues = document.getElementsByClassName("blue");
	for (var i = 0; i < blues.length; i++) {
		blues[i].style="background-color:#0000FF";
	};
	var whites = document.getElementsByClassName("white");
	for (var i = 0; i < whites.length; i++) {
		whites[i].style="background-color:#FFFFFF";
	};
};
