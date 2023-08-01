/**
 * !(i)
 * Код попадает в итоговый файл, только когда вызвана функция, например FLSFunctions.spollers();
 * Или когда импортирован весь файл, например import "files/script.js";
 * Неиспользуемый код в итоговый файл не попадает.

 * Если мы хотим добавить модуль следует его раскомментировать
 */
import MousePRLX from './libs/parallaxMouse'
import AOS from 'aos'
import Swiper, { Navigation, Pagination } from 'swiper';

import BaseHelpers from './helpers/BaseHelpers.js';
import PopupManager from './modules/PopupManager';
import BurgerMenu from './modules/BurgerMenu';
// import Tabs from './modules/Tabs';
// import Accordion from './modules/Accordion.js';

import Splide from './libs/splide.min.js';

BaseHelpers.checkWebpSupport();

BaseHelpers.addTouchClass();

BaseHelpers.addLoadedClass();

BaseHelpers.headerFixed();

/**
 * Открытие/закрытие модальных окон
 * Чтобы модальное окно открывалось и закрывалось
 * На окно повешай атрибут data-popup="<название окна>"
 * На кнопку, которая вызывает окно повешай атрибут data-type="<название окна>"

 * На обертку(.popup) окна добавь атрибут '[data-close-overlay]'
 * На кнопку для закрытия окна добавь класс '.button-close'
 * */
new PopupManager();

/**
 *  Модуль для работы с меню (Бургер)
 * */
// new BurgerMenu().init();

/**
 *  Библиотека для анимаций
 *  документация: https://michalsnik.github.io/aos
 * */
AOS.init();

/**
 * Параллакс мышей
 * */
new MousePRLX();

// new Tabs('tabs-example', {});

// new Accordion('.accordion', {
//   shouldOpenAll: false, // true
//   defaultOpen: [], // [0,1]
//   collapsedClass: 'open',
// });


// MENU FOR ALL PAGES

const navLinks = document.querySelectorAll('.menu__link');
const html = document.querySelector('html');

navLinks.forEach(function (navLink) {
  navLink.addEventListener('click', function (event) {
    const targetSectionId = this.getAttribute('href');

    if (targetSectionId.startsWith('#')) {
      // event.preventDefault();
      const targetSection = document.querySelector(targetSectionId);
      window.location.href = 'index.html' + targetSectionId;

      if (targetSection) {
        html.classList.remove('menu-open');
        html.classList.remove('lock');

        const offsetTop = targetSection.getBoundingClientRect().top - 100;
        window.scrollTo({
          top: window.pageYOffset + offsetTop,
          behavior: 'smooth'
        });
      }
    }
  });
});




var burgerMenu = document.querySelector('.icon-menu');

burgerMenu.addEventListener("click", () => {
  html.classList.toggle('menu-open');
  html.classList.toggle('lock');
});


try {
  var splide = new Splide('.splide', {
    updateOnMove: true,
    type: 'loop',
    perPage: 1,
    perMove: 1,
    interval: 10000,
    autoplay: true,
    arrows: false,
    pagination: true,
    drag: true,
    // wheel: true,
    // direction: 'ttb'
  });

  splide.mount();
} catch (e) { }




const mask = (selector) => {
  let setCursorPosition = (pos, elem) => {
    elem.focus();

    if (elem.setSelectionRange) {
      elem.setSelectionRange(pos, pos);
    } else if (elem.createTextRange) {
      let range = elem.createTextRange();

      range.collapse(true);
      range.moveEnd('character', pos);
      range.moveStart('character', pos);
      range.select();
    }
  };

  function createMask(event) {
    let matrix = 'XXX XXX XXX XX XX',
      i = 0,
      def = matrix.replace(/\D/g, ''),
      val = this.value.replace(/\D/g, '');

    if (def.length >= val.length) {
      val = def;
    }

    this.value = matrix.replace(/X/g, function (a) {
      return i < val.length ? val.charAt(i++) : '';
    });

    // Если нажата клавиша Backspace, курсор передвигается назад
    if (event.type === 'input' && event.inputType === 'deleteContentBackward') {
      setCursorPosition(this.value.length, this);
    }
  }

  function restorePlaceholder() {
    if (this.value.trim() === '') {
      this.value = 'XXX XXX XXX XX XX';
    }
  }

  let inputs = document.querySelectorAll(selector);

  inputs.forEach(input => {
    input.addEventListener('input', createMask);
    input.addEventListener('focus', createMask);
    input.addEventListener('blur', restorePlaceholder);
  });
};

mask('[name="phone"]');

try {
  const form = document.querySelector('.order__form');
  const messageBox = document.querySelector('.message-box');

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(form);
    fetch('sendmail.php', {
      method: 'POST',
      body: formData
    })
      .then(function (response) {
        if (response.ok) {
          showMessage('Message sent successfully!', 'success');
        } else {
          showMessage('Failed to send message.', 'error');
        }
      })
      .catch(function (error) {
        showMessage('An error occurred.', 'error');
      });
  });

  function showMessage(message, type) {
    messageBox.textContent = message;
    messageBox.classList.add(type);
    messageBox.style.display = 'block';

    setTimeout(function () {
      messageBox.style.display = 'none';
      messageBox.textContent = '';
      messageBox.classList.remove(type);
    }, 5000);
  }
} catch (e) { }


// DATE MASK
document.getElementById('date-input').addEventListener('keyup', function () {
  this.value = formatDate(this.value);
});

function formatDate(value) {
  // Remove any non-numeric characters from the input
  value = value.replace(/\D/g, '');

  // Add slashes to format the date (DD/MM/YY)
  if (value.length > 4) {
    value = value.slice(0, 2) + '/' + value.slice(2, 4) + '/' + value.slice(4, 6);
  } else if (value.length > 2) {
    value = value.slice(0, 2) + '/' + value.slice(2, 4) + '/' + value.slice(4);
  } else if (value.length > 0) {
    value = value.slice(0, 2) + '/' + value.slice(2);
  }

  return value;
}

// GALLERY WITH POPUP
const galleryItems = document.querySelectorAll(".gallery__description-icon");
const modal = document.getElementById("myModal");
const modalImage = document.getElementById("modalImage");
const nextImage = document.getElementById("next-image");
const prevImage = document.getElementById("prev-image");
let currentIndex = 0;

galleryItems.forEach((item, index) => {
  item.addEventListener("click", function (event) {
    event.preventDefault();
    currentIndex = index;
    openModal(currentIndex);
  });
});

function openModal(index) {
  modal.style.display = "block";
  modalImage.src = galleryItems[index].closest(".gallery__link").querySelector(".gallery__image-img").src;

  const closeButton = document.querySelector(".close");
  closeButton.addEventListener("click", function () {
    closeModal();
  });

  window.onclick = function (event) {
    if (event.target === modal) {
      closeModal();
    }
  };

  window.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") {
      showPreviousImage();
    } else if (event.key === "ArrowRight") {
      showNextImage();
    }
  });

  prevImage.addEventListener("click", function (event) {
    event.preventDefault();
    showPreviousImage();
  });

  nextImage.addEventListener("click", function (event) {
    event.preventDefault();
    showNextImage();
  });
}

function closeModal() {
  modal.style.display = "none";
}

function showPreviousImage() {
  currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
  modalImage.src = galleryItems[currentIndex].closest(".gallery__link").querySelector(".gallery__image-img").src;
}

function showNextImage() {
  currentIndex = (currentIndex + 1) % galleryItems.length;
  modalImage.src = galleryItems[currentIndex].closest(".gallery__link").querySelector(".gallery__image-img").src;
}



// ADD FILES 
const filesInput = document.getElementById("files-input");

filesInput.addEventListener("change", handleFileSelect);

function handleFileSelect(event) {
  const files = event.target.files;
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    // Here, you can perform operations on each selected file
    console.log("File name:", file.name);
    console.log("File size:", file.size);
    console.log("File type:", file.type);
  }
}



// TIMELINE
const steps = document.querySelectorAll('.step');
const timelineItems = document.querySelectorAll('.timeline-item');
let currentStep = 0;

function showStep(stepIndex) {
  steps.forEach((step, index) => {
    step.classList.toggle('current', index === stepIndex);
    step.classList.toggle('empty', index > stepIndex);
    step.classList.toggle('first-step', index === 0);
  });
}

function updateTimeline(stepIndex) {
  timelineItems.forEach((item, index) => {
    item.classList.toggle('empty', index > stepIndex);
    item.classList.toggle('current', index === stepIndex);
    item.classList.toggle('active', index < stepIndex);
  });
}

function nextStep() {
  currentStep += 1;
  if (currentStep < steps.length) {
    showStep(currentStep);
    updateTimeline(currentStep);
  }
}

function prevStep() {
  currentStep -= 1;
  if (currentStep >= 0) {
    showStep(currentStep);
    updateTimeline(currentStep);
  }
}

function collectFormData() {
  const formData = {};
  const inputs = document.querySelectorAll('.step.current input');

  inputs.forEach(input => {
    const inputName = input.getAttribute('name');
    const inputValue = input.value;
    formData[inputName] = inputValue;
  });

  return formData;
}

function submitFormToServer() {
  const formData = collectFormData();

  // Отправляем данные на сервер с помощью AJAX или Fetch API
  // fetch('sendorder.php', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify(formData)
  // })
  // .then(response => response.json())
  // .then(data => {
  //   console.log(data);
  // })
  // .catch(error => {
  //   console.error('Error:', error);
  // });

  // В примере выше мы отправляем данные в формате JSON на сервер.
  // Вы можете настроить свой серверный скрипт (sendorder.php) для обработки данных.

  // В данном примере мы просто выводим собранные данные в консоль.
  console.log(formData);
}

document.addEventListener('DOMContentLoaded', () => {
  showStep(currentStep);
  updateTimeline(currentStep);

  const nextStepButtons = document.querySelectorAll('.next-step');
  nextStepButtons.forEach(button => {
    button.addEventListener('click', nextStep);
  });

  const prevStepButtons = document.querySelectorAll('.prev-step');
  prevStepButtons.forEach(button => {
    button.addEventListener('click', prevStep);
  });

  const submitButton = document.querySelector('.step.empty .next-step');
  submitButton.addEventListener('click', submitFormToServer);
});
