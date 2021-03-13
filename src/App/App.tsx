import React from 'react';
import './App.css';

import { Layout, Button, Card, Row, Col } from 'antd';

const { Header, Footer, Content } = Layout;



function App() {
  return (
    <div className="App">
      <Layout>
        <Header style={{ boxShadow: '7px 7px 0px 0px #EBEBEB' }}>
          <h1>
            Payks VR Demos: Overview
          </h1>
        </Header>
        
        <Content>

        <Row>
          <Col span={8}></Col>
          <Col span={8}>
            <Card style={{ display: 'inline-block', width: '100%', maxWidth: 300, margin:'15px', boxShadow: '7px 7px 0px 0px #EBEBEB' }}>
              <h1>
                VR Demos designed for Oculus Quest 2
              </h1>

              <Button type="primary">Start VR</Button>
            </Card>

            <Card style={{ display: 'inline-block', width: '100%', maxWidth: 300, margin:'15px', boxShadow: '7px 7px 0px 0px #EBEBEB' }}>
              <h1>
                360 Demos designed mobile phones, tablets ect
              </h1>

              <Button type="primary">Start 360</Button>
            </Card>
          </Col>
          <Col span={8}></Col>
        </Row>



        </Content>

        <Footer>
          Some disclaimer stuff
        </Footer>
      </Layout>


      
    </div>
  );
}

export default App;
