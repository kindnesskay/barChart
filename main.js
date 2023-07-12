import { BarChart } from "./barChat.js";

let canvas = document.querySelector("canvas");
// canvas.width = window.innerWidth - 100;
// canvas.height = window.innerHeight - 100;
const data = [17.35, 34.91, 52.36, 31.07, 23.39, 43.28, 25.48];

const data2 = [
  {
    text: "mon",
    data: 17.45,
  },
  {
    text: "tue",
    data: 34.91,
  },
  {
    text: "wed",
    data: 52.36,
  },
  {
    text: "thu",
    data: 31.07,
  },
  {
    text: "fri",
    data: 23.39,
  },
  {
    text: "sat",
    data: 43.28,
  },
  {
    text: "sun",
    data: 25.48,
  },
];

let chart = new BarChart(canvas);
chart.set_data(data2);
chart.draw();
