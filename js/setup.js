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

var wizardsNumber = 4;

var modal = document.querySelector('.setup');
modal.classList.remove('hidden');

document.querySelector('.setup-similar').classList.remove('hidden');

var similarWizardsList = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');


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

var wizards = generateWizards(wizardsNumber);
renderWizards(wizards);

modal.querySelector('.setup-similar').classList.remove('hidden');
