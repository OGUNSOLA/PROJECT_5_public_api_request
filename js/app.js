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
    people.forEach(person =>{
        eachPerson = `<div class="card">
        <div class="card-img-container">
            <img class="card-img" src=${person.picture.thumbnail} alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${person.name.first} ${person.name.last}</h3>
            <p class="card-text">${person.email}</p>
            <p class="card-text cap">${person.location.city}, ${person.location.state}</p>
        </div>
        </div>`;
           galley.insertAdjacentHTML('afterbegin', eachPerson);
        
    });
}

const card = document.querySelectorAll('.card');
console.log(card)

