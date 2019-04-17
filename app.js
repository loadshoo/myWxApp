//app.js
wx.cloud.init();
const db = wx.cloud.database('start-project-8582df');
App({
  onLaunch: function() {
    const updateManager = wx.getUpdateManager();

    updateManager.onCheckForUpdate(function(res) {
      // 请求完新版本信息的回调
    });
    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success(res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    });
    updateManager.onUpdateFailed(function() {
      // 新版本下载失败
      wx.showToast({
        title: '请检查网络',
        icon: "none"
      })
    });
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