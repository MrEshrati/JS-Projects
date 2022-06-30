/* Promises are like the promising in the new world you promise
    to do something and it has 2 diffrent result you will resolve it
        that means you have done it or you will reject it wich means you 
            didnt do it */

const a = new Promise( (resolve , reject) => {

    /* this will always call the resolve and it means that 
        the promise is successful */

    let num = 1 + 1 ;

    if (num === 2){

        resolve('This is resolved');
    } else{

        reject('This is rejected');
    }
})   

/* then() means that if the promise is resolved do this
     and catch() means if the promise is rejected and failed 
        do this */

a.then((message) => {

    console.log(message);
}).catch((message) => {

    console.log(message);
})

// in this case it will always resolve 


/* we can have multiple promises and call them at the same time
    and the browser will not freeze or crash */

const FirstPromise = new Promise((resolve , reject) => {

    resolve('This is First Promise resolve');
})

const SecondPromise = new Promise((resolve , reject) => {

    resolve('This is Second Promise resolve');
})

const ThirdPromise = new Promise((resolve , reject) => {

    resolve('This is Third Promise resolve');
})

/* for running them at the same time we must use Promise.all()
    and we must give the list of the promises names then 
        it will return a list of promises results */

Promise.all([

    FirstPromise,
    SecondPromise,
    ThirdPromise,
]).then((messages) => {

    console.log(messages);
}).catch((messages) => {

    console.log(messages);
})

/* because of the promises are all returning resolves so 
    on the then() will print */

/* for running the then() or catch() methodes right after the
    first promise ending its job we must use Promise.race() 
        and it wilkl only return one message becuase it will
            only print the first promise result */
    
Promise.race([

    FirstPromise,
    SecondPromise,
    ThirdPromise,
]).then((message) => {

    console.log(message);
}).catch((message) => {

    console.log(message);
})   