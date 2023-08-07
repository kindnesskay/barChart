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
          textColor: "white",
          borderColor: "red",
          borderSize: 4,
          title: "Demo chart",
          hoverBackgroundColor: "green",
        },
      };

      chart.config(config);
      chart.draw();
    });
}
getData("./data.json");
