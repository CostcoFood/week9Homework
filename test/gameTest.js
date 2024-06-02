const { expect } = require('chai');
const { CArd, Deck, Player, Game } = require('../warGame');

describe('Card Class', () => {
    it('should create a card with correct suit and rank', () => {
        const card = new Card('Hearts', 'Ace');
        expect(card.suit).to.equal('Hearts');
        expect(card.rank).to.equal('Ace');
        expect(card.value).to.equal(14);
    });
});

describe('Deck Class', () => {
    it('should create a deck of 52 cards', () => {
        const deck = new Deck();
        expect(deck.cards).to.have.lengthOf(52);
    });

    it('should shuffle the deck', () => {
        const deck = new Deck();
        const originalDeck = [...deck.cards];
        deck.shuffle();
        expect(deck.cards).to.not.deep.equal(originalDeck);
    });

    it('should deal a card', () => {
        const deck = new Deck();
        deck.shuffle();
        const card = deck.dealOne();
        expect(card).to.be.an.instanceOf(Card);
        expect(deck.cards).to.have.lengthOf(51);
    });
});

describe('Player Class', () => {
    it('should create a player with a name', () => {
        const player = new Player('Player 1');
        expect(player.name).to.equal('Player 1');
        expect(player.hand).to.be.an('array').that.is.empty;
        expect(player.score).to.equal(0);
    });

    it('should add cards to player\'s hand', () => {
        const player = new Player('Player 1');
        const card = new Card('Hearts', 'Ace');
        player.addCards(card);
        expect(player.hand).to.have.lengthOf(1);
        expect(player.hand[0]).to.equal(card);
    });

    it('should play a card from player\'s hand', () => {
        const player = new Player('Player 1');
        const card = new Card('Hearts', 'Ace');
        player.addCards(card);
        const playedCard = player.playCard();
        expect(playedCard).to.equal(card);
        expect(player.hand).to.have.lengthOf(0);
    });
});

describe('Game Class', () => {
    it('should create a game with two players', () => {
        const game = new Game('Player 1', 'Player 2');
        expect(game.player1.name).to.equal('Player 1');
        expect(game.player2.name).to.equal('Player 2');
    });

    it('should deal 26 cards to each player', () => {
        const game = new Game('Player 1', 'Player 2');
        expect(game.player1.hand).to.have.lengthOf(26);
        expect(game.player2.hand).to.have.lengthOf(26);
    });

    it('should play a round and update scores correctly', () => {
        const game = new Game('Player 1', 'Player 2');
        game.playRound();
        expect(game.player1.score + game.player2.score).to.equal(1);  // Only one round played
    });

    it('should play the entire game and declare a winner', () => {
        const game = new Game('Player 1', 'Player 2');
        game.playGame();
        const totalScore = game.player1.score + game.player2.score;
        expect(totalScore).to.equal(26);
        expect(game.player1.score).to.not.equal(game.player2.score); // In most cases, there shouldn't be a tie
    });
});