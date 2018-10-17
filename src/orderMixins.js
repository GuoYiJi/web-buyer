import wx from 'wx';
import API from '@/api/httpShui';
export default {
  methods: {

    // 订单支付
    payAsync(orderId) {
      return new Promise(async (resolve, reject) => {

        wx.showLoading({ title: '请求支付中' });
        const data = await API.wxSign({ orderId });
        wx.hideLoading();
        if (data.code === 1) {
          let obj = data.data
          wx.requestPayment({
            timeStamp: obj.timeStamp,
            nonceStr: obj.nonceStr,
            package: obj.package,
            signType: obj.signType,
            paySign: obj.paySign,
            success: function (res) {
              resolve();
            },
            fail: function (res) {
              reject();
            }
          })
        } else {
          reject();
        }
      })
    },

    // 删除订单
    handleOrderDelete(orderId) {
      return new Promise((resolve, reject) => {
        wx.showModal({
          title: '删除订单',
          content: '确认删除订单吗？',
          success: async res => {
            if (res.confirm) {
              wx.showLoading()
              const { code, data } = await API.delOrderShow({ orderId });
              wx.hideLoading();
              try {
                if (code === 1) {
                  wx.showToast({
                    title: '删除成功',
                    icon: 'none'
                  })
                  resolve();
                } else {
                  wx.showToast({
                    title: data,
                    icon: 'none'
                  })
                  reject();
                }
              } catch (err) {
                console.log(err);
              }
            } else {
              reject();
            }
          }
        })
      })
    },

    // 关闭订单
    handleOrderCancel(orderId) {
      return new Promise((resolve, reject) => {
        wx.showModal({
          title: '取消订单',
          content: '确认取消订单吗？',
          success: async res => {
            if (res.confirm) {
              wx.showLoading()
              const { code, data } = await API.cancelOrder({ orderId });
              wx.hideLoading();
              if (code === 1) {
                wx.showToast({
                  title: '取消成功',
                  icon: 'none'
                })
                resolve();
              } else {
                wx.showToast({
                  title: data,
                  icon: 'none'
                })
                reject();
              }
            } else {
              reject();
            }
          }
        })
      })
    },

    // 申请售后
    handleOrderAfterSale(orderId, price, freight, type) {

      this.$router.push({
        path: '/pages/refund/applyCustomer',
        query: {orderId, price, freight, type}
      })
    },

    // 查看物流
    handleLogistics(orderId) {
      this.$router.push({
        path: '/pages/my/logistics',
        query: {
          orderId
        }
      })
    },
    handleGoodsDetail(goodsId) {
      this.$router.push({
        path: '/pages/home/details/details',
        query: {
          goodsId
        }
      })
    },
    
    // 确认收货
    handleOrderDone(orderId) {
      return new Promise((resolve, reject) => {
        
        wx.showModal({
          title: '确认收货',
          content: '请确认已经收到宝贝！',
          success: async res => {
            if (res.confirm) {
              wx.showLoading()
              const { code, data } = await API.sureOrder({orderId});
              wx.hideLoading();
              if (code === 1) {
                wx.showToast({
                  title: '收货成功',
                  icon: 'none'
                })
                resolve();
              } else {
                wx.showToast({
                  title: data,
                  icon: 'none'
                })
                reject();
              }
            } else {
              reject();
            }
          }
        })
      })
    },
    
    // 去子订单详情
    handleChildClick(item) {
      this.$router.push({
        path: '/pages/my/orderDetails/sub',
        query: { id: item.id, xq: item.state }
      })
    },

    handleShopListClick(goodsList) {
      goodsList = JSON.stringify(goodsList);
      this.$router.push({
        path: '/pages/my/shopList',
        query: {
          goodsList
        }
      })
    }
  }

}