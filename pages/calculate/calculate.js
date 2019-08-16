// pages/calculate/calculate.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tqList:[]
  },
  // 获取铜钱正反面
  _random() {
    return Math.floor(Math.random() * 10)
  },
  toResult() {
    wx.navigateTo({
      url: '../result/result'
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let _this = this;
    let last_update = 0;
    let x, y, z, last_x = 0, last_y = 0, last_z = 0;
    wx.onAccelerometerChange(function (e) {
      if(_this.data.tqList.length === 6) {
        wx.stopAccelerometer();
        return;
      }
      let curTime = new Date().getTime();
      if(curTime - last_update > 100) {
        let diffTime = curTime - last_update;
        last_update = curTime;
        x = e.x;
        y = e.y;
        z = e.z;
        let speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000;
        if (speed > 120) {
          // 掉落一枚铜钱
          let data = _this.data.tqList;
          let random = _this._random();
          if (random > 4) {
            data.push(1)
          } else {
            data.push(0)
          }
          app.globalData.tqList = data
          _this.setData({
            tqList: data
          })
          wx.showToast({
            title: '掷出一枚铜钱',
            icon: 'success',
            duration: 1000
          })
        }
      }
    
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  }
})