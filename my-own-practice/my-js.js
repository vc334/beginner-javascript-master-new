function Gallery(gallery) {
	if (!gallery) {
		throw new Error('No Gallery Found!');
	}

	// select the elements that we need.

	const images = Array.from(gallery.querySelectorAll('img'));
	const modal = document.querySelector('.modal');
	const prevButton = document.querySelector('.prev');
	const nextButton = document.querySelector('.next');
	let currentImage;


	function handleKeyUp(event) {
		if (event.key === 'Escape') return closeModal();
		if (event.key === 'ArrowRight') showNextImage();
		if (event.key === 'ArrowLeft') return showPrevImage();
	}

	function openModal() {
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
	};

	function closeModal() {
    modal.classList.remove('open');
    // TODO: add event listeners for clicks and keyboard...
    window.removeEventListener('keyup', handleKeyUp);
    nextButton.removeEventListener('click', showNextImage);
    prevButton.removeEventListener('click', showPrevImage);
	}

	function showImage(el) {
	  if(!el) {
	  	console.info('No image to show!');
	  	return;	  
	  }
	
		console.log(el);
		modal.querySelector('img').src = el.src;
		modal.querySelector	('h2').textContent = el.title;
		modal.querySelector('figure p').textContent = el.dataset.description;
		currentImage = el;
		openModal();

	
};

	function showNextImage() {
		showImage(currentImage.nextElementSibling || gallery.firstElementChild);
	}

	function showPrevImage() {
		showImage(currentImage.previousElementSibling || gallery.lastElementChild);
	};



	function handleClickOutside(e) {
		if(e.target === e.currentTarget) {
			closeModal();
		}
	}

	//event listeners
images.forEach(image => image.addEventListener('click', (e) => showImage(e.currentTarget)));
modal.addEventListener('click', handleClickOutside);


};



const gallery1 = Gallery(document.querySelector(".gallery1"));
const gallery2 = Gallery(document.querySelector(".gallery2"));