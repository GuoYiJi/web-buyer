import wx from 'wx';
export default {
  methods: {
    validate(data) {
      return new Promise((resolve, reject) => {
        let _relust = {
          errMsg: ''
        };
        console.log(data);
        if (!data.name) {
          _relust.errMsg = '收货人不能为空';
        } else if (!(/^1[34578]\d{9}$/.test(data.mobile))) {
          _relust.errMsg = '请输入手机号码';
        } else if (!data.value) {
          _relust.errMsg = '所在地址不能为空';
        } else if (!data.address) {
          _relust.errMsg = '请填写地区';
        }
        if (_relust.errMsg) {
          console.log(data);
          wx.showToast({
            title: _relust.errMsg,
            icon: 'none'
          })
          reject();
        } else {
          resolve();
        }
      })
    }
  }
}