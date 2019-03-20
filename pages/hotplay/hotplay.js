var  app = getApp()
var start =0;
var count=10;
var total=0 

const util = require('../../utils/util.js')

Page({
  data:{
    hotPlay:[],
    loading:false
  },
  onLoad: function (options) {
    this.getHotPlayMovie();
  },
   getHotPlayMovie: function (loading = false) {
    if (start > total) { return }
    let _this = this;
    loading && this.setData({ loading });
    wx.showNavigationBarLoading();
    wx.request({
      url: `${app.globalData.baseURL}/v2/movie/in_theaters?apikey=${app.globalData.apiKey}&city=${wx.getStorageSync('city')}&start=${start}&count=${count}`,
      method: 'GET',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data.subjects)
        _this.setData({
          hotPlay: [..._this.data.hotPlay, ...res.data.subjects]
        });
        start += count;
        total = res.data.total;

        // 缓存数据
        start === 10 && wx.setStorageSync('hotMovies', _this.data.hotPlay.map(item => {
          return { id: item.id, title: item.title }
        }));

      },
      complete: function () {
        wx.hideNavigationBarLoading();
        _this.setData({ loading: false });
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return{
      title: '热映电影'
    }
  },
  /**
  * 页面相关事件处理函数--监听用户下拉动作
  */
  onPullDownRefresh: function () {
    // this.getHotPlayMovie(false);
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getHotPlayMovie(true);
  },




})