export default function () {
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
              let p = document.createElement('p')
              let h3 = document.createElement('h3')
              h3.innerText = `Name:${item.user}`
              p.innerText=`${item.content}`
              li.appendChild(p)
              li.appendChild(h3)
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
        if (!user) {
          alert('请输入用户名')
        } else if (!content) {
          alert('请输入留言内容')
        } else if (user && content) {
          this.model.save({user, content}).then(
            function (object) {
              let li = document.createElement('li')
              let p = document.createElement('p')
              let h3 = document.createElement('h3')
              let messageList = document.querySelector('#messageList')
              h3.innerText = `Name:${object.attributes.user}`
              p.innerText = `${object.attributes.content}`
              li.appendChild(p)
              li.appendChild(h3)
              messageList.append(li)
              alert('发送成功')
              myForm.querySelector('#messageUser').value = ''
              myForm.querySelector('#messageContent').value = ''
            }
          )
        }
      }
    })
    controller.init(view, model)
  }.call()
}
