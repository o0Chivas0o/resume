// 给loading一个函数 让别人看得到
setTimeout(function () {
  siteWelcome.classList.remove('active')
},1500)



portfolio1.onclick= function(){
  portfolioBar.className = 'bar state-1'
}
portfolio2.onclick= function(){
  portfolioBar.className = 'bar state-2'
}
portfolio3.onclick= function(){
    portfolioBar.className = 'bar state-3'
  }
