const canvas = document.querySelector("canvas");
canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;
const data1 = [
  { label: "mon", data: "4" },
  { label: "tue", data: "2" },
  { label: "wed", data: "3" },
  { label: "thur", data: "4" },
  { label: "fri", data: "5" },
  { label: "sat", data: "6" },
  { label: "sun", data: "30" },
];

const config = {
  data: data1,
  options: {
    title: "Days of the week ",
    backgroundColor: "orange",
    textColor: "white",
    hoverBackgroundColor: "red",
  },
};
let chart = new BarChart(canvas);
chart.config(config);
chart.draw();
