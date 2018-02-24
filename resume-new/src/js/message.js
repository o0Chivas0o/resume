export default function(){
  return !function () {
    let view = View('section.message')
    let model = Model({resourceName: 'Message'})
    let controller = Controller({
      form: null,
      messageList: null,
      init: function (view, model) {
        this.messageList = view.querySelector('#messageList')
        this.form = view.querySelector('#postMessage')
        this.loadMessages()
      },
      loadMessages: function () {
        this.model.fetch().then(
          (messages) => {
            let array = messages.map((item) => item.attributes)
            array.forEach((item) => {
              let li = document.createElement('li')
              li.innerText = `${item.user} : ${item.content}`
              this.messageList.append(li)
            })
          })
      },
      bindEvents: function () {
        this.form.addEventListener('submit', (e) => {  // 监听表单防止 监听submit落空
          e.preventDefault()
          this.saveMessage()
        })
      },
      saveMessage: function () {
        let myForm = this.form
        let user = myForm.querySelector('#messageUser').value
        let content = myForm.querySelector('#messageContent').value
        this.model.save({user, content}).then(
          function (object) {
            let li = document.createElement('li')
            if (object.attributes.user !== '' && object.attributes.content !== '') {
              li.innerText = `${object.attributes.user}: ${object.attributes.content}`
              let messageList = document.querySelector('#messageList')
              messageList.append(li)
              myForm.querySelector('#messageUser').value = ''
              myForm.querySelector('#messageContent').value = ''
            }
          }
        )
      }
    })
    controller.init(view, model)
  }.call()
}
