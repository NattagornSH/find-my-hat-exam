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
}
