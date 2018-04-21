class Card {
  constructor(suit, sign, value) {
    this.suit = suit;
    this.sign = sign;
    this.value = value;
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
				deck.push(new Card(suit, card.name, card.value));
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
}

class Game {
  constructor() {
    this.deck = new Deck;
    this.user = [];
    this.computer = [];
  }
  round(){
    this.hit();
    this.computer.push(this.deck.cards.pop());
    this.hit();
    this.computer.push(this.deck.cards.pop());
  }
  hit(){
    this.user.push(this.deck.cards.pop());
    $('.user .score').text(`Score: ${this.score(this.user)}`);
  }
  score(cards){
    return cards.reduce((sum, card) => {
      return sum + card.value;
    }, 0)
  }
}

const playGame = ()=>{
  $('.play').hide();
  $('.game').show();
  const game = new Game;
  let user = $('.user');
  let userCards = $('.user ul');
  let computer = $('.computer');
  let computerCards = $('.computer ul');
  let hit = $('.hit');
  let stand = $('.stand');

  game.round();
  computerCards.append(`<li>${game.computer[0].cardStringifyed()}</li>`);
  game.user.forEach((card)=>{
    userCards.append(`<li>${card.cardStringifyed()}</li>`);
  })
  $('.hit').on('click', ()=>{
    game.hit();
    userCards.append(`<li>${game.user[game.user.length - 1].cardStringifyed()}</li>`);

  });
  console.log(game.deck);
  console.log(game.user);
  console.log(game.deck);
  console.log(game.user);
}

$(()=>{
  $('.play').on('click', ()=>playGame());
});
