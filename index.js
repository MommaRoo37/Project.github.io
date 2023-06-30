const appDiv = document.getElementById('app');
appDiv.innerHTML = `<h1>Coding Project - 5 card Poker</h1>`;
const draw = document.getElementById('draw');
draw.addEventListener('click', drawCards);

// ***************  Scope #1 ************************************************************
// Code Project: 5-card stud poker hand.

// Results = PokerHand(card1, card2, card3, card4, card5).
// 10 – Royal Flush
// 9 – Straight Flush
// 8 – Four-of-a-kind
// 7 - Full House
// 6 – Flush
// 5 – Straight
// 4 – three-of-a-kind
// 3 – two pairs
// 2 – pair
// 1 – high card

// Create an array of objects for each card in the deck
// as 2 - 14 with  #2-10 = #2-10, Jack = 11, Queen = 12, King = 13, Ace = 14

// ****************  Scope #2  ************************************************************
// Not only should the types of hands be ranked against one another, but the same type of hands need to be ranked.
// For example, a pair of Aces will be a pair of Kings. If two hands both have aces, highest card wins. If A full house with three Aces and two kings will be a full house with Three Kings and two queens. For flushes and straights, highest card wins.
// Create the 52 deck of cards

const deck = [
  { value: 2, suit: 'C' },
  { value: 3, suit: 'C' },
  { value: 4, suit: 'C' },
  { value: 5, suit: 'C' },
  { value: 6, suit: 'C' },
  { value: 7, suit: 'C' },
  { value: 8, suit: 'C' },
  { value: 9, suit: 'C' },
  { value: 10, suit: 'C' },
  { value: 11, suit: 'C' },
  { value: 12, suit: 'C' },
  { value: 13, suit: 'C' },
  { value: 14, suit: 'C' },

  { value: 2, suit: 'D' },
  { value: 3, suit: 'D' },
  { value: 4, suit: 'D' },
  { value: 5, suit: 'D' },
  { value: 6, suit: 'D' },
  { value: 7, suit: 'D' },
  { value: 8, suit: 'D' },
  { value: 9, suit: 'D' },
  { value: 10, suit: 'D' },
  { value: 11, suit: 'D' },
  { value: 12, suit: 'D' },
  { value: 13, suit: 'D' },
  { value: 14, suit: 'D' },

  { value: 2, suit: 'H' },
  { value: 3, suit: 'H' },
  { value: 4, suit: 'H' },
  { value: 5, suit: 'H' },
  { value: 6, suit: 'H' },
  { value: 7, suit: 'H' },
  { value: 8, suit: 'H' },
  { value: 9, suit: 'H' },
  { value: 10, suit: 'H' },
  { value: 11, suit: 'H' },
  { value: 12, suit: 'H' },
  { value: 13, suit: 'H' },
  { value: 14, suit: 'H' },

  { value: 2, suit: 'S' },
  { value: 3, suit: 'S' },
  { value: 4, suit: 'S' },
  { value: 5, suit: 'S' },
  { value: 6, suit: 'S' },
  { value: 7, suit: 'S' },
  { value: 8, suit: 'S' },
  { value: 9, suit: 'S' },
  { value: 10, suit: 'S' },
  { value: 11, suit: 'S' },
  { value: 12, suit: 'S' },
  { value: 13, suit: 'S' },
  { value: 14, suit: 'S' },
];

// Sort the deck
function identifyHand(cards) {
 
  // Sort the hand in ascending order 
  cards.sort((a, b) => (a.value > b.value ? 1 : -1));

  // Check the suit of the hand against each card
  const checkSuit = cards.every((card) => card.suit === cards[0].suit);

  // console.log(checkSuit);

  // Check if there is an Ace in the hand
  const checkAce = cards.some((card) => card.value === 14);

  // console.warn('Ace present', checkAce);

  // ROYAL FLUSH - Same Suit and 10, Jack, Queen, King, Ace
  const isRoyalFlush =
    checkSuit &&
    cards[0].value === 10 &&
    cards[1].value === 11 &&
    cards[2].value === 12 &&
    cards[3].value === 13 &&
    cards[4].value === 14;

  // STRAIGHT FLUSH - Same suit and any 5 consecutive numbers (excluding the 10-A as that is a Royal Flush)
  const isStraightFlush =
    checkSuit &&
    ((cards[0].value + 1 === cards[1].value &&
      cards[1].value + 1 === cards[2].value &&
      cards[2].value + 1 === cards[3].value &&
      cards[3].value + 1 === cards[4].value) ||
      checkAce);

  // Create card groupings to identify pairs
  let groupOne = [];
  let groupTwo = [];
  let groupThree = [];
  let groupFour = [];
  let groupFive = [];

  // For Each value in the array of cards -- loop through and check to see if there is a pair
  cards.forEach((card) => {
    if (groupOne.length == 0 || groupOne.includes(card.value)) {
      groupOne.push(card.value);
    } else if (groupTwo.length == 0 || groupTwo.includes(card.value)) {
      groupTwo.push(card.value);
    } else if (groupThree.length == 0 || groupThree.includes(card.value)) {
      groupThree.push(card.value);
    } else if (groupFour.length == 0 || groupFour.includes(card.value)) {
      groupFour.push(card.value);
    } else {
      groupFive.push(card.value);
    }
  });

  // console.log('Group One', groupOne);
  // console.log('Group Two', groupTwo);
  // console.log('Group Three', groupThree);
  // console.log('Group Four', groupFour);
  // console.log('Group Five', groupFive);

  // FOUR OF A KIND - Same value of card.
  const isFourOfAKind = groupOne.length === 4 || groupTwo.length === 4;
  // cards[0].value === cards[1].value &&
  // cards[1].value === cards[2].value &&
  // cards[2].value === cards[3].value;

  // THREE OF A KIND - Same value of card
  const isThreeOfAKind = groupOne.length === 3 || groupTwo.length === 3;

  // TWO PAIR - Any 2 pair of cards
  const isTwoPair =
    (groupOne.length === 2 && groupTwo.length === 2) ||
    (groupOne.length === 2 && groupThree.length === 2) ||
    (groupTwo.length === 2 && groupThree.length === 2);

  // ONE PAIR - Check for 1 pair
  const isPair =
    groupOne.length === 2 ||
    groupTwo.length === 2 ||
    groupThree.length === 2 ||
    groupFour.length === 2;

  // SAME SUIT FOR ALL CARDS
  const isFlush = checkSuit;

  // STRAIGHT - consecutive order of cards, but with different suits
  const isStraight =
    cards[0].value + 1 === cards[1].value &&
    cards[1].value + 1 === cards[2].value &&
    cards[2].value + 1 === cards[3].value &&
    cards[3].value + 1 === cards[4].value &&
    checkAce;

  // FULL HOUSE - 3 of a kind and 2 of a kind
  const isFullHouse =
    (groupOne.length === 2 || groupTwo.length === 2) &&
    (groupOne.length === 3 || groupTwo.length === 3);

  // Ranking Order based on cards
  if (isRoyalFlush) return 10;
  if (isStraightFlush) return 9;
  if (isFourOfAKind) return 8;
  if (isFullHouse) return 7;
  if (isFlush) return 6;
  if (isStraight) return 5;
  if (isThreeOfAKind) return 4;
  if (isTwoPair) return 3;
  if (isPair) return 2;
  return 1;
}

// Create hands 
var handArray = {
  hand1: [],
  hand2: [],
};

// Sort hands, reassign suit to be Decimal code image & value (11-14 ONLY) as J, Q, K, A
function generateCardFaces(hand) {
  const handElm = document.getElementById(`hand${hand}`);
  handElm.innerHTML = null;
  handArray['hand' + hand].sort((a, b) => (a.value > b.value ? 1 : -1));
  handArray['hand' + hand].forEach((x) => {
    let suitChar;
    let valueChar;
    switch (x.suit) {
      case 'S':
        suitChar = '&#9824;';
        break;
      case 'H':
        suitChar = '&#9829;';
        break;
      case 'D':
        suitChar = '&#9830;';
        break;
      case 'C':
        suitChar = '&#9827;';
        break;
    }

    switch (x.value) {
      case 11:
        valueChar = 'J';
        break;
      case 12:
        valueChar = 'Q';
        break;
      case 13:
        valueChar = 'K';
        break;
      case 14:
        valueChar = 'A';
        break;
      default:
        valueChar = x.value;
    }

    //
    const front = document.createElement('div');
    const suit = document.createElement('div');
    const value1 = document.createElement('div');
    const value2 = document.createElement('div');
    front.classList.add('front');
    suit.classList.add('suit');
    value1.classList.add('value1');
    value2.classList.add('value2');
    front.appendChild(value1);
    front.appendChild(suit);
    front.appendChild(value2);
    suit.innerHTML = suitChar;

    // Make
    if (x.suit === 'D' || x.suit === 'H') {
      front.classList.add('red');
    }
    value1.innerText = value2.innerText = valueChar;
    handElm.appendChild(front);
  });
}

function generateHands(hand) {
  handArray['hand' + hand] = [];
  for (let i = 0; i < 5; i++) {
    let card = genValues();
    if (
      handArray['hand' + hand].some(
        (x) => x.value === card.value || x.suit === card.value
      )
    ) {
      card = genValues();
      handArray['hand' + hand].push(card);
    } else {
      handArray['hand' + hand].push(card);
    }
  }
  generateCardFaces(hand);
}

// Randomly generates the card # value & suit listings
function genValues() {
  let value = Math.floor(Math.random() * 14) + 1;
  let suit = Math.floor(Math.random() * 4) + 1;
  let suitVal;
  switch (suit) {
    case 1:
      suitVal = 'S';
      break;
    case 2:
      suitVal = 'C';
      break;
    case 3:
      suitVal = 'D';
      break;
    case 4:
      suitVal = 'H';
      break;
  }
  return { value: value, suit: suitVal };
}

function drawCards() {
  const result = document.getElementById(`result`);
  generateHands(1);
  generateHands(2);

  const player1 = identifyHand(handArray.hand1);
  const player2 = identifyHand(handArray.hand2);
  console.log(player1, player2);
  if (player1 > player2) {
    result.innerText = 'Computer Wins!';
    console.log('Computer Wins!');
  } else if (player1 < player2) {
    result.innerText = 'YOU Win!';
    console.log('You Win!');
  } else {
    result.innerText = 'Draw';
    console.log('Draw');''
  }
}

drawCards();
