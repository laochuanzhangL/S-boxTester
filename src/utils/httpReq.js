/* 
  自定义封装的http请求方法——httpReq
  其中对错误进行了统一处理
*/
import axios from 'axios'
import { message } from 'antd'
import cookies from "react-cookies"
// 给请求地址前加一个"/api"，在请求头中添加Token
//设置请求携带cookie
const token = cookies.load("token")
const instance = axios.create({
  baseURL: '/api',
  withCredentials: true
})
// 添加返回拦截器，直接获取返回内容的data
instance.interceptors.response.use((res) => {
  return res.data
})
// 封装axios方法，并导出httpReq为新的请求工具
export const httpReq = (method, url, data, headerMsg) => {
  return new Promise((resolve, reject) => {
    instance({
      method: method,
      url: url,
      data: data,
      headers: { headerMsg, "token": token }
    }).then(
      (data) => {
        resolve(data)
      },
      (err) => {
        // 错误在这统一处理 
        const status = err.response.status
        const errInfo = err.response.data.message || status
        // 将错误信息传递下去
        reject({ status, errInfo })
        // 根据状态码做提示处理
        switch (status) {
          case 400:
            message.error(`User are not login: ${errInfo}`)
            break
          case 401:
            cookies.remove("token", { path: '/' })
            message.error(`You are not login, please login first~`)
            setTimeout(() => {
              window.location.href = '/'
            }, 1000)
            break
          case 404:
            message.error(`Failed to find the resource: ${errInfo}`)
            break
          case 500:
            message.warning(`服务器未能处理`)
            break
          default:
            message.error(`Wrong message: ${errInfo}`)
            break
        }
      }
    )
  })
}
