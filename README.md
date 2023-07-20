# Bar Chart v1.1

Do you want to draw a bar chart in your web page but don't want to deal with the complex code of setting up the chart? The Bar Chart Drawing function can help you with that! This function helps you create bar charts with ease by handling the complex logic of chart creation, so you can focus on the data.

## Features

- Normalize the data to fit the chart height
- Draw bars with specified color
- Shows label on hover
- Set label color
- Hover background color

### options

- backgroundColor
- graph (Boolean value:true/false )
- textColor
- title
- hoverBackgroundColor

## How to Use

- Download source code
- Add the javascript file to your html via the "script" tag
- Add a canvas element to your html set an id
  ....html
```javascript
<canvas id='myChart'></canvas>
<script src="./barChart.js"'>
<script src="./main.js">

//Grab the id of the canvas.
const canvas = document.getElementById("myChart");
const days_of_the_week= [
  { label: "mon", data: "1" },
  { label: "tue", data: "2" },
  { label: "wed", data: "3" },
  { label: "thur", data: "4" },
  { label: "fri", data: "5" },
  { label: "sat", data: "6" },
  { label: "sun", data: "7" },
  
]
//  Create the config.
const config = {
  data: days_of_the_week,
  options: {
    color: "orange",
    textColor: "white",
    title: "Days of the week ",
  },
};
let chart = new BarChart(canvas);
chart.config(config);
chart.draw();
</script>
```
Enjoy your bar chart!

## Limitations

- The charts currently only supports horizontal bar charts with a fixed height canvas.
- Not responsive

## continued development

The development of this project is ongoing, with a focus on making improvements and adding new features

## images

![chart full display](/screenshots/barChart.png)
![chart hover on element](/screenshots/barChartHover.png)
