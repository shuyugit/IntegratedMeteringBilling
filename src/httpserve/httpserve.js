/* eslint-disable */
import axios from 'axios'
// import axios from '@/plugin/axios'
import qs from "qs"

axios.defaults.timeout = 40000;
axios.defaults.baseURL = "http://172.21.29.55:9923/";
// http request 拦截器
axios.interceptors.request.use(
  config => {
    // const token = getCookie('名称');注意使用的时候需要引入cookie方法，推荐js-cookie
    config.data = qs.stringify(config.data);
    config.headers = {
      'Content-Type': 'application/json'
    }
    // if(token){
    //   config.params = {'token':token}
    // }
    return config;
  },
  error => {
    if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
      this.$message.error('错了哦，这是一条错误消息');
      ("请求超时")
    }
    return Promise.reject(err);
  }
);


// http response 拦截器
axios.interceptors.response.use(
  response => {
    if (response.data.errCode == 2) {
      router.push({
        path: "/login",
        querry: {
          redirect: router.currentRoute.fullPath
        } //从哪个页面跳转
      })
    }
    return response;
  },
  error => {
    return Promise.reject(error)
  }
)
/**
 * 封装loginfo方法
 * @param code
 * @param data
 * @returns {Promise}
 */
export function loginfo(msg, msg1, msg2) {
  console.info((msg != '' && msg) ? msg : '', (msg1 != '' && msg1) ? msg1 : '', (msg2 != '' && msg2) ? msg2 : '')
}
/**
 * 封装errMsg请求
 * @param code
 * @param data
 * @returns {Promise}
 */
export function errMsg(msg = {}) {
  this.$message({
    showClose: true,
    message: '请求出错:' + msg,
    type: 'error'
  });
}
/**
 * 封装post请求
 * @param code
 * @param data
 * @returns {Promise}
 */

export function post(method, data, msg = {}) {
  if (isEmptyObject(msg)) { } else {
    this.fullscreenLoading = true;
  }
  var calUrl = axios.defaults.baseURL + method
  return new Promise((resolve, reject) => {
    var param = JSON.stringify(data);
    console.info('转换后---', param)
    axios.post(calUrl, param)
      .then(response => {
        if (isEmptyObject(msg)) { } else {
          setTimeout(function () {
            this.fullscreenLoading = false;
          }, 500)
        }
        var result = JSON.parse(response.data.result)
        resolve(result);
      }, err => {
        reject(err)
      })
      .catch(err => {
        reject(err)
        console.info(err)
        // this.errMsg(err)
      })
  })
}

/**
 * 判断是否为空
 * @param obj
 * @returns {Promise}
 */
function isEmptyObject(obj) {
  for (var key in obj) {
    return false; //返回false，不为空对象
  }
  return true; //返回true，为空对象
}

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function fetch(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    })
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err)
      })
  })
}




/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err)
      })
  })
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err)
      })
  })
}