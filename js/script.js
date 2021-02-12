const galley = document.getElementById('gallery');
const body = document.getElementsByTagName('body')[0];
let peopleArray =[];
let index=0;


function fetchData(url){
    return fetch(url)
    .then(res => res.json())
    .then(data => {
        const people = data.results;
        
        generateHTML(people);
        people.forEach(person => {
            peopleArray.push(person)});
    }    );
   
}



 fetchData('https://randomuser.me/api/?page=3&results=12&seed=abc&inc=name,gender,location,email,nat,picture,cell,dob');

//fetchData('https://randomuser.me/api/?page=3&results=10&seed=abc');

function generateHTML(people){


    for(let i=people.length-1; i>=0; i--){
        let card = document.createElement('div');
        card.setAttribute('class', 'card');
        galley.insertAdjacentElement('afterbegin', card);
        card.insertAdjacentHTML('afterbegin','<div class="card-img-container"><img class="card-img" src="" alt="profile picture"></<div>' );
        card.insertAdjacentHTML('beforeend','<div class="card-info-container"><h3 id="name" class="card-name cap"></h3><p class="card-text"></p><p class="card-text cap"></p></<div>' );
        let imageContainer = document.querySelector('.card-img-container');
         let img = imageContainer.querySelector('.card-img');
         img.setAttribute('src', `${people[i].picture.medium}`)
         let name = document.getElementById('name');
         let email = document.querySelectorAll('.card-text')[0];
         let city = document.querySelectorAll('.card-text')[1];
         name.innerText = `${people[i].name.first} ${people[i].name.last}`;
         email.innerText =`${people[i].email}`;
         city.innerText =`${people[i].location.city}`;
    }
    
    
}



const cardDiv = document.querySelectorAll('.card');

galley.addEventListener('click', (e)=>{
    const cardDiv = document.querySelectorAll('.card');
    for(let i=0; i< cardDiv.length; i++){
        
    
        if(e.target === cardDiv[i]){
           
            let overlay = document.createElement('div');
           let modal = document.createElement('div');
           let modalInfoContainer = document.createElement('div');
           let modalBtnContainer = document.createElement('div');

           overlay.setAttribute('class', "modal-container");
           modal.setAttribute('class', 'modal');
           modalInfoContainer.setAttribute('class', "modal-info-container");
           modalBtnContainer.setAttribute('class', "modal-btn-container");

           galley.insertAdjacentElement('afterend', overlay);
           overlay.insertAdjacentElement('beforeend', modal);

           modal.insertAdjacentHTML('beforeend', '<button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>');
           modal.insertAdjacentElement('beforeend', modalInfoContainer);

           modalBtnContainer.insertAdjacentHTML('afterbegin', '<button type="button" id="modal-prev" class="modal-prev btn">Prev</button>');
           modalBtnContainer.insertAdjacentHTML('beforeend', '<button type="button" id="modal-next" class="modal-next btn">Next</button>');

           
           modalInfoContainer.insertAdjacentHTML('beforeend', '<img class="modal-img" src="" alt="profile picture"></img>');
           modalInfoContainer.insertAdjacentHTML('beforeend', '<h3 id="name" class="modal-name cap">name</h3>');
           modalInfoContainer.insertAdjacentHTML('beforeend', '<p class="modal-text">email</p>');
           modalInfoContainer.insertAdjacentHTML('beforeend', '<p class="modal-text cap">city</p>');
           modalInfoContainer.insertAdjacentHTML('beforeend', '<hr>');
           modalInfoContainer.insertAdjacentHTML('beforeend', '<p class="modal-text">(555) 555-5555</p>');
           modalInfoContainer.insertAdjacentHTML('beforeend', '<p class="modal-text">123 Portland Ave., Portland, OR 97204</p>');
           modalInfoContainer.insertAdjacentHTML('beforeend', '<p class="modal-text">Birthday: 10/21/2015</p>');

           overlay.insertAdjacentElement('beforeend',modalBtnContainer )

           addData(i);



        }
    }

    
  
});



function addData(i){
    index =i;
    const image = document.querySelector('.modal-img');
    let modalName = document.querySelector('.modal-name');
    image.setAttribute('src', peopleArray[i].picture.medium);
    modalName.innerText = `${peopleArray[i].name.first} ${peopleArray[i].name.last} ` ;
    
}


body.addEventListener('click', (e)=>{
    const overlay  = document.querySelector('.modal-container');
    const close = document.getElementById('modal-close-btn');
   if(e.target === close){
       overlay.remove();
   }
})


body.addEventListener('click', (e)=>{
    const next = document.getElementById('modal-next');
    const prev = document.getElementById('modal-prev');

    if(e.target === next){
        if(index < peopleArray.length-1){
            index ++;
        }else {
            index=0;
        }
        
        addData(index);
    }

    if(e.target === prev){

        if(index > 0){
            index --;
        }else {
            index= peopleArray.length-1;
        }
        addData(index);
    }
})