!function () {
  let view = View('#topNavBar')
  let controller = {
    view: null,
    init: function (view) {
      this.view = view
      this.bindEvents()// this.bindEvents.call(this)
    },
    bindEvents: function () {
      view = this.view
      window.addEventListener('scroll', () => {
        window.scrollY > 0 ? this.active() : this.deActive()
      })
    },
    // bindEvents: function () {
    //   view = this.view
    //   window.addEventListener('scroll', function (e) {
    //     window.scrollY > 0 ? this.active() : this.deActive()
    //   }.bind(this))
    // },
    active: function () {
      this.view.classList.add('sticky')
    },
    deActive: function () {
      this.view.classList.remove('sticky')
    }
  }
  controller.init(view)// controller.init.call(controller, view)
}.call()
