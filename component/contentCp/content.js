// component/contentCp/content.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      time:String
  },

  /**
   * 组件的初始数据
   */
  data: {
      time:"",
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onShareAppMessage(msg) {
      if (msg.from === "menu") {
        return {
          title: "震惊！居然有如此简洁的小程序",
          path: ""
        }
      }
      else if (msg.from === "button") {
        return {
          title: "文章标题",
          path: ""
        }
      }
    }
  }
})
