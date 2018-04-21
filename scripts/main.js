class Card {
  constructor(suit, sign, value, image) {
    this.suit = suit;
    this.sign = sign;
    this.value = value;
    this.image = image;
  }
  cardStringifyed(){
    return `${this.sign} of ${this.suit}`
  }
}

class Deck {
  constructor(){
		this.cards = this.shuffle();
	}

	createDeck(){
		const suits = ['Hearts', 'Diamonds' ,'Clubs' ,'Spades'];

		const cardValues = [{name: 'Ace', value: 1}, {name: 'Two', value: 2}, {name: 'Three', value: 3}, {name: 'Four', value: 4}, {name:'Five', value: 5}, {name:'Six', value: 6}, {name:'Seven', value: 7}, {name:'Eight', value: 8}, {name:'Nine', value: 9}, {name:'Ten', value: 10}, {name:'Jack', value: 10}, {name:'Queen', value: 10}, {name:'King', value: 10}];

		let deck = [];
		suits.forEach((suit)=>{
			for(let card of cardValues){
        let image;
        if ((card.value === 10 || card.value === 1) && card.name != 'Ten'){
          image = `${card.name[0]}${suit[0]}`;
        } else {
          image = `${card.value}${suit[0]}`;
        }
				deck.push(new Card(suit, card.name, card.value, image));
			}
		});
		return deck;
	}

	shuffle() {
		let deck = this.createDeck();
	  let i = 0
	    , j = 0
	    , temp = null;

	  for (i = deck.length - 1; i > 0; i -= 1) {
	    j = Math.floor(Math.random() * (i + 1));
	    temp = deck[i];
	    deck[i] = deck[j];
	    deck[j] = temp;
	  }
	  return deck;
	}

	drawCard(){
		return this.cards.pop();
	}

  cardCount(){
    return this.cards.length;
  }
}

class Player {
  constructor() {
    this.cards = [];
  }

  score(){
    return this.cards.reduce((sum, card) =>  sum + card.value, 0)
  }

  hasAce(){
    return this.cards.some((elem)=> elem.sign === 'Ace');
  }
}

class Game {
  constructor() {
    this.deck = new Deck;
    this.player = new Player;
    this.dealer = new Player;
    $('.play').hide();
    $('.game').show();
    this.round();
  }

  playAgain(){
    let numberOfCards = this.deck.cardCount();
    if (numberOfCards < 16) {
      this.deck = new Deck;
    }
    this.round();
  }

  drawCard(){
    return this.deck.cards.pop()
  }

  round(){
    $('.result').empty();
    $('.cards').empty();
    $('.hit').show();
    $('.stand').show();
    $('.again').hide();
    $('.score').empty();
    $('.cardsdeck').empty();
    this.hit();
    this.dealer.cards.push(this.drawCard());
    this.hit();
    this.dealer.cards.push(this.drawCard());
    $('.computer .score').text(`Score: ${this.dealer.cards[0].value}`);
    $('.computer p').append(`<strong>${this.dealer.cards[0].cardStringifyed()}</strong>`);
    $('.computer .cardsdeck').append(`<img src="images/PNG/${this.dealer.cards[0].image}.png" alt="${this.dealer.cards[0].image}">`);

  }

  hit(){
    let card = this.drawCard();
    this.player.cards.push(card);
    $('.user p').append(`<strong>${card.cardStringifyed()}</strong>`);
    $('.user .cardsdeck').append(`<img src="images/PNG/${card.image}.png" alt="${card.image}">`);
    let score = this.player.score();
    if (this.player.hasAce()) {
      $('.user .score').text(`Score: ${score} or ${score + 10}`);

    } else {
      $('.user .score').text(`Score: ${score}`);
    }

    if(score > 21){
      this.gameOver();
    } else if (score === 21) {
      this.stand();
    }
  }

  gameOver(){
    let playerScore = this.player.score();
    let dealerScore = this.dealer.score();
    let result;
    if (playerScore > 21) {
      result = 'Player loose!';
    } else if (dealerScore > 21 || playerScore > dealerScore) {
      result = 'Player win!';
    } else if (playerScore === dealerScore){
      result = 'No winners!'
    } else if (playerScore < dealerScore) {
      result = 'Player loose!';
    }
    $('.result').append(result);
    $(':button').hide();
    $('.again').show();
    this.player.cards = [];
    this.dealer.cards = [];
  }

  stand(){
    $('.hit').hide();
    if (this.player.hasAce() && this.player.score() < 11) {

    }
    $('.computer p').append(`<strong>${this.dealer.cards[1].cardStringifyed()}</strong>`);
    $('.computer .cardsdeck').append(`<img src="images/PNG/${this.dealer.cards[1].image}.png" alt="${this.dealer.cards[1].image}">`);
    $('.computer .score').text(`Score: ${this.dealer.score()}`);
    while(this.dealer.score() < 17){
      let card = this.drawCard();
      this.dealer.cards.push(card);
      $('.computer .score').text(`Score: ${this.dealer.score()}`);
      $('.computer p').append(`<strong>${card.cardStringifyed()}</strong>`);
      $('.computer .cardsdeck').append(`<img src="images/PNG/${card.image}.png" alt="${card.image}">`);

    }
    this.gameOver();
  }
}

const playGame = ()=>{

  let game = new Game;

  $('.hit').on('click', ()=> game.hit());
  $('.stand').on('click', ()=> game.stand());
  $('.again').on('click', ()=> game.playAgain());
}

$(()=> $('.play').on('click', ()=> playGame()));
