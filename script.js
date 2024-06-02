class Card {
    constructor(suit, rank) {
        this.suit = suit;
        this.rank = rank;
        this.value = this.assignValue(rank);
    }

    assignValue(rank) {
        switch (rank) {
            case 'Jack':
                return 11;
            case 'Queen':
                return 12;
            case 'King':
                return 13;
            case 'Ace':
                return 14;
            default:
                return parseInt(rank);
        }
    }

    toString() {
        return `${this.rank} of ${this.suit}`;
    }
}

class Deck {
    constructor() {
        this.suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
        this.ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];
        this.cards = this.createDeck();
    }

    createDeck() {
        let deck = [];
        for (let suit of this.suits) {
            for (let rank of this.ranks) {
                deck.push(new Card(suit, rank));
            }
        }
        return deck;
    }

    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    dealOne() {
        return this.cards.pop();
    }
}

class Player {
    constructor(name) {
        this.name = name;
        this.hand = [];
        this.score = 0;
    }

    addCards(newCards) {
        if (Array.isArray(newCards)) {
            this.hand.push(...newCards);
        } else {
            this.hand.push(newCards);
        }
    }

    playCard() {
        return this.hand.shift();
    }

    hasCards() {
        return this.hand.length > 0;
    }

    toString() {
        return `${this.name} has ${this.hand.length} cards and ${this.score} points.`;
    }
}

class Game {
    constructor(player1Name, player2Name) {
        this.player1 = new Player(player1Name);
        this.player2 = new Player(player2Name);
        this.deck = new Deck();
        this.deck.shuffle();
        this.dealCards();
    }

    dealCards() {
        while (this.deck.cards.length > 0) {
            this.player1.addCards(this.deck.dealOne());
            this.player2.addCards(this.deck.dealOne());
        }
    }

    playRound() {
        const card1 = this.player1.playCard();
        const card2 = this.player2.playCard();

        console.log(`${this.player1.name} plays ${card1.toString()}`);
        console.log(`${this.player2.name} plays ${card2.toString()}`);

        if (card1.value > card2.value) {
            this.player1.score++;
            console.log(`${this.player1.name} wins the round`);
        } else if (card1.value < card2.value) {
            this.player2.score++;
            console.log(`${this.player2.name} wins the round`);
        } else {
            console.log("Round is a tie");
        }
    }

    playGame() {
        let roundNum = 0;
        while (this.player1.hasCards() && this.player2.hasCards()) {
            roundNum++;
            console.log(`Round ${roundNum}`);
            this.playRound();
            console.log(this.player1.toString());
            console.log(this.player2.toString());
            console.log("\n");
        }

        console.log("Game Over!");
        console.log(`${this.player1.name}'s score: ${this.player1.score}`);
        console.log(`${this.player2.name}'s score: ${this.player2.score}`);
        if (this.player1.score > this.player2.score) {
            console.log(`${this.player1.name} wins the game!`);
        } else if (this.player2.score > this.player1.score) {
            console.log(`${this.player2.name} wins the game!`);
        } else {
            console.log("The game is a tie!");
        }
    }
}

// Create a new game and play
const game = new Game("Player 1", "Player 2");
game.playGame();
