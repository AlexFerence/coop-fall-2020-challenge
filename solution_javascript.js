class EventSourcer {
  constructor() {
    this.value = 0;
    this.history = [[true, 0]]
    this.index = 0
  }
  add(num) {
    if (this.history.length - 1 > this.index) {
      this.history[this.index] = [true, num]
    } 
    else {
      this.history.push([true, num])
    }
    this.value = this.value+num
    this.index = this.index + 1
    
    //check if there is something ahead in the chain and delete if possible
  }
  subtract(num) {
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
      //you will be allowed to redo
      this.index = this.index + 1
    }
    else {
      //not possible to redo
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
}

// ----- Do not modify anything below this line (needed for test suite) ------
module.exports = EventSourcer;
