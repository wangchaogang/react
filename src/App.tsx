import React from 'react';
import axios from 'axios';
import { Form, Input, Button, message } from 'antd';
import './App.css';
export interface HelloProps { name: number }

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
};
const tailLayout = {
  wrapperCol: { offset: 2, span: 22 },
};
function App(props:any) {
  const strparse = (json:any)=>{
    let arr = []
    for(let i in json){
      arr.push(i+'='+json[i])
    }
    let str = arr.join('&')
    return str
  }
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

  const onFinishFailed = (errorInfo:any) => {
    console.log('Failed:', errorInfo);
  };

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
