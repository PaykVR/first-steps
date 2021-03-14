import React from 'react';

import styled from 'styled-components';
import { Layout as pLayout, Button, Card as pCard, Row, Col } from 'antd';

const pHeader = pLayout.Header;
const pFooter = pLayout.Footer;
const pContent = pLayout.Content;

const AppContainer = styled.div`
  height: 100%;
  display: block;
  text-align: center;
`;

const Header = styled(pHeader)`
  background: #7dbcea;
  box-shadow: 7px 7px 0px 0px #EBEBEB;
`;

const Layout = styled(pLayout)`
  height: 100%;
`;

const Footer = styled(pFooter)`
  background: #7dbcea;
`;

const Content = styled(pContent)`
  flex: 1;
  overflow-x: hidden;
  overflow-y: auto;
`;

const Card = styled(pCard)`
  display: inline-block;
  width: 100%;
  max-width: 300;
  margin: 15px;
  box-shadow: 7px 7px 0px 0px #EBEBEB;
`;

function App() {
  return (
    <AppContainer>
      <Layout>
        <Header>
          <h1>
            Payks VR Demos: Overview
          </h1>
        </Header>
        
        <Content>
          <Row>
            <Col span={8}></Col>
            <Col span={8}>
              <Card>
                <h3>
                  VR Demos designed for Oculus Quest 2
                </h3>

                <Button type="primary">Start VR</Button>
              </Card>

              <Card>
                <h3>
                  360 Demos designed mobile phones, tablets ect
                </h3>

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
    </AppContainer>
  );
}

export default App;
