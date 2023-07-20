const total_this_month = document.querySelector("#total_this_month");
const balance = document.querySelector("#balance");

let canvas = document.querySelector("#chart");
let data2 = [
  { text: "mon", data: 10 },
  { text: "tue", data: 20 },
  { text: "wed", data: 30 },
  { text: "thur", data: 40 },
  { text: "fri", data: 50 },
  { text: "sat", data: 60 },
  { text: "sun", data: 70 },
  { text: "new", data: 80 },
];

const chart = new BarChart(canvas);
async function getData(url) {
  let total = 0;
  await fetch(url)
    .then((res) => res.json())
    .then((resData) => {
      const data = resData.map((data) => {
        total += data.amount;
        return { data: data.amount, label: data.day };
      });

      const config = {
        data: data,
        options: {
          backgroundColor: "hsl(10, 79%, 65%)",
          textColor: "white",
          title: "Spending - Last 7 days",
          hoverBackgroundColor: "hsl(186, 34%, 60%)",
        },
      };

      chart.config(config);
      chart.draw();
      total_this_month.innerHTML = total;
    });
}
getData("./data.json");

let drawer = document.querySelector(".toggle");
let ball = document.querySelector("#ball");
function switchMode() {
  if (drawer.classList.contains("toggle_off")) {
    drawer.classList.remove("toggle_off");
    drawer.classList.add("toggle_on");
    return null;
  }
  drawer.classList.remove("toggle_on");
  drawer.classList.add("toggle_off");
  console.log("hello");
  return null;
}
drawer.addEventListener("click", switchMode);
