let count = 1;
var btn = document.querySelector('#reqBtn');
btn.addEventListener('click' , function(){

    var myReq = new XMLHttpRequest();
    myReq.open('GET' , 'https://learnwebcode.github.io/json-example/animals-' + count + '.json');
    myReq.onload = function(){

        if (myReq.status >= 200 && myReq.status < 400){

            var myData = JSON.parse(myReq.responseText);
            frontendDesign(myData);

        } else{

            console.log('Our Servers Have Faced an Error!!!');
        }
    }
    myReq.onerror = function(){

        console.log('Connection to Servers Failed');
    }
    myReq.send();
    count++;

    if (count > 3){

        btn.setAttribute('style' , 'display: none;');
    }
});

function frontendDesign(data){

    var strings = '';

    for (i = 0; i < data.length;i++){

        strings += '<p>' + data[i].name + ' is a ' + data[i].species;

        for (j = 0; j < data[i].foods.likes.length;j++){

            if (j === 0){

                strings += ' that likes to eat ' + data[i].foods.likes[j];
            } else {

                strings += ' and ' + data[i].foods.likes[j];
            }
        }

        for (j = 0; j < data[i].foods.dislikes.length;j++){

            if (j === 0){

                strings += " and doesn't like to eat " + data[i].foods.dislikes[j];
            } else {

                strings += ' and ' + data[i].foods.dislikes[j];
            }
        }

        strings += '</p>';
    }

    document.querySelector('#animalInfo').insertAdjacentHTML('beforeend' , strings);
}