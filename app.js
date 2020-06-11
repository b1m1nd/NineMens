console.log('hi there')

const gameBoard = document.getElementById('gameBoard')
const dots = document.querySelectorAll('.dots')

let turn = 0
let playerOnePieces = 9
let playerTwoPieces = 9
let delPlayer = ''

const checkThree = (e, btn, player) => {
	let x = btn.attributes.cx.value
	let y = btn.attributes.cy.value
	let playerDots = document.querySelectorAll(`.${player}`)
	let xMatch = 0
	let yMatch = 0
	playerDots.forEach(dot => {
		if (dot.cx.baseVal.value == x) {
			xMatch++
		}
		if (dot.cy.baseVal.value == y) {
			yMatch++
		}
		if (xMatch >= 3 || yMatch >= 3) {
			delPlayer = player
			console.log(`${player} has 3'pimps `)
			return
		}
	})
	console.log(xMatch, yMatch)
	console.log(playerDots)
}

const playerOneAdd = (e, btn) => {
	btn.classList.replace('empty', 'playerOne')
	checkThree(e, btn, 'playerOne')
	playerOnePieces--
	turn = 1
	console.log(`Its Turn:${turn}, playerOne: ${playerOnePieces}, playerTwo: ${playerTwoPieces} Del ${delPlayer}`)
}

const playerOneMove = (e, btn, ...args) => {
	btn.classList.replace('playerOne', 'empty')
	playerOnePieces++
}

const playerOneDel = (e, btn, ...args) => {
	btn.classList.replace('playerOne', 'empty')
	delPlayer
}

const playerTwoAdd = (e, btn, ...args) => {
	btn.classList.replace('empty', 'playerTwo')
	checkThree(e, btn, 'playerTwo')
	playerTwoPieces--
	turn = 0
	console.log(`Its Turn:${turn}, playerOne: ${playerOnePieces}, playerTwo: ${playerTwoPieces} Del ${delPlayer}`)
}

const playerTwoMove = (e, btn, ...args) => {
	btn.classList.replace('playerTwo', 'empty')
	playerTwoPieces++
}
const playerTwoDel = (e, btn, ...args) => {
	btn.classList.replace('playerTwo', 'empty')
	delPlayer = ''
}

gameBoard.addEventListener('click', e => {
	let btn = e.target.closest('circle')
	if (!btn) return

	//check if empty
	if (btn.classList.contains('empty')) {
		if (playerOnePieces > 0 || playerTwoPieces > 0) {
			turn === 0 ? playerOneAdd(e, btn) : playerTwoAdd(e, btn)
			return
		}
	} else if (btn.classList.contains('playerOne')) {
		if (turn === 0) {
			playerOneMove(e, btn)
		}
	} else {
		if (turn === 1) {
			playerTwoMove(e, btn)
		}
	}
})

// check3s(e, btn, player) {e get all player dots, match x or y coords >= 3 } if 3's changeGameState(replace player, empty)

// get all $player $dots that match $btn x or y cords
