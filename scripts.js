var boneNumber, rollAmount, globalScore, roundScore, diceDOM
start()
document.querySelector('.btn-new').addEventListener('click', start); // przycisk START
document.querySelector('.btn-roll').addEventListener('click', function() { // przycisk RZUĆ KOSTKĄ
	if (gamePlaying) {
		var dice = Math.floor(Math.random() * 6) + 1;
		document.querySelector('#current-' + activePlayer).textContent = dice;
		diceDOM.src = 'dice-' + dice + '.png';
		diceDOM.style.display = 'block';
		if (dice !== 1) {
			roundScore += dice;
			document.querySelector('#current-' + activePlayer).textContent = roundScore;
		} else {
			nextPlayer();
		}
	}
});
document.querySelector('.btn-hold').addEventListener('click', function() { // przycisk DODAJ ROUNDSCORE
	if (gamePlaying) {
		globalScore[activePlayer - 1] += roundScore;
		document.querySelector('#score-' + activePlayer).textContent = globalScore[activePlayer - 1];
		if (globalScore[activePlayer - 1] >= 100) {
			finish();
		} else {
			nextPlayer();
		}
	}
});

function start() { // funkcja odpalajaca gre
	globalScore = [0, 0];
	activePlayer = 1;
	roundScore = 0;
	gamePlaying = true;
	diceDOM = document.querySelector('.dice')
	document.querySelector('.dice').style.display = 'none';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('score-2').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	document.getElementById('current-2').textContent = '0';
	document.getElementById('name-1').textContent = 'Gracz 1';
	document.getElementById('name-2').textContent = 'Gracz 2';
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-2-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-2-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.add('active');
};

function nextPlayer() { // funkcja zmieniajaca gracza
	roundScore = 0;
	document.querySelector('#current-' + activePlayer).textContent = roundScore;
	activePlayer === 1 ? activePlayer = 2 : activePlayer = 1;
	document.querySelector('.player-1-panel').classList.toggle('active');
	document.querySelector('.player-2-panel').classList.toggle('active');
};

function finish() { // funkcja konczaca gre
	document.querySelector('#name-' + activePlayer).textContent = 'Wygrałeś!';
	diceDOM.style.display = 'none';
	document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
	document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
	gamePlaying = false
};
