//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        content: true,
        help: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        datas: "",
        loading: false,
        feedBackTxt: "",
    },
    onMyEvent(e) {
        this.setData({
            content: e.detail.content,
            help: e.detail.help
        })
    },
    onShareAppMessage(msg) {
        if (msg.from === "menu") {
            return {
                title: "震惊！居然有如此简洁的小程序",
                path: ""
            }
        } else if (msg.from === "menu") {
            return {
                title: "文章标题",
                path: ""
            }
        }
    },
    onLoad() {
        //获取云端数据
        wx.cloud.init();

        // const db = wx.cloud.database('start-project-8582df');
        const that = this;
        app.getData("index_datas", "doc", "5cb16b578852e71926082a96")
            .then(res => {
                that.setData({
                    datas: res.data.datas,
                    loading: true
                })
            })
            .catch(err => {
                console.error
            })
        app.getData("feedBack", "where")
            .then(res => {
                that.setData({
                    feedBackTxt: res
                })
            })

    },
    onPullDownRefresh() {
        const that = this;
        if (that.data.content) {
            app.getData("index_datas", "doc", "5cb16b578852e71926082a96")
                .then(res => {
                    that.setData({
                        datas: res.data.datas
                    });
                    wx.stopPullDownRefresh();
                    wx.showToast({
                        title: '刷新成功',
                        icon: 'success',
                        duration: 1000
                    })
                })
                .catch(res => {
                    console.error;
                    wx.stopPullDownRefresh();
                })

        }
        if (that.data.help) {
            app.getData("feedBack", "where")
                .then(res => {
                    that.setData({
                        feedBackTxt: res
                    })
                    wx.stopPullDownRefresh();
                    wx.showToast({
                        title: '刷新成功',
                        icon: 'success',
                        duration: 1000
                    })
                })
                .catch(res => {
                    console.error;
                    wx.stopPullDownRefresh();
                })
        }
    }
})