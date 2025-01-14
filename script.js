const log = (msg) => console.log(msg);

log('Hello World!');

const oGlobal = {
    deck : [],
    playerOneHand : [],
    playerTwoHand : [],
    playerOneScore : 0,
    playerTwoScore : 0
}

createDeck();
shuffleDeck();
log(oGlobal.deck);
dealCards();
playHighestCard();
announceWinner();

function createDeck() {
    log('createDeck()');

    const suites = ['Hearts', 'Diamonds', 'Cloves', 'Spades'];

    for(let suit of suites) {
        for(let i = 2; i <= 14; i++) {
            let name = '';
            if(i < 11) {
                name = i;
            } else if(i === 11) {
                name = 'Jack';
            } else if(i === 12) {
                name = 'Dame';
            } else if(i === 13) {
                name = 'King';
            } else if(i === 14) {
                name = 'Ace'
            }
            oGlobal.deck.push(createCard(suit, i, name));
        }
    }
}

function createCard(suit, value, name) {
    log('createCard()');
    const card = {
        suit : suit,
        value : value,
        name : `${name} of ${suit}`
    } 
    return card;
}

// Fisher Yates Shuffle
function shuffleDeck() {
    log('shuffleDeck()');
    for(let i = oGlobal.deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * i);
        const temp = oGlobal.deck[i];
        oGlobal.deck[i] = oGlobal.deck[j];
        oGlobal.deck[j] = temp;
    }
}

function dealCards() {
    log('dealCards()');

    for(let i = 0; i < 6; i++) {
        let card = oGlobal.deck.pop()
        oGlobal.playerOneHand.push(card);

        card = oGlobal.deck.pop()
        oGlobal.playerTwoHand.push(card);
    }
    log('---------------');
    log('Player One Hand');
    log('---------------');
    oGlobal.playerOneHand.forEach(card => log(card));
    log('---------------');
    log('Player Two Hand');
    log('---------------');
    oGlobal.playerTwoHand.forEach(card => log(card));
}

function playHighestCard() {
    log('playHighestCard()');
    oGlobal.playerOneHand = sortCardsByValue(oGlobal.playerOneHand);
    oGlobal.playerTwoHand = sortCardsByValue(oGlobal.playerTwoHand);

    for(let i = 0; i < 6; i++) {
        let playerOneHighest = oGlobal.playerOneHand.shift();
        let playerTwoHighest = oGlobal.playerTwoHand.shift();

        if(playerOneHighest.value > playerTwoHighest.value) {
            log('Player One wins the draw due to the highest card!');
            oGlobal.playerOneScore++;
        } else if(playerOneHighest.value < playerTwoHighest.value) {
            log('Player Two wins the draw due to the highest card!');
            oGlobal.playerTwoScore++;
        } else if(playerOneHighest.suit === 'Hearts') {
            log('Player One wins the draw as Hearts wins all standoffs!');
            oGlobal.playerOneScore++;
        } else if(playerTwoHighest.suit === 'Hearts') {
            log('Player Two wins the draw as Hearts wins all standoffs!');
            oGlobal.playerTwoScore++;
        } else {
            log('Draw!');
        }
    }
}

function sortCardsByValue(deck) {
    deck.sort((a, b) => b.value - a.value);
    return deck;
}

function announceWinner() {
    log('announceWinner()');
    if(oGlobal.playerOneScore > oGlobal.playerTwoScore) {
        log(`Player One wins! The score ended ${oGlobal.playerOneScore} - ${oGlobal.playerTwoScore}!`)
    } else if(oGlobal.playerOneScore < oGlobal.playerTwoScore) {
        log(`Player Two wins! The score ended ${oGlobal.playerOneScore} - ${oGlobal.playerTwoScore}!`)
    } else {
        log(`It's a draw! The score ended ${oGlobal.playerOneScore} - ${oGlobal.playerTwoScore}!`)
    }
}