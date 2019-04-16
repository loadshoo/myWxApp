// pages/content/content.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        id: "",
        datas: "",
        onloading: false,
        commentTxt: "",
        commentTxtAll: "",
    },
    //获取输入框内容
    onCommentTxt(event) {
        this.setData({
            commentTxt: event.detail.value
        })
    },
    //发送数据到数据库
    commentSend() {
        let that = this;
        let getCommentTxt = this.data.commentTxt;
        //获取缓存，检查是否登录
        wx.getStorage({
            key: 'isLogin',
            success: function(res) {
                //初始化云数据库
                wx.cloud.init;
                const db = wx.cloud.database();
                //讲评论数据添加到数据库中
                db.collection("comments")
                    .add({
                        data: {
                            id: that.data.id,
                            commentTxt: getCommentTxt,
                            avatarUrl: res.data.avatarUrl,
                            nickName:res.data.nickName
                        },
                        success(res) {
                            console.log(res._id)
                            //根据id值进行判断评论的哪一个页面，然后进行渲染
                            db.collection("comments")
                                .where({
                                    id: that.data.id,
                                }).get({
                                    success(msg) {
                                        that.setData({
                                            id: that.data.id,
                                            commentTxtAll: msg,
                                            commentTxt: "",
                                            onloading: true
                                        })
                                    },
                                    fail: console.error
                                })
                            wx.showToast({
                                title: '发送成功',
                            })
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
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        //获取云端数据
        wx.cloud.init();
        const db = wx.cloud.database();
        const that = this;

        db.collection("index_datas").doc('5cb16b578852e71926082a96').get({
            success(msg) {
                that.setData({
                    id: options.id,
                    datas: msg.data.datas[options.id - 1],
                    onloading: true
                })
            },
            fail: console.error
        });
        db.collection("comments")
            .where({
                id: options.id,
            }).get({
                success(msg) {
                    that.setData({
                        id: options.id,
                        commentTxtAll: msg,
                        onloading: true
                    })
                },
                fail: console.error
            })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})