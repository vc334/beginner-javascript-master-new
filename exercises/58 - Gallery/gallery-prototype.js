function Gallery(gallery) {
  console.log(gallery)
  if (!gallery) {
    throw new Error('No Gallery Found!');
  }
  this.gallery = gallery;

  // select the elements we need
  this.images = Array.from(gallery.querySelectorAll('img'));
  this.modal = document.querySelector('.modal');
  this.prevButton = modal.querySelector('.prev');
  this.nextButton = modal.querySelector('.next');


  // These are our event listeners

  images.forEach(image => image.addEventListener('click', (e) => showImage(e.currentTarget)));

// loop over each image

  images.forEach(image => {
    // attach an event listener for each image
    image.addEventListener('keyup', e => {
      // when that is keyup'd, check if it was enter
      if (e.key === 'Enter') {
        // if it was, show that image.
        showImage(e.currentTarget)
      };
    });
  });


  this.modal.addEventListener('click', handleClickOutside);


};

Gallery.prototype.openModal = function() {
    console.info('Opening Modal...');
    // First check if the modal is already open
    if(modal.matches('.open')) {
      console.info('Modal already open');
      return; //stop the function from opening
    }
    modal.classList.add('open');

    // Event listeners to be bound when we open the modal.

    window.addEventListener('keyup', handleKeyUp);
    nextButton.addEventListener('click', showNextImage);
    prevButton.addEventListener('click', showPrevImage);
  }

  function closeModal() {
    modal.classList.remove('open');
    // TODO: add event listeners for clicks and keyboard...
    window.removeEventListener('keyup', handleKeyUp);
    nextButton.removeEventListener('click', showNextImage);
    prevButton.removeEventListener('click', showPrevImage);
  }

  function handleClickOutside(e) {
    if(e.target === e.currentTarget) {
      closeModal();
    }
  }

  function handleKeyUp(event) {
    if (event.key === 'Escape') return closeModal();
    if (event.key === 'ArrowRight') return showNextImage();
    if (event.key === 'ArrowLeft') return showPrevImage();
  }

  function showNextImage() {
    showImage(currentImage.nextElementSibling || gallery.firstElementChild);
  }

  function showPrevImage() {
    showImage(currentImage.previousElementSibling || gallery.lastElementChild);
  }

  function showImage(el) {
    if(!el) {
      console.info('no image to show');
      return
    }

      // update the modal with this info
      console.log(el);
      this.querySelector('img').src = el.src
      this.querySelector('h2').textContent = el.title;
      this.querySelector('figure p').textContent = el.dataset.description;
      this.currentImage = el;
      openModal();
  }






// Use it on the page

const gallery1 = Gallery(document.querySelector('.gallery1'));
const gallery2 = Gallery(document.querySelector('.gallery2'));

console.log(gallery1, gallery2);
