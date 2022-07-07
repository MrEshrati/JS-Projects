const form = document.querySelector('#myForm');

form.addEventListener('submit' , function(e){

    e.preventDefault();
    
    const formData = new FormData(this);

    fetch('login.php' , {

        method: 'POST',
        body: formData
    }).then(function(response){

        return response.text();
    }).then(function(text){

        console.log(text);
    }).catch(function(error){

        console.log(error);
    })
    

})