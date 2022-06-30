/* fetch is promise kind method that will be used with then()
    but we cant use catch because fetch never really fail and it will 
        always success even if the result is 404 error it will success 
            the way that we can see that our response is successful is that
                we use res.ok */

// this fetch is for getting for an api

/* in the first then() method if we console.log() the response 
    it will not show the users because the users are not converted into json
        so we need to use res.json() to convert the data to json
            so we can see the data and the res.json() itself is 
                a promise method and we must use then for it */
                
fetch('https://reqres.in/api/users')
    .then( (res) => {

        if (res.ok){

            console.log('success');
        }else {

            console.log('failed');
        }

        return res.json();
    })
    .then( (data) => {
        
        for (let i=0; i < data['data'].length; i++){

            let img = document.createElement('img');
            img.src = data['data'][i]['avatar'];
            document.querySelector('.container-1').appendChild(img);        
        }
    })

// fetch api post

/* in the case of using fetch() for posting a data to api we must first
    define the methopd is post then what matters is we must define
        headers of Content-Type: application/json and then we must write
            the body of what we are posting and we must convert it to json 
                so we use json.stringify on the object */

fetch('https://reqres.in/api/users' , {

    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({

        name: 'User_1'
    },)
}).then( (res) => {

    return res.json();
}).then( (data) => console.log(data))