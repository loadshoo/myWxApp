// component/helpCp/help.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    feedBackTxt: Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    feedBackTxt: "",
    txt: ""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    feedBack(txt) {
      this.setData({
        txt: txt.detail.value
      })
    },
    feedSend() {
      var that = this;
      app.getStorage("isLogin")
        .then(res => {
          return app.addData('feedBack', {
            feedTxt: that.data.txt,
            avatarUrl: res.data.avatarUrl,
            nickName: res.data.nickName,
          })
        })
        .then(res => {
          wx.showToast({
            title: '发送成功',
          });
          that.setData({
            txt: ""
          });
          return app.getData('feedBack', "where")
        })
        .then(res => {
          that.setData({
            feedBackTxt: res
          })
        })
        .catch(err => {
          if (err.errMsg === "getStorage:fail data not found") {
            wx.showToast({
              title: '请先登录',
              icon: "none"
            })
          }
        })
    }
  }
})