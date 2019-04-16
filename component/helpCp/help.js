// component/helpCp/help.js
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
            wx.getStorage({
                key: 'isLogin',
                success: function(res) {
                    wx.cloud.init;
                    const db = wx.cloud.database()
                    db.collection('feedBack')
                        .add({
                            data: {
                                feedTxt: that.data.txt,
                                avatarUrl: res.data.avatarUrl,
                                nickName: res.data.nickName,
                            },
                            success(msg) {
                                db.collection('feedBack')
                                    .get({
                                        success(e) {
                                            console.log(e)
                                            that.setData({
                                                feedBackTxt: e
                                            })
                                        }
                                    })
                                wx.showToast({
                                    title: '发送成功',
                                });
                                that.setData({
                                    txt: ""
                                });
                                
                            }
                        })
                },
                fail(res) {
                    wx.showToast({
                        title: '请先登录',
                        icon: "none"
                    })
                }
            })
        },
    },

})