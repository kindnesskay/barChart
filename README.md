# Bar Chart v1.1

Do you want to draw a bar chart in your web page but don't want to deal with the complex code of setting up the chart? The Bar Chart Drawing function can help you with that! This function helps you create bar charts with ease by handling the complex logic of chart creation, so you can focus on the data.

## Features

- Normalize the data to fit the chart height
- Draw bars with specified color
- Shows data on hover
- Set label color
- Hover background color

### options

- backgroundColor
- textColor
- title
- borderSize
- borderColor
- hoverBackgroundColor

## How to Use

- Download source code
- Add the javascript file to your html via the "script" tag
- Add a canvas element to your html set an id
  ....html

```html
<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>BarChart.js Demo</title>
  </head>
  <body>
    <canvas id="myCanvas" width="400" height="400"></canvas>
  </body>
</html>
    <script src="./barChart.js"></script>
    <script>
      //Grab the id of the canvas.
      const canvas = document.getElementById("myCanvas");
      const days_of_the_week = [
        { label: "mon", data: "1" },
        { label: "tue", data: "2" },
        { label: "wed", data: "3" },
        { label: "thur", data: "4" },
        { label: "fri", data: "5" },
        { label: "sat", data: "6" },
        { label: "sun", data: "7" },
      ];
      //  Create the config.
      const config = {
        data: days_of_the_week,
        options: {
          backgroundColor: "orange",
          textColor: "white",
          title: "Days of the week ",
          hoverBackgroundColor:'#004400',
        },
      };
      let chart = new BarChart(canvas);
      chart.config(config);
      chart.draw();
    </script>
  </body>
</html>
```

Enjoy your bar chart!

## Limitations

- The charts currently only supports horizontal bar charts with a fixed height canvas.
- Only supports one dataset
- NO graph option
- Not responsive

## continued development

The development of this project is ongoing, with a focus on making improvements and adding new features
Currently working on the graph feature

## image

![chart hover on element](/screenshots/hover.png)
![chart](/screenshots/barchartview.png)
