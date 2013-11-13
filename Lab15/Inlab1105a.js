/*
Name: Kevin Sikes
  EID: E00978012
  Project: Treasure Hunt programming project
  Date: 19 Oct 2009
  Class: COSC 231 SP09
  
*/

var xPos, yPos, score;
var horizontalDirection, verticalDirection;
var animationTimer, isRunning;
var podArray, podTimer, podHealth;
var gameOver;

var initialPodHealth = 60;

function startTimer()
{
	if (!isRunning)
	{
		// I originally set interval to 10 milliseconds and moved the image
		// 1 pixel per interval to effect a 10px/100ms speed, but since there
		// is a lot of computation going on, this theoretical limit is never
		// reached. Instead I increment by 2 pixels each interval to
		// compensate.
		animationTimer = setInterval('animateSprite()', 20);
		isRunning = true;
	}
}

function stopTimer()
{
	clearInterval(animationTimer);
	isRunning = false;
}

function initSprite()
{
	isRunning = false;
   podArray = new Array(10);
	podHealth = initialPodHealth;
	gameOver = false;

	// randomize initial position
	var image = document.getElementById("Sprite");
	var gameBoard = document.getElementById("GameBoard");
	var maxHeight = gameBoard.clientHeight - image.height;
	var maxWidth = gameBoard.clientWidth - image.width;
	xPos = Math.floor(Math.random() * maxWidth) + gameBoard.offsetLeft;
	yPos = Math.floor(Math.random() * maxHeight) + gameBoard.offsetTop;
	var theDiv = document.getElementById("SpriteBox");
	theDiv.style.left = xPos + "px";
	theDiv.style.top = yPos + "px";
	score = 100;

	// adjust max height and width for pods
	maxWidth = gameBoard.clientWidth - 15;
	maxHeight = gameBoard.clientHeight - 30;
	// create divs for pods
	for (i = 0; i < 10; i++)
	{
		theDiv = document.createElement("div");
		theDiv.className = "Pod";
		theDiv.style.left = 	(Math.floor(Math.random() * maxWidth) +
									 gameBoard.offsetLeft) + "px";
		theDiv.style.top = (Math.floor(Math.random() * maxHeight) +
								  gameBoard.offsetTop) + "px";
		podArray[i] = document.createElement("img");
		podArray[i].src="http://fc05.deviantart.net/fs39/i/2008/347/7/5/1UP_mushroom_design_by_mrockz.png";
		podArray[i].width = "30";
		podArray[i].height = "30";
		theDiv.appendChild(podArray[i]);
		gameBoard.appendChild(theDiv);
	}
	podTimer = setInterval('decayPods()', 1000);

}

function animateSprite()
{
	moveSprite(horizontalDirection, verticalDirection);
}

function direction(horz, vert)
{
	if (gameOver)
	{
		alert("Please reload the page to begin a new game.");
		return;
	}
	// update score
	score -= 5;
	document.getElementById("Score").innerHTML = "Score: " + score;

	if (score <= 0)
	{
		endGame("You ran out of moves.");
		return;
	}


	if (horz == 0 && vert == 0)
	{
		stopTimer();
		return;
	}

	// load the correct image based on the direction
	if (horz != horizontalDirection || vert != verticalDirection)
	{
		var image = document.getElementById("Sprite");
		var suffix = "";

		if (horz == -1 && vert == -1)
			suffix = "UpLeft";
		else if (horz == 0 && vert == -1)
			suffix = "Up";
		else if (horz == 1 && vert == -1)
			suffix = "UpRight";
		else if (horz == -1 && vert == 0)
			suffix = "Left";
		else if (horz == 1 && vert == 0)
			suffix = "Right";
		else if (horz == -1 && vert == 1)
			suffix = "DownLeft";
		else if (horz == 0 && vert == 1)
			suffix = "Down";
		else if (horz == 1 && vert == 1)
			suffix = "DownRight";

		if (score <= 20)
			suffix += "Red";

		image.src = "http://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Pac-Man.svg/200px-Pac-Man.svg.png";

		horizontalDirection = horz;
		verticalDirection = vert;
	}
	startTimer(); // checks isRunning
}

function moveSprite(horz, vert)
{
	var image = document.getElementById("Sprite");
	var gameBoard = document.getElementById("GameBoard");

	var maxVert = gameBoard.offsetTop + gameBoard.clientHeight - image.height;
	var maxHorz = gameBoard.offsetLeft + gameBoard.clientWidth - image.width;

	// the smoothest animation came at 10ms intervals, but 1 pixel was too
	// slow and 2 was too fast.  A little number theory helps us out.
	var multiplier = (((xPos + yPos) % 3) == 0) ? 1 : 2;
	xPos += multiplier * horz;
	yPos += multiplier * vert;

	if (xPos < gameBoard.offsetLeft || xPos > maxHorz ||
		 yPos < gameBoard.offsetTop || yPos > maxVert)
	{
		// hit a wall.  Game over!
		endGame("You hit a wall.");
		return;
	}

	//update the style member of the div with the new coordinates
	var theDiv = document.getElementById("SpriteBox");
	theDiv.style.left = xPos + "px";
	theDiv.style.top = yPos + "px";

	var podsConsumed = 0;
	// check coordinates of pods to see if we are within 30 pixels
	for (i = 0; i < 10; i++)
	{
		if (podArray[i].parentNode.style.visibility != "hidden")
		{
			deltaX = xPos - parseInt(podArray[i].parentNode.style.left);
			deltaY = yPos - parseInt(podArray[i].parentNode.style.top);
			if (Math.sqrt(deltaX * deltaX + deltaY * deltaY) <= 30)
			{
				// consume the pod
				podArray[i].parentNode.style.visibility = "hidden";
				podsConsumed++;
				score += podHealth;
				// added 10/31 to correct problem in which score was not
				// updated when consuming pod
				document.getElementById("Score").innerHTML = "Score: " + score;				
			}
		}
		else
			podsConsumed++;
	}
	if (podsConsumed == 10)
	{
		endGame("All pods consumed.  You win!");
	}
}

// IE vs. Mozilla key capture semantics adapted from
// http://www.irt.org/script/1214.htm

document.onkeydown = keyCapture;

function keyCapture(e)
{
	var keyCode;

	// IE doesn't receive the event as a parameter
	if (e != undefined && e.which != undefined)
		keyCode = e.which;
	else
		keyCode = window.event.keyCode;

	// check for arrow
	if (keyCode == 12 ||
			(keyCode >= 33 && keyCode <= 40) ||
			(keyCode >= 97 && keyCode <= 105))
	{
		// this is a valid direction key.

		switch (keyCode)
		{
		case 12: case 101: // stop
			direction(0, 0);
			break;

		case 37: case 100: // left arrow
			direction(-1, 0);
			break;

		case 39: case 102: // right arrow
			direction(1, 0);
			break;

		case 38: case 104: // up arrow
			direction(0, -1);
			break;

		case 40: case 98: // down arrow
			direction(0, 1);
			break;

		case 36: case 103: // upper left
			direction(-1, -1);
			break;

		case 33: case 105: // upper right
			direction(1, -1);
			break;

		case 35: case 97: // lower left
			direction(-1, 1);
			break;

		case 34: case 99: // lower right
			direction(1, 1);
			break;

		}
		return false; // do not continue event processing
	}
	return true; // continue event processing for keys we are not consuming
}

function decayPods()
{
	var newImageName = null;

	podHealth--;

	var podValueSpan = document.getElementById("PodValueText");
	podValueSpan.innerHTML = podHealth;
	if (podHealth <= initialPodHealth * .5)
		podValueSpan.style.color = "red";

	if (podHealth == 0)
	{
		// game over
		for (i = 0; i < 10; i++)
			podArray[i].parentNode.style.visibility = "hidden";

		endGame("All pods have decayed.");
	}
	else if (podHealth < initialPodHealth * .2)
		newImageName = "Pod20";
	else if (podHealth < initialPodHealth * .4)
		newImageName = "Pod40";
	else if (podHealth < initialPodHealth * .6)
		newImageName = "Pod60";
	else if (podHealth < initialPodHealth * .8)
		newImageName = "Pod80";

	if (newImageName != null)
	{
		for (i = 0; i < 10; i++)
			podArray[i].src = "http://ih2.redbubble.net/image.6378228.5104/sticker,375x360.u2.png";
	}
}

function endGame(reason)
{
	stopTimer();
	clearInterval(podTimer);
	gameOver = true;
	alert("Game Over: " + reason);
}