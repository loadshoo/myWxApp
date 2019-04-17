//app.js
wx.cloud.init();
const db = wx.cloud.database('start-project-8582df');
App({
    onLaunch: function() {
        //初始化云端数据库
        wx.cloud.init({
            traceUser: true,
            env: 'start-project-8582df'
        })
        // 展示本地存储能力
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)
    },
    globalData: {
        userInfo: null
    },
    //封装获取数据的collection.get方法
    getData(name, method, data) {
        return new Promise((reslove, reject) => {
            db.collection(name)[method](data || {})
                .get({
                    success(res) {
                        reslove(res)
                    },
                    fail(err) {
                        reject(err)
                    }
                })
        })
    },
    //封装collection.add方法
    addData(name, data) {
        return new Promise((reslove, reject) => {
            db.collection(name)
                .add({
                    data: data || {},
                    success(res) {
                        reslove(res)
                    },
                    fail(err) {
                        reject(err)
                    }
                })
        })
    },
    //封装云函数
    callFunction(name) {
        return new Promise((reslove, reject) => {
            wx.cloud.callFunction({
                name: name,
                success(res) {
                    reslove(res)
                },
                fail(err) {
                    reject(err)
                }
            })
        })
    },
    //封装缓存方法
    getStorage(key) {
        return new Promise((reslove, reject) => {
            wx.getStorage({
                key: key,
                success(res) {
                    reslove(res)
                },
                fail(err) {
                    reject(err)
                }
            })
        })

    }
})