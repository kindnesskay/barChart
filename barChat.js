export class BarChart {
  constructor(canvasElement) {
    this.canvasElement = canvasElement;
    this.data = [10, 20, 30, 40];
    this.options = { color: "#f00", outline: 1, outlineColor: false };
    this.dialog = {
      positon: { x: 0, y: 0 },
      height: 50,
      width: 100,
      textColor: "#fff",
      backgroundColor: "#000",
      text: "",
      font: "15px Arial",
    };
    this._arrow = "right";
    this._elementIndex = [];
    this._c = this.canvasElement.getContext("2d");
    this.canvasElement.addEventListener(
      "mousemove",
      this._handleEvent.bind(this)
    );
  }
  _handleEvent(e) {
    this._c.clearRect(
      0,
      0,
      this.canvasElement.width,
      this.canvasElement.height
    );
    this.draw();

    let x = this.canvasElement.getBoundingClientRect().x;
    let y = this.canvasElement.getBoundingClientRect().y;
    this._elementIndex.map((index) => {
      if (e.clientX >= index.x.left + x && e.clientX <= index.x.right + x) {
        if (
          e.clientY >= index.y.top + y &&
          e.clientY <= index.y.top + index.height
        ) {
          if (index.y.top > this.canvasElement.height / 2) {
            this.dialog.positon.y = index.y.top;
          } else {
            this.dialog.positon.y = this.canvasElement.height / 2;
          }

          // logic to make this.dialog box display within the views
          // set to right
          console.log(x);
          console.log(this.canvasElement.width);
          if (x < this.dialog.width && index.x.left < this.dialog.width) {
            this._arrow = "left";
            this.dialog.positon.x = index.x.right + 10;
          } else {
            // set to left
            this._arrow = "right";
            this.dialog.positon.x = index.x.left - this.dialog.width - 10;
          }
          this.dialog.text = index.data;
          this._dialog();
        }
      }
    });
  }
  _covertToPercentage(itemHeight, canvasHeight) {
    // convert data to height equivilent to the canvas height
    let maxHeight,
      percentageheight,
      equivHeight = "";
    maxHeight = Math.max(...itemHeight);
    percentageheight = itemHeight.map((height) => (height / maxHeight) * 90);
    equivHeight = percentageheight.map(
      (percent) => (canvasHeight * percent) / 100
    );
    return equivHeight;
  }
  draw() {
    // draw the chart
    this._c.fillStyle = this.options.color;

    this._c.lineWidth = this.options.outline;
    this._elementIndex.map((bar) => {
      this._c.fillRect(bar.x.left, bar.y.top, bar.width, bar.height);
    });
  }
  // displays the info of the hoverd bar
  _dialog() {
    // main this.dialog bok
    this._c.fillStyle = this.dialog.backgroundColor;
    this._c.fillRect(
      this.dialog.positon.x,
      this.dialog.positon.y,
      this.dialog.width,
      this.dialog.height
    );
    let positon = 0;
    let arrow_lenght = 12;

    switch (this._arrow) {
      case "right":
        positon = this.dialog.width;
        arrow_lenght = +12;
        break;
      case "left":
        positon = 0;
        arrow_lenght = -12;
        break;
      default:
        break;
    }
    this._c.strokeRect(
      this.dialog.positon.x,
      this.dialog.positon.y,
      this.dialog.width,
      this.dialog.height
    );
    // top part of arrow in x of box
    this._c.beginPath();
    this._c.moveTo(this.dialog.positon.x + positon, this.dialog.positon.y);
    this._c.lineTo(
      this.dialog.positon.x + positon,
      this.dialog.positon.y + this.dialog.height * 0.25
    );
    this._c.lineTo(
      this.dialog.positon.x + positon + arrow_lenght,
      this.dialog.positon.y + this.dialog.height * 0.5
    );
    // end of top part

    // down part
    this._c.lineTo(
      this.dialog.positon.x + positon,
      this.dialog.positon.y + this.dialog.height * 0.75
    );
    this._c.lineTo(
      this.dialog.positon.x + positon,
      this.dialog.positon.y + this.dialog.height
    );

    this._c.lineTo(this.dialog.positon.x + positon, this.dialog.positon.y);
    // end of down part
    this._c.fill();
    // end of side arrow

    // show bar chart color in the this.dialog box
    this._c.fillStyle = this.options.color;
    this._c.fillRect(this.dialog.positon.x, this.dialog.positon.y, 20, 20);
    // displays  the text or info of hoverd bar
    this._c.fillStyle = this.dialog.textColor;
    this._c.font = this.dialog.font;
    this._c.fillText(
      this.dialog.text,
      this.dialog.positon.x + 30,
      this.dialog.positon.y + this.dialog.height / 2
    );
  }
  set_data(user_defined_data) {
    // set the user defined data as the chart data
    this.data = user_defined_data;

    let list = [];
    this.data.map((data) => {
      list.push(data.data);
    });

    // normalize the data to show significant data height difference
    const normalized_data = this._covertToPercentage(
      list,
      this.canvasElement.height
    );
    // variables for creating the actual bar chart
    /*
    spacevalue gets the number of spacing needed
    width gives even widths to all bars
    spacing defines the spacing between the bars
    barx is the x axis of the bar
    bary is the y axis of the bar

    */
    let spaceValue,
      barWidth,
      spacing,
      barX,
      barY = "";
    spaceValue = this.data.length;
    barWidth = this.canvasElement.width / (spaceValue * 1.2);
    spacing = this.canvasElement.width / this.data.length - barWidth;
    barX = spacing;
    barY;

    // map the new data to create the bar properties
    normalized_data.map((barHeight, index) => {
      barY = this.canvasElement.height - barHeight;
      let element = {
        x: { left: barX, right: barWidth + barX },
        y: { top: barY },
        width: barWidth,
        height: barHeight,
        data: this.data[index].text,
      };
      barX += barWidth + spacing;
      this._elementIndex.push(element);
    });
  }
}
