//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        content: true,
        help: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        datas:""
    },
    onMyEvent(e) {
        this.setData({
            content: e.detail.content,
            help: e.detail.help
        })
    },
  onShareAppMessage(msg){
    if(msg.from==="menu"){
      return {
        title:"震惊！居然有如此简洁的小程序",
        path:""
      }
    }
    else if (msg.from === "menu") {
      return {
        title: "文章标题",
        path: ""
      }
    }
  },
  onLoad(){
      //获取云端数据
      wx.cloud.init();
      const db = wx.cloud.database();
      const that = this;
      db.collection("content").doc('5cb075ad8852e71926067b2c').get({
          success(msg) {
              console.log(msg.data.content)
              that.setData({
                  datas:msg.data.content
              })
          },
          fail: console.error
      })
  }
})