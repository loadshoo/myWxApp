// pages/meInfo/meInfo.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        login: "",
        username: "",
        userInfo: "",
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this;
        wx.getStorage({
            key: 'isLogin',
            success: function(res) {
                that.setData({
                    userInfo:res.data,
                    login: true,
                })
            },
            fail(res){
                console.log(res)
            }
        })
    },
    //   未登录时点击登录
    ftLogin(e) {
        var that = this
        if (e.detail.errMsg === "getUserInfo:ok") {
            //初始化云端数据库
            wx.cloud.init;
            //调用login云函数
            wx.cloud.callFunction({
                name: "login",
                success(res) {
                    //获取用户唯一标识openID
                    let uuid = res.result.openid;
                    const db = wx.cloud.database('start-project-8582df');
                    //查询数据库中是否已保存用户数据
                    db.collection('userInfo')
                        .where({
                            _openid: uuid
                        }).get({
                            success(msg) {
                                //判断是否已保存过用户数据
                                //大于0表示已存在，则不需要保存
                                if (msg.data.length > 0) {
                                    return
                                } else {
                                    //否则就添加用户数据到数据库
                                    db.collection('userInfo').add({
                                        data: {
                                            avatarUrl: e.detail.userInfo.avatarUrl,
                                            nickName: e.detail.userInfo.nickName
                                        },
                                        success(date) {

                                        }
                                    })
                                }
                            }
                        })

                }
            })
            wx.showToast({
                title: '登录成功',
            });
            //设置缓存，判断是否登录
            wx.setStorage({
                key: 'isLogin',
                data: e.detail.userInfo,
            })
            //无论数据库是否存在用户信息，都可以获取到信息
            this.setData({
                userInfo: e.detail.userInfo,
                login: true,
            })
        } else {
            wx.showToast({
                title: '请允许授权',
                icon: "none"
            });
        }

    },
    //退出登录
    logout() {
        var that = this;
        that.setData({
            login: false,
            userInfo: ""
        });
        //清除缓存
        wx.removeStorage({
            key: 'isLogin',
            success: function(res) {

            },
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