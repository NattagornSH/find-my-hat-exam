const prompt = require("prompt-sync")({ sigint: true });

const hat = "⭐️";
const hole = "🔥";
const fieldCharacter = "🍀";
const pathCharacter = "🐼";

class Field {
  constructor(field) {
    this.field = field;
    this.rows = field.length;
    this.cols = field[0].length;
    this.actorRow = 0;
    this.actorCol = 0;

    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        if (this.field[r][c] === pathCharacter) {
          this.actorRow = r;
          this.actorCol = c;
        }
      }
    }
  }

  print() {
    console.log("\n-------------------");
    for (let r = 0; r < this.rows; r++) {
      console.log(this.field[r].join(" "));
    }
    console.log("-------------------");
  }

  moveRight() {
    const prevRow = this.actorRow;
    const prevCol = this.actorCol;
    this.actorCol += 1;
    this.updateMap(prevRow, prevCol);
  }

  moveLeft() {
    const prevRow = this.actorRow;
    const prevCol = this.actorCol;
    this.actorCol -= 1;
    this.updateMap(prevRow, prevCol);
  }

  moveUp() {
    const prevRow = this.actorRow;
    const prevCol = this.actorCol;
    this.actorRow -= 1;
    this.updateMap(prevRow, prevCol);
  }

  moveDown() {
    const prevRow = this.actorRow;
    const prevCol = this.actorCol;
    this.actorRow += 1;
    this.updateMap(prevRow, prevCol);
  }

  updateMap(prevRow, prevCol) {
    if (
      this.actorRow < 0 ||
      this.actorRow >= this.rows ||
      this.actorCol < 0 ||
      this.actorCol >= this.cols
    ) {
      console.log("🚫 You went out of bounds! Game over.");
      process.exit();
    }

    const currentTile = this.field[this.actorRow][this.actorCol];

    if (currentTile === hole) {
      this.print();
      console.log("💀 You fell into a hole! Game over.");
      process.exit();
    }

    if (currentTile === hat) {
      this.field[prevRow][prevCol] = fieldCharacter;
      this.field[this.actorRow][this.actorCol] = pathCharacter;
      this.print();
      console.log("🎉 You found the hat! You win!");
      process.exit();
    }

    this.field[prevRow][prevCol] = fieldCharacter;
    this.field[this.actorRow][this.actorCol] = pathCharacter;
  }

  static generateField(height, width, percentageHoles = 0.2) {
    const field = [];

    for (let r = 0; r < height; r++) {
      const row = [];
      for (let c = 0; c < width; c++) {
        const random = Math.random();
        if (random < percentageHoles) {
          row.push(hole);
        } else {
          row.push(fieldCharacter);
        }
      }
      field.push(row);
    }

    let actorRow, actorCol;
    do {
      actorRow = Math.floor(Math.random() * height);
      actorCol = Math.floor(Math.random() * width);
    } while (field[actorRow][actorCol] === hole);
    field[actorRow][actorCol] = pathCharacter;

    let hatRow, hatCol;
    do {
      hatRow = Math.floor(Math.random() * height);
      hatCol = Math.floor(Math.random() * width);
    } while (
      (hatRow === actorRow && hatCol === actorCol) ||
      field[hatRow][hatCol] === hole
    );
    field[hatRow][hatCol] = hat;

    return field;
  }
}
