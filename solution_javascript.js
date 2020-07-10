class EventSourcer {
  constructor() {
    this.value = 0;
    this.history = []
    this.index = 0
  }
  add(num) {
    this.value = this.value + num
    this.history.push(this.value)
    this.index = this.index + 1

    //check if there is something ahead in the chain and delete if possible
  }
  subtract(num) {
    this.value = this.value - num
    this.history.push(this.value)
    this.index = this.index + 1
  }
  undo() {
    this.value = this.history[this.index - 1]
    this.index = this.index = 1

  }
  redo() {
    //check if there is a redo allowed
    if (this.history.index < this.history.length - 1) {
      //you will be allowed to redo
      this.value = this.history[this.index + 1]
      this.index = this.index + 1

    }
    else {
      //not possible to redo
      
    }

  }

  bulk_undo(num) {}
  bulk_redo(num) {}
}

// ----- Do not modify anything below this line (needed for test suite) ------
module.exports = EventSourcer;
