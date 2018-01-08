// 给loading一个函数 让别人看得到
setTimeout(function () {
  siteWelcome.classList.remove('active')
},0)

// stickyNavBar
window.onscroll = function (e) {
  window.scrollY > 0 ? topNavBar.classList.add('sticky') : topNavBar.classList.remove('sticky')
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
