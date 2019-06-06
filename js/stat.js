'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 20;
var TITLE_HEIGHT = CLOUD_Y + GAP * 2 + FONT_GAP + GAP + FONT_GAP;
var GRAPH_HEIGHT = 150;
var BAR_WIDTH = 40;
var BAR_GAP = 50;
var barHeight = CLOUD_HEIGHT - TITLE_HEIGHT - FONT_GAP - GAP - FONT_GAP;

var GRAPH_X = CLOUD_X + GAP * 4;
var GRAPH_Y = CLOUD_Y + TITLE_HEIGHT;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

var randomColor = function () {
  var color = 'hsl(240, ' + Math.floor(Math.random() * 100) + '%, 50%)';
  return color;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', CLOUD_X + GAP * 2, CLOUD_Y + GAP * 3);
  ctx.fillText('Список результатов:', CLOUD_X + GAP * 2, CLOUD_Y + GAP * 2 + FONT_GAP + GAP);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    ctx.fillText(names[i], GRAPH_X + (BAR_WIDTH + BAR_GAP) * i, GRAPH_Y + GRAPH_HEIGHT + GAP * 2);
    ctx.fillText(Math.floor(times[i]), GRAPH_X + (BAR_WIDTH + BAR_GAP) * i, GRAPH_Y + (GRAPH_HEIGHT - (barHeight * times[i]) / maxTime) - GAP);
    ctx.fillRect(GRAPH_X + (BAR_WIDTH + BAR_GAP) * i, CLOUD_HEIGHT - (barHeight * times[i]) / maxTime - (FONT_GAP + GAP), BAR_WIDTH, (barHeight * times[i]) / maxTime);
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = randomColor();
    }
  }
};
