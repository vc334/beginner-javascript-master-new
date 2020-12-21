function Slider(slider) {
  const slides = slider.querySelector('.slides');
  const prevButton = slider.querySelector('.goToPrev');
  const nextButton = slider.querySelector('.goToNext');

  let prev;
  let current;
  let next;

function startSlider() {
  current = slides.querySelector('.current') || slides.firstElementChild;
  prev = current.previousElementSibling || slides.lastElementChild;
  next = current.nextElementSibling || slides.firstElementChild;
  // console.log({current, prev, next});
}

function applyClasses() {
  prev.classList.add('prev');
  current.classList.add('current');
  next.classList.add('next');
}

function move(direction) {
  // remove the classes
  const classesToRemove = ['prev', 'current', 'next']; 
  prev.classList.remove(...classesToRemove);
  current.classList.remove(...classesToRemove);
  next.classList.remove(...classesToRemove);

  if(direction === 'back') {
    [prev, current, next] = [
    prev.previousElementSibling || slides.lastElementChild, 
    prev, current];
  } else {
    [prev, current, next] =
    [current, next, next.nextElementSibling || slides.firstElementChild
    ];
  }

  applyClasses();
}

//Start these functions when the slider is created
startSlider();
applyClasses();

prevButton.addEventListener('click', () => move('back'));
nextButton.addEventListener('click', move);


};


const mySlider = Slider(document.querySelector('.slider'));
const dogSlider = Slider(document.querySelector('.dog-slider'));