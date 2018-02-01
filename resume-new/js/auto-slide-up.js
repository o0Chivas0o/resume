!function () {
  // 添加 offset 类
  let specialTags = document.querySelectorAll('[data-x]')
  for (let i = 0; i < specialTags.length; i++) {
    specialTags[i].classList.add('offset')
  }

  setTimeout(() => {
    findClosestAndRemoveOffset()
  }, 300)

  window.addEventListener('scroll', () => {
    findClosestAndRemoveOffset()
  })

  /*helper*/
  function findClosestAndRemoveOffset () {
    // 滚动到对应锚点 二级菜单对应标签高亮
    let specialTags = document.querySelectorAll('[data-x]')
    let minIndex = 0
    for (let i = 0; i < specialTags.length; i++) {
      if (Math.abs(specialTags[i].offsetTop - window.scrollY) < Math.abs(specialTags[minIndex].offsetTop - window.scrollY)) {
        minIndex = i
      }
    }
    // 去除默认offset类
    specialTags[minIndex].classList.remove('offset')

    let id = specialTags[minIndex].id
    let a = document.querySelector(`a[href="#${id}"]`)
    let li = a.parentNode
    let siblings = li.parentNode.children
    // 找到最近的类

    // 给二级菜单添加highlight类
    for (let i = 0; i < siblings.length; i++) {
      siblings[i].classList.remove('highlight')
    }
    li.classList.add('highlight')
  }

// 二级菜单展示
  let liTags = document.querySelectorAll('nav.menu > ul > li')
  for (let i = 0; i < liTags.length; i++) {
    liTags[i].onmouseenter = function (e) {
      e.currentTarget.classList.add('active')
    }
    liTags[i].onmouseleave = function (e) {
      e.currentTarget.classList.remove('active')
    }
  }
}.call()