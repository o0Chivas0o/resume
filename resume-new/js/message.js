!function () {
  let view = document.querySelector('section.message')
  let controller = {
    view: null,
    messageList: null,
    init: function (view) {
      this.view = view
      this.messageList = view.querySelector('#messageList')
      this.form = view.querySelector('#postMessage')
      this.initAV()
      this.loadMessages()
      this.bindEvents()
    },
    initAV: () => {
      let APP_ID = 'JLMh9Uyk8yngdHl7RjiKtBvJ-gzGzoHsz'
      let APP_KEY = 'eFTOCJrbFsKTdigcxbv3jRog'
      AV.init({appId: APP_ID, appKey: APP_KEY})
    },
    loadMessages: () => {
      let query = new AV.Query('Message')
      query.find()
        .then(
          (messages) => {
            let array = messages.map((item) => item.attributes)
            array.forEach((item) => {
              let li = document.createElement('li')
              li.innerText = `${item.user} : ${item.content}`
              this.messageList.append(li)
            })
          },
          (error) => {
            alert('提交失败')
            // 异常处理
          })
    },
    bindEvents: function () {
      this.form.addEventListener('submit', (e)=>{  // 监听表单防止 监听submit落空
        e.preventDefault()
        this.saveMessage()
      })
    },
    saveMessage: function () {
      let myForm = this.form
      let user = myForm.querySelector('#messageUser').value
      let content = myForm.querySelector('#messageContent').value
      let Message = AV.Object.extend('Message')
      let message = new Message()
      message.save({
        user,
        content
      })
        .then(
          function (object) {
            let li = document.createElement('li')
            li.innerText = `${object.attributes.user}: ${object.attributes.content}`
            let messageList = document.querySelector('#messageList')
            messageList.append(li)
            myForm.querySelector('#messageUser').value = ''
            myForm.querySelector('#messageContent').value = ''
          }
        )
    }
  }
  controller.init(view)
}.call()
