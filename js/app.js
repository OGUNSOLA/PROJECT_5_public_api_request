const galley = document.getElementById('gallery');
const body = document.getElementsByTagName('body')[0];


let peopleArray =[];
let index=0;
let peopleIndex =0;

window.onload = (event )=>{
    fetchData('https://randomuser.me/api/?results=12&inc=name,gender,location,email,picture,cell,dob,nat&nat=ca,us');
}
function fetchData(url){
    return fetch(url)
    .then(res => res.json())
    .then(data => {
        const people = data.results;
        console.log(people);
        generateHTML(people);
        people.forEach(person => {
            peopleArray.push(person)});
    }    );
   
}

function generateHTML (people){
    let eachPerson;

    for(let i=people.length-1; i>=0; i--){
        eachPerson = `<div class="card">
        <div class="card-img-container">
            <img class="card-img" src=${people[i].picture.thumbnail} alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${people[i].name.first} ${people[i].name.last}</h3>
            <p class="card-text">${people[i].email}</p>
            <p class="card-text cap">${people[i].location.city}, ${people[i].location.state}</p>
        </div>
        </div>`;
           galley.insertAdjacentHTML('afterbegin', eachPerson);
    }
    
}

const cards = document.querySelectorAll('.card');
console.log(cards);

galley.addEventListener('click', (e)=>{
    const cards = document.querySelectorAll('.card');
    const img = document.querySelector('.card-img');
    const id = document.getElementById('name');
    const email = document.querySelectorAll('.card-text')[0];
    const city = document.querySelectorAll('.card-text')[1];

    for(let i=0;i< cards.length; i++){
        if(e.target === cards[i] || e.target === img || e.target === id || e.target === email || e.target === city){
            createModal(i);
        }
    }
   
})

function createModal(i){
    let birthday = peopleArray[i].dob.date.substr(0, 10);
    birthday= `${birthday.substr(8,2)}/${birthday.substr(5,2)}/${birthday.substr(2,2)}`;
    
    const overlay = `<div class="modal-container">
                        <div class="modal">
                            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                            <div class="modal-info-container">
                                <img class="modal-img" src="${peopleArray[i].picture.large}" alt="picture of ${peopleArray[i].name}">
                                <h3 id="name" class="modal-name cap">${peopleArray[i].name.first} ${peopleArray[i].name.last}</h3>
                                <p class="modal-text">${peopleArray[i].email}</p>
                                <p class="modal-text cap">${peopleArray[i].location.city}</p>
                                <hr> 
                                <p class="modal-text">${peopleArray[i].cell}</p>
                                <p class="modal-text">${peopleArray[i].location.street.number} ${peopleArray[i].location.street.name}, ${peopleArray[i].location.city} ${peopleArray[i].location.postcode}</p>
                                <p class="modal-text">Birthday: ${birthday}</p>
                            </div>
                        </div>

                        // IMPORTANT: Below is only for exceeds tasks 
                        <div class="modal-btn-container">
                            <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                            <button type="button" id="modal-next" class="modal-next btn">Next</button>
                        </div>
                    </div>`;

                galley.insertAdjacentHTML('afterend', overlay);
 }

 body.addEventListener('click', (event)=>{
    const closeX = document.getElementsByTagName('strong')[0];
    const closeButton = document.getElementById('modal-close-btn');
    const overlay  = document.querySelector('.modal-container');
    
    if(event.target === closeButton || event.target === closeX){
        overlay.remove();
    }
 });