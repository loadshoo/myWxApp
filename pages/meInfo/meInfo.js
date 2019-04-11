// pages/meInfo/meInfo.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        login: "",
        username: "",
        userinfo: "",
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let that = this;
        wx.checkSession({
            success(msg) {
                that.setData({
                    login: true
                });
                wx.login({
                    timeout: 10000,
                    success(msg) {
                        console.log(msg.code)
                        if (msg.code) {
                            wx.getUserInfo({
                                success(res) {
                                    that.setData({
                                        userinfo: res.userInfo
                                    });
                                }
                            })
                        }
                    }
                })
            },
            fail(msg) {
                that.setData({
                    login: false
                })
            }
        })
    },
    //   未登录时点击登录
    ftLogin() {
        var that = this;
        wx.login({
            timeout: 10000,
            success(msg) {
                console.log(msg.code)
                if (msg.code) {
                    wx.getUserInfo({
                        success(res) {
                            that.setData({
                                login: true,
                                userinfo: res.userInfo
                            });
                        }
                    })
                }
            }
        })
    },
    //退出登录
    logout() {
        var that = this;
        that.setData({
            login: false,
            userInfo: ""
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