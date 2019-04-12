// pages/content/content.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        id:"",
        datas:""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        //获取云端数据
        wx.cloud.init();
        const db = wx.cloud.database();
        const that = this;
        db.collection("content").doc('5cb075ad8852e71926067b2c').get({
            success(msg) {
                that.setData({
                    datas: msg.data.content[options.id-1],
                    
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