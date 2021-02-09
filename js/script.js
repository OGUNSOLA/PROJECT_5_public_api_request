function fetchData(url){
    return fetch(url)
    .then(res => res.json())
    .then(data => {
        const people = data.results;
        console.log(people);
        generateHTML(people);
    }    );
   
}

 fetchData('https://randomuser.me/api/?page=3&results=12&seed=abc&inc=name,gender,location,email,nat,picture,cell,dob');

//fetchData('https://randomuser.me/api/?page=3&results=10&seed=abc');

function generateHTML(people){
    const galley = document.getElementById('gallery');
    

    people.forEach(element => {
        let card = document.createElement('div');
        card.setAttribute('class', 'card');
        galley.insertAdjacentElement('afterbegin', card);
        card.insertAdjacentHTML('afterbegin','<div class="card-img-container"><img class="card-img" src="" alt="profile picture"></<div>' );
        card.insertAdjacentHTML('beforeend','<div class="card-info-container"><h3 id="name" class="card-name cap"></h3><p class="card-text"></p><p class="card-text cap"></p></<div>' );
        let imageContainer = document.querySelector('.card-img-container');
         let img = imageContainer.querySelector('.card-img');
         img.setAttribute('src', `${element.picture.large}`)
         let name = document.getElementById('name');
         let email = document.querySelectorAll('.card-text')[0];
         let city = document.querySelectorAll('.card-text')[1];
         name.innerText = `${element.name.first} ${element.name.last}`;
         email.innerText =`${element.email}`;
         city.innerText =`${element.location.city}`;
    
    });
    
    
}
