// 给loading一个函数 让别人看得到
setTimeout(function () {
  siteWelcome.classList.remove('active')
  // stickyNavBar
  window.onscroll = function (e) {
    window.scrollY > 0 ? topNavBar.classList.add('sticky') : topNavBar.classList.remove('sticky')
  }
},1500)

let liTags = document.querySelectorAll('nav.menu > ul > li')
for(let i = 0;i<liTags.length;i++) {
  liTags[i].onmouseenter = function (e) {
    e.currentTarget.classList.add('active')
  }
  liTags[i].onmouseleave = function (e) {
    e.currentTarget.classList.remove('active')
  }
}

let aTags = document.querySelectorAll('nav.menu > ul > li > a')
for(let i = 0;i<aTags.length;i++){
  aTags[i].onclick = function(e){
    e.preventDefault()
    let a = e.currentTarget
    let href = a.getAttribute('href')
    // a.href 是浏览器解析后的带HTTP的地址,不是我想要的地址 这里得到的结果是 '#siteAbout'
    let element = document.querySelector(href)
    let top = element.offsetTop  // 获取对应锚点距离浏览器高度是多少
    window.scrollTo(0,top - 80)
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
