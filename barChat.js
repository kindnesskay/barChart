function drawChart(data, canvas) {
  data = covertToPercentage(data, canvas.height);
  let spaceValue = data.length + 1;
  let barWidth = canvas.width / (spaceValue * 1.2);
  let spacing = canvas.width / data.length - barWidth;
  let barX = spacing;
  let barY;
  data.map((barHeight) => {
    barY = canvas.height - barHeight;
    ctx.fillRect(barX, barY, barWidth, barHeight);
    barX += barWidth + spacing;
  });
}

function covertToPercentage(itemHeight, canvasHeight) {
  let maxHeight = Math.max(...itemHeight);
  let percentageheight = itemHeight.map((height) => (height / maxHeight) * 90);
  let equivHeight = percentageheight.map(
    (percent) => (canvasHeight * percent) / 100
  );
  return equivHeight;
}
