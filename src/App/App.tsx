import React from 'react';
import './App.css';

import { Layout, Button } from 'antd';

const { Header, Footer, Content } = Layout;



function App() {
  return (
    <div className="App">
      <Layout>
        <Header>
          <h1>
            Payks VR Demos: Overview
          </h1>
        </Header>

        <Content>
          <p>
            <h1>
              VR Demos design for Oculus Quest 2
            </h1>

            <Button type="primary">Start VR</Button>
          </p>

          <p>
            <h1>
            360 Demos design mobile phones, tablets ect
            </h1>

            <Button type="primary">Start 360</Button>
          </p>

        </Content>

        <Footer>
          Some disclaimer stuff
        </Footer>
      </Layout>


      
    </div>
  );
}

export default App;
