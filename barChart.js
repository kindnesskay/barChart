class BarChart {
  #arrow = "right"; //for the potion of the arrow
  #c; //the canvas context variable
  #dialog_properties = {
    position: { x: 0, y: 0 },
    height: 40,
    width: 100,
    textColor: "#fff",
    backgroundColor: "#000",
    opacity: 1,
    text: "",
    font: "20px Arial",
    arrow_lenght: 15,
  }; //dialog box properties
  #legend = false;
  #hoverd = false;
  #elementIndex = []; //bar element data
  #options = {
    color: null,
    borderSize: 1,
    borderColor: null,
    graph: false,
    title: "",
    hoverBackgroundCcolor: null,
  }; // set the options of the chart
  constructor(canvasElement) {
    this.canvasElement = canvasElement;
    this.data = "";

    this.canvasElement.addEventListener(
      "mousemove",
      this.#handleEvent.bind(this)
    );
    this.canvasElement.addEventListener(
      "mouseout",
      this.#handleEventOut.bind(this)
    );
  }

  // functions
  #handleEventOut() {
    this.#hoverd = "";
    this.draw();
  }
  #handleEvent(e) {
    // Redraw the chart

    // Get the canvas's bounding box
    const canvasRect = this.canvasElement.getBoundingClientRect();
    const x = canvasRect.x;
    const y = canvasRect.y;

    // Handle the event for each element in the index
    this.#elementIndex.forEach((index) => {
      const elementXLeft = index.x.left + x;
      const elementXRight = index.x.right + x;
      const elementYTop = index.y.top + y;
      const elementYBottom = index.y.top + index.height + y;
      if (
        e.clientX >= elementXLeft &&
        e.clientX <= elementXRight &&
        e.clientY >= elementYTop &&
        e.clientY <= elementYBottom
      ) {
        this.#hoverd = index;
        this.#legend = true;
        // Set the dialog position based on the element's y-coordinate
        this.#dialog_properties.position.y =
          index.y.top > this.canvasElement.height / 2
            ? index.y.top
            : this.canvasElement.height / 2;

        // Set the arrow direction and dialog position based on the element's x-coordinate
        if (
          x < this.#dialog_properties.width + x &&
          index.x.left < this.#dialog_properties.width
        ) {
          this.#arrow = "left";
          this.#dialog_properties.position.x =
            index.x.right + this.#dialog_properties.arrow_lenght;
        } else {
          this.#arrow = "right";
          this.#dialog_properties.position.x =
            index.x.left -
            this.#dialog_properties.width -
            this.#dialog_properties.arrow_lenght;
        }
        if (index.height <= this.#dialog_properties.height) {
          this.#dialog_properties.position.y =
            index.y.top - this.#dialog_properties.height;
        }

        // Set the dialog text to the element's data and display the dialog
        this.#dialog_properties.text = index.data;
      }
    });
    this.draw();
  }

  #covertToPercentage(itemHeight, canvasHeight) {
    // Find the maximum height in the itemHeight array
    const maxHeight = Math.max(...itemHeight);
    // Calculate the percentage height for each item relative to the maximum height
    const percentageHeight = itemHeight.map(
      (height) => (height / maxHeight) * 90
    );
    // Convert the percentage height to equivalent height on the canvas
    const equivHeight = percentageHeight.map(
      (percent) => (canvasHeight * percent) / 100
    );
    return equivHeight;
  }

  draw() {
    const canvasHeight = this.canvasElement.height;
    const canvasWidth = this.canvasElement.width;
    // Clear the canvas
    this.#c.clearRect(0, 0, canvasWidth, canvasHeight);

    // Set the chart title
    this.#c.font = "18px Arial  ";
    this.#c.fillStyle = "#000";
    this.#c.fillText(this.#options.title, 10, 18);

    // Draw bars and write labels
    this.#elementIndex.forEach((bar) => {
      this.#c.fillStyle = "#000";
      this.#c.font = "15px Arial";
      this.#c.fillText(bar.label, bar.x.left, canvasHeight);
      // draw border if requested

      if (this.#options.color) {
        this.#c.fillStyle = this.#options.color;
        this.#c.fillRect(bar.x.left, bar.y.top, bar.width, bar.height);
      }
      if (this.#hoverd == bar && this.#options.hoverBackgroundColor) {
        this.#c.fillStyle = this.#options.hoverBackgroundColor;
        this.#c.fillRect(bar.x.left, bar.y.top, bar.width, bar.height);
      }

      if (this.#options.borderColor) {
        this.#c.lineWidth = this.#options.borderSize;
        this.#c.strokeStyle = this.#options.borderColor;
        this.#c.strokeRect(bar.x.left, bar.y.top, bar.width, bar.height);
      }
    });
    if (this.#hoverd) {
      this.#dialog();
    }
  }

  #dialog() {
    if (!this.#legend) return false;

    const { position, height, width } = this.#dialog_properties;
    this.#c.fillStyle = `rgba(0,0,0,${this.#dialog_properties.opacity})`;
    this.#c.fillRect(position.x, position.y, width, height);
    let arrow_position = 0;
    let arrow_lenght = this.#dialog_properties.arrow_lenght;

    switch (this.#arrow) {
      case "right":
        arrow_position = width;
        arrow_lenght = +this.#dialog_properties.arrow_lenght;
        break;
      case "left":
        arrow_position = 0;
        arrow_lenght = -this.#dialog_properties.arrow_lenght;
        break;
      case "none":
        arrow_lenght = 0;
      default:
        break;
    }
    // top part of arrow in x axis of box
    this.#c.beginPath();
    this.#c.moveTo(position.x + arrow_position, position.y);
    this.#c.lineTo(position.x + arrow_position, position.y + height * 0.25);
    this.#c.lineTo(
      position.x + arrow_position + arrow_lenght,
      position.y + height * 0.5
    );

    this.#c.lineTo(position.x + arrow_position, position.y + height * 0.75);
    this.#c.lineTo(position.x + arrow_position, position.y + height);
    this.#c.lineTo(position.x + arrow_position, position.y);
    this.#c.fill();
    // end of side arrow

    // show bar chart color in the this.#dialog_properties box
    this.#c.fillStyle = this.#options.color;
    this.#c.fillRect(position.x, position.y, 15, 15);
    // displays  the text or info of hoverd bar
    this.#c.fillStyle = this.#dialog_properties.textColor;
    this.#c.font = this.#dialog_properties.font;
    this.#c.fillText(
      this.#dialog_properties.text,
      position.x + 30,
      position.y + height / 2
    );
  }
  getElement(index) {
    this.#legend = false;
    this.#hoverd = this.#elementIndex[index];
    return this.#hoverd.data;
  }

  config(config) {
    // Check if config.options exists
    if (!config.options) {
      console.error("config error: options not provided");
      return false;
    }

    const { options, data } = config;
    // Destructure options
    const {
      backgroundColor,
      textColor,
      graph,
      title,
      hoverBackgroundColor,
      borderColor,
    } = options;
    let { borderSize } = options;
    // Set properties directly without using variables
    if (backgroundColor) this.#options.color = backgroundColor;
    if (borderColor) this.#options.borderColor = borderColor;
    if (borderSize) {
      if (borderSize > 5) borderSize = 5;
      this.#options.borderSize = borderSize;
    }
    if (textColor) this.#dialog_properties.textColor = textColor;
    if (graph) this.#options.graph = graph;
    if (title) this.#options.title = title;
    if (hoverBackgroundColor)
      this.#options.hoverBackgroundColor = hoverBackgroundColor;

    // Check if data exists
    if (!data) {
      console.error("config error: data not provided");
      return false;
    }

    this.data = data;
    // Retrieve the 2D context only when necessary
    this.#c = this.canvasElement.getContext("2d");
    this.#setConfiguration(data);
    return true;
  }

  #setConfiguration(user_defined_data) {
    const dataNumbers = this.data.map((entry) => entry.data);
    const normalized_data = this.#covertToPercentage(
      dataNumbers,
      this.canvasElement.height * 0.9
    );

    const numberOfBars = this.data.length;
    const barWidth =
      (this.canvasElement.width * 95) / 100 / (numberOfBars * 1.2);
    const spacing =
      (this.canvasElement.width * 95) / 100 / numberOfBars - barWidth;

    let barX = (this.canvasElement.width * 4) / 100;

    const bars = [];
    normalized_data.forEach((barHeight, index) => {
      const barY = this.canvasElement.height * 0.95 - barHeight;
      const bar = {
        x: { left: barX, right: barX + barWidth },
        y: { top: barY },
        width: barWidth,
        height: barHeight,
        data: this.data[index].data,
        label: this.data[index].label,
      };
      barX += barWidth + spacing;
      bars.push(bar);
    });
    this.#elementIndex = bars;
  }
}
