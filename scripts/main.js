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
}

class Player {
  constructor() {
    this.cards = [];
  }

  score(){
    return this.cards.reduce((sum, card) =>  sum + card.value, 0)
  }

  hasAce(){
    return this.cards.some((elem)=> elem.value === 'Ace');
  }
}

class Game {
  constructor() {
    this.deck = new Deck;
    this.user = [];
    this.computer = [];
    this.userScore = false;
    this.dealerAce = false;
    this.start();
  }

  start(){
    $('.play').hide();
    $('.game').show();
  }

  playAgain(){
    if (this.deck.length < 16) {
      this.deck.shuffle();
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
    this.computer.push(this.drawCard());
    this.hit();
    this.computer.push(this.drawCard());
    $('.computer .score').text(`Score: ${this.computer[0].value}`);
    $('.computer p').append(`<strong>${this.computer[0].cardStringifyed()}</strong>`);
    $('.computer .cardsdeck').append(`<img src="images/PNG/${this.computer[0].image}.png" alt="${this.computer[0].image}">`);

  }

  hit(){
    let card = this.drawCard();
    if (card.sign === 'Ace') {
      console.log('its asssssssssssse!!!!!!!!!!!!!!!');
      this.userAce = true;
    }
    this.user.push(card);
    $('.user p').append(`<strong>${card.cardStringifyed()}</strong>`);
    $('.user .cardsdeck').append(`<img src="images/PNG/${card.image}.png" alt="${card.image}">`);
    let score = this.score(this.user);
    $('.user .score').text(`Score: ${score} ${this.userAce ? `or ${score + 10}` : ``} `);

    if(score > 21){
      this.gameOver();
    }
  }

  score(cards){
    return cards.reduce((sum, card) => {
      return sum + card.value;
    }, 0)
  }

  gameOver(){
    let playerScore = this.score(this.user);
    let computerScore = this.score(this.computer);
    let result;
    if (playerScore > 21) {
      result = 'Player loose!';
    } else if (computerScore > 21 || playerScore > computerScore) {
      result = 'Player win!';
    } else if (playerScore === computerScore){
      result = 'No winners!'
    } else if (playerScore < computerScore) {
      result = 'Player loose!';
    }
    $('.result').append(result);
    $(':button').hide();
    $('.again').show();
    this.user = [];
    this.computer = [];
  }

  stand(){
    if (this.userAce && this.score(this.user) < 11) {

    }
    $('.computer p').append(`<strong>${this.computer[1].cardStringifyed()}</strong>`);
    $('.computer .cardsdeck').append(`<img src="images/PNG/${this.computer[1].image}.png" alt="${this.computer[1].image}">`);
    $('.computer .score').text(`Score: ${this.score(this.computer)}`);
    while(this.score(this.computer) < 17){
      let card = this.drawCard();
      this.computer.push(card);
      $('.computer .score').text(`Score: ${this.score(this.computer)}`);
      $('.computer p').append(`<strong>${card.cardStringifyed()}</strong>`);
      $('.computer .cardsdeck').append(`<img src="images/PNG/${card.image}.png" alt="${card.image}">`);

    }
    this.gameOver();
  }
}

const playGame = ()=>{
  let game = new Game;
  let hit = $('.hit');
  let stand = $('.stand');
  let again = $('.again');
  again.on('click', ()=>{
    game.playAgain();
  });

  game.round();
  $('.hit').on('click', ()=>{
    game.hit();
  });

  stand.on('click', ()=>{
    hit.hide();
    game.stand();
  })
}

$(()=>{
  $('.play').on('click', ()=>playGame());
});
