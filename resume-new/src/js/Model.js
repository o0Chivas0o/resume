export default function(){
  window.Model = function(options){
    let resourceName = options.resourceName
    return {
      init: function () {
        let APP_ID = 'JLMh9Uyk8yngdHl7RjiKtBvJ-gzGzoHsz'
        let APP_KEY = 'eFTOCJrbFsKTdigcxbv3jRog'
        AV.init({appId: APP_ID, appKey: APP_KEY})
      },
      fetch: function () {
        let query = new AV.Query(resourceName)
        return query.find()
      },
      save: function (object) {
        let X = AV.Object.extend(resourceName)
        let x = new X()
        return x.save(object)
      }
    }
  }
}