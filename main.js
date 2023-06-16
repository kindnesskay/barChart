const canvas = document.getElementById("myChart");
let ctx = canvas.getContext("2d");
ctx.fillStyle = "hsl(10, 79%, 65%)";

const n = [120, 40, 10, 400];
let days = [17.45, 34.91, 52.36, 3.07, 23.39, 43.28, 25.48];
drawChart(days, canvas);
console.log(canvas);
