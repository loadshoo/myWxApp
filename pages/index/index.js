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
        feedBackTxt: ""
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
        db.collection("index_datas")
            .doc('5cb16b578852e71926082a96')
            .get({
                success(msg) {
                    that.setData({
                        datas: msg.data.datas,
                        loading: true
                    })
                },
                fail: console.error
            });
        db.collection('feedBack')
            .get({
                success(res) {
                    console.log(res)
                    that.setData({
                        feedBackTxt: res
                    })
                }
            })
    },
    onPullDownRefresh() {
        const that = this;
        wx.cloud.init();
        const db = wx.cloud.database('start-project-8582df');
        if (that.data.content) {
            db.collection("index_datas")
                .doc('5cb16b578852e71926082a96')
                .get({
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
        if (that.data.help){
            db.collection('feedBack')
                .where({
                    id: "1"
                }).get({
                    success(res) {
                        that.setData({
                            feedBackTxt: res
                        })
                        wx.stopPullDownRefresh();
                        wx.showToast({
                            title: '刷新成功',
                            icon: 'success',
                            duration: 1000
                        })
                    },
                    fail(){
                        wx.stopPullDownRefresh();
                    }
                })
        }
    }
})