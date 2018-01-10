// 给loading一个函数 让别人看得到
setTimeout(function () {
  siteWelcome.classList.remove('active')
  // stickyNavBar
  window.onscroll = function () {
    window.scrollY > 0 ? topNavBar.classList.add('sticky') : topNavBar.classList.remove('sticky')
    // 滚动到对应锚点 二级菜单对应标签高亮
    let specialTags = document.querySelectorAll('[data-x]')
    let minIndex = 0
    for(let i = 0;i<specialTags.length;i++){
      if(Math.abs(specialTags[i].offsetTop - window.scrollY) < Math.abs(specialTags[minIndex].offsetTop - window.scrollY)){
        minIndex = i
      }
    }
    let id = specialTags[minIndex].id
    let a = document.querySelector(`a[href="#${id}"]`)
    let li = a.parentNode
    let siblings =  li.parentNode.children
    for(let i = 0 ;i<siblings.length;i++){
     siblings[i].classList.remove('highlight')
    }
    li.classList.add('highlight')
  }
},1500)

// 二级菜单展示
let liTags = document.querySelectorAll('nav.menu > ul > li')
for(let i = 0;i<liTags.length;i++) {
  liTags[i].onmouseenter = function (e) {
    e.currentTarget.classList.add('active')
  }
  liTags[i].onmouseleave = function (e) {
    e.currentTarget.classList.remove('active')
  }
}

// 二级菜单点击标签 跳转对应锚点
function animate(time) {
  requestAnimationFrame(animate);
  TWEEN.update(time);
}
requestAnimationFrame(animate);


let aTags = document.querySelectorAll('nav.menu > ul > li > a')
for(let i = 0;i<aTags.length;i++){
  aTags[i].onclick = function(e){
    e.preventDefault()
    // let a = e.currentTarget
    // let href = a.getAttribute('href')
    // a.href 是浏览器解析后的带HTTP的地址,不是我想要的地址 这里得到的结果是 '#siteAbout'
    // let element = document.querySelector(href)
    // let top= element.offsetTop  // 获取对应锚点距离浏览器高度
    let top = document.querySelector(e.currentTarget.getAttribute('href')).offsetTop

    // 添加点击标签缓动动画
    let currentTop = window.scrollY
    let targetTop = top - 80
    let s = targetTop - currentTop
    let t = Math.abs((s/100)*300)
    if(t>500){t=500}
    let coords = { y: currentTop};
    let tween = new TWEEN.Tween(coords)
      .to({ y: targetTop}, t)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .onUpdate(function() {
        window.scrollTo(0,coords.y)
      })
      .start();
  }
}


portfolio1.onclick= function(){
  portfolioBar.className = 'bar state-1'
}
portfolio2.onclick= function(){
  portfolioBar.className = 'bar state-2'
}
portfolio3.onclick= function(){
    portfolioBar.className = 'bar state-3'
  }
