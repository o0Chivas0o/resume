!function () {
  let view = document.querySelector('#siteWelcome')
  let controller = {
    view: null,
    init: function (view) {
      this.view = view
      this.deActive()
    },
    deActive: function () {
      this.view.classList.remove('active')
    }
  }
  controller.init(view)
}.call()
