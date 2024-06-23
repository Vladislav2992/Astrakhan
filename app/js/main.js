const tariffsSwiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  spaceBetween: 20,
  loop: true,
  autoplay: true,
  speed: 2000,
  breakpoints: {
    600: {
      slidesPerView: 2,
    },
    900:{
      slidesPerView: 3,
    },
  },
  pagination: {
    el: ".swiper-pagination",
  },
});
const partnersSwiper = new Swiper(".partner-swiper", {
  slidesPerView: 2,
  spaceBetween: 20,
  loop: true,
  autoplay: true,
  speed: 2000, 
  pagination: {
    el: ".swiper-pagination",
  }, 
});

let center = [46.338612, 48.058350];
function init() {
  let map = new ymaps.Map('map', {
      center: center,
      zoom: 17,
      controls: []
  });

  var myGeoObject = new ymaps.GeoObject({
    geometry: {
        type: "Point",
        coordinates: center
    }
});

  map.geoObjects.add(myGeoObject);
}
ymaps.ready(init);

(function () {
  const burger = document.querySelector('.burger')
  const menu = document.querySelector('.menu')
  const menuItems = menu.querySelectorAll('li')

  menuItems.forEach(item => {    
      item.addEventListener('click', ()=>{
        console.log('click')
        menu.classList.remove('active');
        burger.classList.remove('active');
      })
    
  })

  burger.addEventListener('click', ()=>{
    if(!burger.classList.contains('active')){
      menu.classList.add('active');
      burger.classList.add('active');
    } else {
      menu.classList.remove('active');
      burger.classList.remove('active');
    }
  })
})();

function closeModal () {
  const closeButtons = document.querySelectorAll('.close-modal')
  const modal = document.querySelector('.modal-form')
  if(closeButtons.length > 0) {
    closeButtons.forEach(item => {
      item.addEventListener('click', (e)=>{
        e.stopPropagation()
        modal.classList.remove('active')
        document.querySelector('body').classList.remove('disabled')
      })
    })
  }
}
closeModal()

function openModal () {
  const openButtons = document.querySelectorAll('.open-modal')
  const modal = document.querySelector('.modal-form')
  if (openButtons.length > 0) {
    openButtons.forEach(item => {
      item.addEventListener('click', ()=> {
        modal.classList.add('active')
        document.querySelector('body').classList.add('disabled')
      })
    })
  }
}
openModal()

function sendForm () {
  const modal = document.querySelector('.modal-form')
  if (!modal) return false;
  const modalForm = modal.querySelector('#modal__form')
  const sendButton = modalForm.querySelector('.send-form-btn')
  const phone = modalForm.querySelector('[name="phone"]')
  const name = modalForm.querySelector('[name="name"]')
  const human = modalForm.querySelector('[name="human"]')
  
  modalForm.addEventListener('submit', async (e)=>{
    e.preventDefault()
    name.classList.remove('error')
    phone.classList.remove('error')

    if(human.value !== '') return false
    if(name.value == '') {
      name.classList.add('error')
    }
    
    if (phone.value.length < 12 && phone.value.length > 8) {
      let response = await fetch('/wp-content/themes/gc-astrakhan/inc/send-form.php', {
        method: 'POST',
        body: new FormData(modal__form),
      })
      .then(response => {
        if (response.ok) {
          phone.value = '';
          name.value = '';
          name.classList.remove('error');
          phone.classList.remove('error');
          modal.classList.add('send');
          setTimeout(()=>{
            modal.classList.remove('send');
            modal.classList.remove('active');
            document.querySelector('body').classList.remove('disabled')
        }, 4000)
          return response.text();
        } 
        else console.log(response);
      })
    
      .then(result =>{            
        console.log(result);        
      })
    }  else {
      phone.classList.add('error')
    }  
  })
}
sendForm()