// Challenge 1 : ageInDays

function ageReset(){

    if (document.getElementById('age_h2') != null){

        document.getElementById('age_h2').remove();
    }
}

function ageInDays(){

    var birthYear = prompt("What Year Were You Born ?");

    if (document.getElementById('age_h2') != null){

        document.getElementById('age_h2').remove();
        var result = (2022 - birthYear) * 360;
        var h2 = document.createElement('h2');
        var nodeResult = document.createTextNode("You Are " + result + " days old.");
        h2.setAttribute('id' , 'age_h2');
        h2.appendChild(nodeResult);
        document.getElementById('ageText').appendChild(h2);
    }

    else {


        var result = (2022 - birthYear) * 360;
        var h2 = document.createElement('h2');
        var nodeResult = document.createTextNode("You Are " + result + " days old.");
        h2.setAttribute('id' , 'age_h2');
        h2.appendChild(nodeResult);
        document.getElementById('ageText').appendChild(h2);
    }

}

//Challenge 2: Cat Generator

function generateCat(){

    var img = document.createElement('img');
    img.setAttribute('src' , 'http://thecatapi.com/api/images/get?format=src&type=gif&size=small');
    document.getElementById('cat-div').appendChild(img);
}

//Challenge 3: Rock, Paper, Scissors

function botChoice(){

    var Choice = Math.floor(Math.random()*3)

    return ['rock' , 'paper' , 'scissors'][Choice];
}

function battleResult(HChoice , BChoice){

    var resultsDatabase = {

        "rock": {"rock": "0.5" , "paper": "0" , "scissors": "1"},
        "paper": {"rock": "1" , "paper": "0.5" , "scissors": "0"},
        "scissors": {"rock": "0" , "paper": "1" , "scissors": "0.5"}
    };

    return resultsDatabase[HChoice][BChoice];
}

function finalMessage(result){

    if (result === "1"){
        return {"message": "You Won!!" , "color": "green"};
    } else if (result === "0") {
        return {"message": "You Lost!!" , "color": "red"};
    } else{
        return {"message": "You Tied!!" , "color": "yellow"};
    }
}

function rpsFrontend(humanChoice , botChoice , Message){

    var Images = {

        "rock": document.getElementById("rock").src,
        "paper": document.getElementById("paper").src,
        "scissors": document.getElementById("scissors").src,
    };

    document.getElementById("rock").remove();
    document.getElementById("paper").remove();
    document.getElementById("scissors").remove();

    var humanDiv = document.createElement('div');
    var messageDiv = document.createElement('div');
    var botDiv = document.createElement('div');

    humanDiv.innerHTML = "<img src='" + Images[humanChoice] + "'>";
    messageDiv.innerHTML = "<h1 style='color:" + Message['color'] + "'>" + Message['message'] + "</h1>";
    botDiv.innerHTML = "<img src='" + Images[botChoice] + "'>";

    humanDiv.setAttribute('class' , 'human');
    botDiv.setAttribute('class' , 'bot');
    document.getElementById("rpsParent").appendChild(humanDiv);
    document.getElementById("rpsParent").appendChild(messageDiv);
    document.getElementById("rpsParent").appendChild(botDiv);
}

function rpsGame(element){

    var HumanChoice = element.id;
    var BotChoice = botChoice();
    console.log(BotChoice);
    var BattleResult = battleResult(HumanChoice , BotChoice);
    console.log(BattleResult);
    var message = finalMessage(BattleResult);
    console.log(message);
    rpsFrontend(HumanChoice , BotChoice , message);
}

// Challenge 4: Change the Color of All Buttons

/* this will return an array that contains
     all the button tags in html */

var allBtns = document.getElementsByTagName('button');

var copyAllBtns = [];
for (let i=0; i < allBtns.length; i++){

    /* this will give us the second value of the button tags class
            [the bootstrap btn colors] */
    copyAllBtns.push(allBtns[i].classList[1]);
}

function buttonColorChange(element){

    if (element.value === 'red' ){

        changeColor('red');
    } else if(element.value === 'green'){

        changeColor('green');
    } else if(element.value === 'reset'){

        changeColor('reset');
    } else if(element.value === 'random'){

        changeColor('random');
    }
}

function changeColor(Choice){

    for (let i=0; i < allBtns.length; i++){

        allBtns[i].classList.remove(allBtns[i].classList[1]);

        if (Choice === 'red'){

            allBtns[i].classList.add('btn-danger');
        } else if (Choice === 'green'){

            allBtns[i].classList.add('btn-success');
        } else if (Choice === 'reset'){

            allBtns[i].classList.add(copyAllBtns[i]);
        } else if (Choice === 'random'){

            let allChoices = ['btn-primary' , 'btn-danger',
                'btn-success' , 'btn-warning'];

            randomNum = Math.floor(Math.random() * 4);
            allBtns[i].classList.add(allChoices[randomNum]);

        }
    }
}

// Challenge 5: Blackjack

let blackjackGame = {
    'you': {'scoreSpan': '#Your-BJ-result', 'div': '#yourBox' , 'score': 0},
    'dealer': {'scoreSpan': '#Dealer-BJ-result', 'div': '#dealerBox', 'score': 0},
    'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'K', 'J', 'Q', 'A'],
    'cardsMap': {'2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 10, 'Q': 10, 'K': 10, 'A': [1,11]},
    'wins': 0,
    'losses': 0,
    'draws': 0,
    'stand': false,
    'turnsOver': false,
}

const You = blackjackGame['you'];
const Dealer = blackjackGame['dealer'];
const Cards = blackjackGame['cards'];
const CardsMap = blackjackGame['cardsMap']; 

const hitSound = new Audio('static/sounds/swish.m4a');
const winSound = new Audio('static/sounds/cash.mp3');
const loseSound = new Audio('static/sounds/aww.mp3');

document.querySelector('#BJ-hitBtn').addEventListener('click' , BJHit);
document.querySelector('#BJ-dealBtn').addEventListener('click' , blackjackDeal);
document.querySelector('#BJ-standBtn').addEventListener('click' , dealerLogic);

function BJHit(){

    if (blackjackGame['stand'] === false){

        let card = randomCard();
        showCard(You , card);
        updateScore(You , card)
        showScore(You);
    }

}

function updateScore(Player , card){

    if (card === 'A'){

        if (Player['score'] + CardsMap[card][1] <= 21){

            Player['score'] += CardsMap[card][1];

        } else{

            Player['score'] += CardsMap[card][0];
        }
        
    } else{

        Player['score'] += CardsMap[card];
    }
}

function showScore(Player){

    if (Player['score'] > 21){

        document.querySelector(Player['scoreSpan']).textContent = 'BUST!';
        document.querySelector(Player['scoreSpan']).style.color = 'red';

    } else {

        document.querySelector(Player['scoreSpan']).textContent = Player['score'];
    }
}

function randomCard(){

    let randomChoice = Math.floor(Math.random() * 13);

    return Cards[randomChoice];
}

function showCard(Player , Card){

    if (Player['score'] <= 21){

        let cardImage = document.createElement('img');
        cardImage.setAttribute('src' , `static/images/${Card}.png`);
        document.querySelector(Player['div']).appendChild(cardImage);
        hitSound.play();
    }

}

function blackjackDeal(){

    if (blackjackGame['turnsOver'] === true){

        blackjackGame['stand'] = false;

        document.querySelector('#blackjack-result').textContent = "Let's Play";
        document.querySelector('#blackjack-result').style.color = 'black';

        let yourImages = document.querySelector(You['div']).querySelectorAll('img');
        let dealerImages = document.querySelector(Dealer['div']).querySelectorAll('img');

        for (let i=0; i < yourImages.length;i++){

            yourImages[i].remove();
        }

        for (let i=0; i < dealerImages.length;i++){

            dealerImages[i].remove();
        }

        You['score'] = 0;
        Dealer['score'] = 0;

        document.querySelector(You['scoreSpan']).textContent = 0;
        document.querySelector(You['scoreSpan']).style.color = '#FFFFFF';

        document.querySelector(Dealer['scoreSpan']).textContent = 0;
        document.querySelector(Dealer['scoreSpan']).style.color = '#FFFFFF';

        blackjackGame['turnsOver'] = true;
    }
    
}

function sleep(ms){

    return new Promise(resolve => setTimeout(resolve, ms));
}

async function dealerLogic(){


    blackjackGame['stand'] = true;

    while (Dealer['score'] < 16 ){

        let card = randomCard();
        showCard(Dealer, card);
        updateScore(Dealer , card);
        showScore(Dealer);
        await sleep(1000);
    }
  
    blackjackGame['turnsOver'] = true;
    showResult(computeWinner());

}

function computeWinner(){

    let winner;

    if (You['score'] <= 21){

        if (You['score'] < Dealer['score'] && Dealer['score'] > 21){

            winner = You;
        } else if (You['score'] < Dealer['score']){

            winner = Dealer;
        } else if (You['score'] === Dealer['score']){

            console.log('You Drew');
        } else if (Dealer['score'] < You['score']){

            winner = You;
        }
    } else if (You['score'] > 21 && Dealer['score']<= 21){

        winner = Dealer;
    }else if(You['score'] > 21 && Dealer['score'] > 21){
    
        console.log('You Drew');
    }

    return winner;
}

function showResult(winner){
    let message, messageColor;

    if (blackjackGame['turnsOver'] === true){

        if (winner === You){

            blackjackGame['wins'] ++;
            document.querySelector('#BJ-wins').textContent = blackjackGame['wins'];
            message = 'You Won!!';
            messageColor = 'green';
            winSound.play();
        } else if (winner === Dealer){
    
            blackjackGame['losses'] ++;
            document.querySelector('#BJ-losses').textContent = blackjackGame['losses'];
            message = 'You Lost!!';
            messageColor = 'red';
            loseSound.play();
        } else{
    
            blackjackGame['draws'] ++;
            document.querySelector('#BJ-draws').textContent = blackjackGame['draws'];
            message = 'You drew!!';
            messageColor = 'yellow'
        }
    
        document.querySelector('#blackjack-result').textContent = message;
        document.querySelector('#blackjack-result').style.color = messageColor;    

    }
}