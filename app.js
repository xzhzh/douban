//app.js
// 获取经纬度
function getLocation() {
  wx.getLocation({
    type: 'wgs84',   //默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标 
    success: function (res) {
      console.log(res)
      loadCity(res.longitude, res.latitude)
    },
    fail: function () {
      wx.setStorageSync('city', '广州');
    }
  })
}

// 根据经纬度获取详细位置信息
function loadCity(longitude, latitude){
  wx.request({
    url: `https://api.map.baidu.com/geocoder/v2/?ak=vRMBKAuYo2cw3AloqUQjAxPd2wuLee4G=${latitude},${longitude}&output=json`,
    method: 'GET',
    header: {
      'Content-Type': 'application/json'
    },
    success: function (res) {
      var city = res.data.result.addressComponent.city;
      wx.setStorageSync('city', city);
    }
  })
}


App({
  onLaunch: function () {
    // getLocation();
  },
  globalData: {
    baseURL: 'https://api.douban.com',
    apiKey: '0b2bdeda43b5688921839c8ecb20399b',
    bMapKey: 'vRMBKAuYo2cw3AloqUQjAxPd2wuLee4G'
  }
})