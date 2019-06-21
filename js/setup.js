'use strict';

var NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];

var SURNAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];

var COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];

var EYES_COLORS = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];

var FIREBALL_COLORS = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
];

var ESC_BUTTON = 27;
var ENTER_BUTTON = 13;

var wizardsNumber = 4;

var modal = document.querySelector('.setup');
var user = document.querySelector('.setup-open');
var closeButton = modal.querySelector('.setup-close');

var isOpen = false;

var form = document.querySelector('.setup-wizard-form');
var wizardCoatHidden = form.querySelector('input[name="coat-color"]');
var wizardEyesHidden = form.querySelector('input[name="eyes-color"]');
var fireballColorHidden = form.querySelector('input[name="fireball-color"]');
var nameInput = form.querySelector('.setup-user-name');

var wizardCoat = form.querySelector('.setup-wizard .wizard-coat');
var wizardEyes = form.querySelector('.setup-wizard .wizard-eyes');
var fireBall = form.querySelector('.setup-fireball-wrap');

var similarWizardsList = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_BUTTON && !(document.activeElement === nameInput)) {
    closePopup();
  }
};

var openPopup = function () {
  modal.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  modal.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

var submitForm = function () {
  form.submit();
};

var getRandomOption = function (array) {
  var randomOption = Math.floor(Math.random() * array.length);
  return array[randomOption];
};

var createWizard = function () {
  return {
    'name': getRandomOption(NAMES) + ' ' + getRandomOption(SURNAMES),
    'coatColor': getRandomOption(COLORS),
    'eyesColor': getRandomOption(EYES_COLORS)
  };
};

var generateWizards = function (count) {
  var data = [];
  for (var i = 1; i <= count; i++) {
    var wizard = createWizard(i);
    data.push(wizard);
  }
  return data;
};

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var renderWizards = function (wizards) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }

  similarWizardsList.appendChild(fragment);
};

user.addEventListener('click', function () {
  openPopup();
  isOpen = true;
});

user.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_BUTTON) {
    openPopup();
    isOpen = true;
  }
});

closeButton.addEventListener('click', function () {
  closePopup();
});

closeButton.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_BUTTON) {
    closePopup();
  }
});

form.addEventListener('submit', function (evt) {
  if (isOpen === true) {
    if (evt.keyCode === ENTER_BUTTON) {
      submitForm();
    }
  }
});

wizardCoat.addEventListener('click', function () {
  wizardCoat.style.fill = getRandomOption(COLORS);
  wizardCoatHidden.value = wizardCoat.style.fill;
});

wizardEyes.addEventListener('click', function () {
  wizardEyes.style.fill = getRandomOption(EYES_COLORS);
  wizardEyesHidden.value = wizardEyes.style.fill;
});

fireBall.addEventListener('click', function () {
  var color = getRandomOption(FIREBALL_COLORS);
  fireBall.style.backgroundColor = color;
  fireballColorHidden.value = color;
});

var wizards = generateWizards(wizardsNumber);
renderWizards(wizards);

modal.querySelector('.setup-similar').classList.remove('hidden');
