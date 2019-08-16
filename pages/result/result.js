//获取应用实例
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    result: [],
    resultText: '',
    resultTextList: ['坤为地', '山地剥', '水地比', '风地观', '雷地豫', '火地晋', '泽地萃', '天地否', '地山谦', '艮为山', '水山蹇', '风山渐', '雷山小过', '火山旅', '泽山咸', '天山退', '地水师', '山水蒙', '坎为水', '风水涣', '雷水解', '火水未济', '泽水困', '天水讼', '地风升', '山风蛊', '水风井', '巽为风', '雷风恒', '火风鼎', '泽风大过', '天风姤', '地雷复', '山雷颐', '水雷屯', '风雷益', '震为雷', '火雷噬嗑', '泽雷随', '天雷无妄', '地火明夷', '山火贲', '水火既济', '风火家人', '雷火丰', '离为火', '泽火革', '天火同人', '地泽临', '山泽损', '水泽节', '风泽中孚', '雷泽归妹', '火泽睽', '兑为泽', '天泽履', '地天泰', '山天大畜', '水天需', '风天小畜', '雷天大壮', '火天大有','泽天夬','乾为天'],
    resultExplain: ''
    // resultCode: ['000000','100000','010000','110000','001000','101000','011000','111000','000100','100100','010100','110100','001100'
    // ,'101100','011100',''
    // ]
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      result: app.globalData.tqList
    })
    this.drawResult()
    this.calcuResult()
    // 解签
    this.getExplain()
  },
  drawResult: function () {
    const ctx = wx.createCanvasContext('res')
    ctx.beginPath()
    ctx.setLineCap('butt')
    ctx.setLineWidth(10)
    let len = this.data.result.length - 1
    console.log(this.data.result);
    this.data.result.map(function (o, i) {
      if (o === 1) {
        ctx.moveTo(10, 30 + (len - i) * 20)
        ctx.lineTo(150, 30 + (len - i) * 20)
      } else {
        ctx.moveTo(10, 30 + (len - i) * 20)
        ctx.lineTo(70, 30 + (len - i) * 20)
        ctx.moveTo(90, 30 + (len - i) * 20)
        ctx.lineTo(150, 30 + (len - i) * 20)
      }
    })
    ctx.stroke()
    ctx.draw()
  },
  calcuResult: function () {
    let res = this.data.result
    let up = res.slice(3).join("")
    let down = res.slice(0, 3).join("")
    console.log(parseInt(up,2), parseInt(down,2))
    let sum = parseInt(up, 2) + parseInt(down, 2) * 8
    this.setData({
      resultText: this.data.resultTextList[sum]
    })
  },
  getExplain: function() {
    let _this = this;
    let url = 'https://jinqiangua.911cha.com/' + this.data.result.reverse().join("") + '.html'
    wx.request({
      url: url,
      success(res) {
        let DIV_BODY = /<div[^>]*>([\s\S]*)<\/div>/
        let result = DIV_BODY.exec(res.data)
        console.log(result)
        _this.setData({
          resultExplain: result[1]
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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