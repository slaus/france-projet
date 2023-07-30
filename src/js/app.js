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


const navLinks = document.querySelectorAll('.menu__link');
const html = document.querySelector('html');

navLinks.forEach(function (navLink) {
    navLink.addEventListener('click', function (event) {
        event.preventDefault();
        html.classList.remove('menu-open');
        html.classList.remove('lock');

        var targetSectionId = this.getAttribute('href');
        var targetSection = document.querySelector(targetSectionId);

        if (targetSection) {
            var offsetTop = targetSection.getBoundingClientRect().top;

            // Уменьшаем значение offsetTop на 100 пикселей для остановки выше верха окна
            offsetTop -= 100;

            window.scrollTo({
                top: window.pageYOffset + offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

var burgerMenu = document.querySelector('.icon-menu');

burgerMenu.addEventListener("click", () => {
    html.classList.toggle('menu-open');
    html.classList.toggle('lock');
});



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

      this.value = matrix.replace(/X/g, function(a) {
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
  
  
  