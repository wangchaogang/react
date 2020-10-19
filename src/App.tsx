import React from 'react';
//引入axios的地方，这里没有配置代理服务器，post请求可能会触发跨域问题，
//正常情况需要再webpack中配置一下请求
import axios from 'axios';
//引入ui框架
import { Form, Input, Button, message } from 'antd';
//这个ui框架的css部分需要在app.css 进行一个css3提供的引入
import './App.css';
//ts 的语法声明一个变量名，HelloProps，使用这个变量名可以验证父级传入的值
//这个案例里面没有用到传值，写到这里是为了让你看一下怎么验证父级穿来的值
export interface HelloProps { name: number }
//layout 是 antd ui框架input界面布局的比例问题，有点类似弹性盒
const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
};
// tailLayout 登录按钮的布局分配问题
const tailLayout = {
  wrapperCol: { offset: 2, span: 22 },
};
// 声明的react组件，和class类继承的方法类似，但是这个更简单化，
// 但是继承的方式的逻辑性更强，生命周期也更完整
function App(props:any) {
  // axios 发送post数据需要转化为&拼接的形式，这个是做的数据处理
  const strparse = (json:any)=>{
    let arr = []
    for(let i in json){
      arr.push(i+'='+json[i])
    }
    let str = arr.join('&')
    return str
  }
  //点击登录按钮触发
  const onFinish = (values:{}) => {
    console.log('OK:',values);
    axios.post('http://39.101.217.150:8086/account/login',strparse(values),{
      headers:{
        'Content-Type':'application/x-www-form-urlencoded'
      }
    }).then((data)=>{
      // console.log(data)
      if(data.data.msg =='成功'){
        message.success('恭喜你，登录成功')
      }else{
        message.error('很遗憾，登录失败了')
      }
      console.log(data)
    })
  };
  //提交表单且数据验证失败后回调事件
  const onFinishFailed = (errorInfo:any) => {
    console.log('Failed:', errorInfo);
  };
  //xml 代码片段
  return (
    <div className="App">
      <div className="logo"></div>
      <div className="login">
        <div className="title">
          登录
        </div>
        <div className="forminput">
          <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="账号"
              name="username"
              rules={[{ required: true, message: '账号不能为空'}]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="密码"
              name="password"
              rules={[{ required: true, message: '密码不能为空'}]}
            >
              <Input.Password/>
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                确定
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default App;
