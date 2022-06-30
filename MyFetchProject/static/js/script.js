fetch('https://reqres.in/api/users')
    .then( (res) => {

        return res.json();
    }).then( (data) => {

        for (let i = 0; i < data['data'].length; i++){

            let cardDiv = document.createElement('div');
            cardDiv.setAttribute('class' , 'container-1-card')
            let avatarDiv = document.createElement('div');
            avatarDiv.setAttribute('class' , 'avatarDiv');
            let avatar = document.createElement('img');
            avatar.src = data['data'][i]['avatar']
            avatarDiv.appendChild(avatar);

            let id = document.createElement('h6');
            id.textContent = `Id : ${data['data'][i]['id']}`
            let firstName = document.createElement('h6');
            firstName.textContent = `FirstName : ${data['data'][i]['first_name']}`
            let lastName = document.createElement('h6');
            lastName.textContent = `LastName : ${data['data'][i]['last_name']}`
            let email = document.createElement('h6');
            email.textContent = `Email : ${data['data'][i]['email']}`

            cardDiv.appendChild(avatarDiv);
            cardDiv.appendChild(id);
            cardDiv.appendChild(firstName);
            cardDiv.appendChild(lastName);
            cardDiv.appendChild(email);

            document.querySelector('.container-1').appendChild(cardDiv);

        }
    })