const canvas = document.getElementById("myChart");
let ctx = canvas.getContext("2d");
canvas.width = innerWidth - 5;
canvas.height=innerHeight -50;
let height = canvas.height;
let width = canvas.width;

ctx.fillStyle = "hsl(10, 79%, 65%)";
function bar(data) {
  data = covertToPercentage(data, height);
  let spaceValue = data.length + 1;
  let barWidth = width / (spaceValue * 1.2);
  let spacing = width / data.length - barWidth;
  let barX = spacing;
  let barY;
  data.map((barHeight) => {
    barY = height - barHeight;
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
const n = [120, 40, 10, 400];
let days=[17.45,34.91,52.36,31.07,23.39,43.28,25.48]
bar(days)
