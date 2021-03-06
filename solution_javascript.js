class EventSourcer {
  constructor() {
    this.value = 0;
    //true means add ---- false means subtract, second item is how much is added or subtracted
    this.history = [[true, 0]]
    //index keeps track of where we are in history
    this.index = 0
  }
  add(num) {
    //check if we need to override or not
    if (this.history.length - 1 > this.index) {
      this.history[this.index] = [true, num]
    } 
    else {
      this.history.push([true, num])
    }
    this.value = this.value+num
    this.index = this.index + 1
  }
  subtract(num) {
    //check if we need to override or not
    if (this.history.length - 1 > this.index) {
      this.history[this.index] = [false, num]
    } 
    else {
      this.history.push([false, num])
    }
    this.value = this.value - num
    this.index = this.index + 1
   
  }
  undo() {
    var recentChange = this.history[this.index][1]
    if (this.history[this.index][0]) {
      this.value = this.value - recentChange
    }
    else {
      this.value = this.value + recentChange
    }
    this.index = this.index - 1 
  }
  redo() {
    //check if there is a redo allowed
    if (this.index < this.history.length - 1) {
      var recentChange = this.history[this.index + 1][1]
      if (this.history[this.index][0]) {
        this.value = this.value + recentChange
      }
      else {
        this.value = this.value - recentChange
      }
      this.index = this.index + 1
    }
  }
  bulk_undo(num) {
    var recentChange = 0
    for (var x = this.index; x > this.index - num; x--) {
      if (this.history[x][0] === false) {
        recentChange = recentChange + this.history[x][1]
      }
      else {
        recentChange = recentChange - this.history[x][1]
      }
    } 
    this.value = this.value + recentChange
    this.index = this.index - num
  }
  bulk_redo(num) {
    var recentChange = 0
    for (var x = this.index + 1; x <= this.index + num; x++) {
      if (this.history[x]) {
        if (this.history[x][0] === false) {
          recentChange = recentChange + this.history[x][1]
        }
        else {
          recentChange = recentChange - this.history[x][1]
        }
      }
    } 
    this.value = this.value - recentChange
    this.index = this.index + num   
  }

  // Extra functionality 
  // Function to clear the history 
  reset() {
    this.value = 0;
    this.history = [[true, 0]]
    this.index = 0
  }

}
// ----- Do not modify anything below this line (needed for test suite) ------
module.exports = EventSourcer;
