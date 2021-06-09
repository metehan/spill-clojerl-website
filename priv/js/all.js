(function () {
  'use strict';

  const navbar = document.getElementById("navbar");

  window.onscroll = function () {
    var scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;

    if (scrollPosition > 60) {
      navbar.classList.add("bg")
    } else {
      navbar.classList.remove("bg");
    }
  };
})();


function openTheApp(url) {
  var params = [
    'height=' + screen.height,
    'width=' + screen.width,
    'fullscreen=yes' // only works in IE, but here for completeness
  ].join(',');
  var popup = window.open(url, 'spill', params);
  popup.moveTo(0, 0);
}

const duAnimations = {
  state: {
    orders: 0,
    call: false,
    callIteration: -100,
    iteration: 0,
    speed: 500
  },
  showCall: function () {
    let timer = (this.state.iteration - this.state.callIteration) * this.state.speed
    if (timer > 10000) {
      let call = document.getElementById("du-call")
      call.classList.remove("none")
      this.state.callIteration = this.state.iteration
    }
  },
  hideCall: function () {
    let timer = (this.state.iteration - this.state.callIteration) * this.state.speed
    if (timer > 5000) {
      let call = document.getElementById("du-call")
      call.classList.add("none")
    }
  },
  showPopup: function () {
    let e = document.getElementById("du-popup")
    e.classList.remove("none")
  },
  hidePopup: function () {
    let e = document.getElementById("du-popup")
    e.classList.add("none")
  },
  setPercent: function () {
    let p = document.getElementById("du-percent")
    p.style.width = `${this.state.orders * 10}%`
  },
  addOrder: function () {
    let orders = document.getElementsByClassName("du-order none")
    if (orders.length > 0) {
      this.state.orders = 7 - orders.length
      let pick = Math.floor(Math.random() * orders.length)
      let item = orders[pick]
      item.classList.remove("none")
      item.classList.add("shown")
      this.setPercent()
    }
  },
  removeOrder: function () {
    let orders = document.getElementsByClassName("du-order shown")
    if (orders.length > 2) {
      this.state.orders = orders.length - 1
      let pick = Math.floor(Math.random() * orders.length)
      let item = orders[pick]
      item.classList.remove("shown")
      item.classList.add("none")
      this.setPercent()
    }
  },
  changeGraph: function () {
    let bars = document.getElementsByClassName("du-bar")
    let text = document.getElementsByClassName("du-vwt")
    let h = Math.floor(Math.random() * 40) + 20
    if (this.state.iteration % 5 == 1) {
      for (let item of bars) {
        let nh = h + (Math.floor(Math.random() * 40) - 20)
        if (nh > 0 && nh < 100) { h = nh }
        else { h = 50 }
        item.style.height = `${h}%`
      }

      for (let item of text) {
        let w = (Math.floor(Math.random() * 10) + 2)
        item.style.width = `${w}em`
      }
    }
  },
  init: function () {
    let marker = document.getElementsByClassName("du-mmc")
    for (let item of marker) {
      item.style.top = `${(Math.floor(Math.random() * 80) + 10)}%`
      item.style.left = `${(Math.floor(Math.random() * 80) + 10)}%`
    }
  },
  doSomething: function () {
    this.state.iteration++
    if (this.state.iteration == 1) { this.init() }
    let r = Math.floor(Math.random() * 100)
    if (r < 25) { this.addOrder() }
    else if (r < 40) { this.removeOrder() }
    else if (r < 55) { this.showCall() }
    else { this.hideCall() }
    //non-random
    this.changeGraph()
  }
}

var duAnim = setInterval(() => duAnimations.doSomething(), duAnimations.state.speed);
