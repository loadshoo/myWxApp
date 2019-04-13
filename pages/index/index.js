//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        content: true,
        help: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        datas: "",
        loading: false
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
        const db = wx.cloud.database('start-project-8582df');
        const that = this;
        db.collection("index_datas").doc('5cb16b578852e71926082a96').get({
            success(msg) {
                that.setData({
                    datas: msg.data.datas,
                    loading: true
                })
            },
            fail: console.error
        })
    },
    onPullDownRefresh() {
        const that = this;
        wx.startPullDownRefresh({
            success(res) {
                wx.cloud.init();
                const db = wx.cloud.database('start-project-8582df');
                db.collection("index_datas").doc('5cb16b578852e71926082a96').get({
                    success(msg) {
                        that.setData({
                            datas: msg.data.datas
                        });
                        wx.stopPullDownRefresh();
                        wx.showToast({
                            title: '刷新成功',
                            icon: 'success',
                            duration: 1000
                        })
                    },
                    fail() {
                        console.error;
                        wx.stopPullDownRefresh()
                    }
                })
            }
        })
    }
})