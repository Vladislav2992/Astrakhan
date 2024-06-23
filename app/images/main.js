const swiper = new Swiper(".mySwiper", {
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
  const modal = document.getElementById('modal-form')
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
  const openButtons = document.querySelectorAll('.open-madal')
  const modal = document.getElementById('modal-form')
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

function validationForm () {
  const modalForm = document.querySelector('.modal__form')
  const send = modalForm.querySelector('.send-form-btn')
  const phone = modalForm.querySelector('[name="phone"]')
  const name = modalForm.querySelector('[name="name"]')

  send.addEventListener('click', (e)=>{
    e.preventDefault()
    if (phone.value.length > 12 || phone.value.length < 10) {
      console.log('ok')
    }    
  })
}
validationForm()