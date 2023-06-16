# Bar Chart

Do you want to draw a bar chart in your web page but don't want to deal with the complex code of setting up the chart? The Bar Chart Drawing function can help you with that! This function helps you create bar charts with ease by handling the complex logic of chart creation, so you can focus on the data.

## Features

Normalize the data to fit the chart height
Draw bars with specified color

## How to Use

download source code and add in html file
....html
<canvas id='myChart'></canvas>

<script src="./barChart.js"></script>

<script src="./main.js"></script>

### javascript(code in your main.js file)

-- Grab the id of the canvas
const canvas = document.getElementById("myChart");
-- Create the canvas context(use ctx as the variable name)
let ctx = canvas.getContext("2d");
-- style the bars
ctx.fillStyle = "hsl(10, 79%, 65%)";
-- create an array with numbers
let data = [17.45, 34.91, 52.36, 3.07, 23.39, 43.28, 25.48];
-- call the function the array is a required parameter and the canvas element
drawChart(data,canvas);

Enjoy your bar chart!

## Limitations

-- The charts currently only supports horizontal bar charts with a fixed height canvas.
-- No hover effects
-- Does not support options
-- No information display

## continued development

The development of this project is ongoing, with a focus on making improvements and adding new features

## images

![chart image]('./screenshots/barChart.png')
![chart image2]('./screenshots/barChart2.png')
