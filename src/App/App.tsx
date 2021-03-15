import React, {useState} from 'react';

import styled from 'styled-components';
import { Layout as pLayout, Button, Card as pCard, Row, Col, Switch } from 'antd';

import ContentWithParallax from './Components/ContentWithParallax';
import {useDeviceOrientation} from './Hooks/UseDevcieOrientation';


const pHeader = pLayout.Header;
const pFooter = pLayout.Footer;
const pContent = pLayout.Content;

const boxShadow = '7px 7px 0px 0px rgba(0, 0, 0, .25)'

const AppContainer = styled.div`
  height: 100%;
  display: block;
  text-align: center;
`;

const Header = styled(pHeader)`
  background: #7dbcea;
  box-shadow: ${boxShadow};
`;

const Layout = styled(pLayout)`
  height: 100%;
`;

const Footer = styled(pFooter)`
  background: #7dbcea;
`;

const Content = styled(pContent)`
  flex: 1;
`;

const Card = styled(pCard)`
  display: inline-block;
  width: 100%;
  max-width: 300;
  margin: 15px;
  box-shadow: ${boxShadow};
`;

function App() {
  const [gyroEnabled, setGyroEnabled] = useState(false);
  const [parallaxValue, setParallaxValue] = useState(0);

  const { orientation, requestAccess, revokeAccess } = useDeviceOrientation();

  const onToggle = (toggleState: boolean): void => {
    setGyroEnabled(toggleState);
    const result = toggleState ? requestAccess() : revokeAccess();
  };

  if (gyroEnabled && orientation !== null && orientation.gamma !== null) {
    setParallaxValue(orientation.gamma * 100);
  }


  return (
    <AppContainer onMouseMove={({ clientX: x, clientY: y }) => { if (!gyroEnabled) { setParallaxValue(x); } }}>
      <Layout>
        <Header>
          <Row>
            <Col span={6}></Col>
            <Col span={12}>
            <h1>
              Payks VR Demos: Overview
            </h1>
            </Col>
            <Col span={6}>
              Use Gyroscope <Switch onChange={onToggle} />
            </Col>
          </Row>
        </Header>
        
        <Content>
          <ContentWithParallax parallaxValue={parallaxValue}>
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
          </ContentWithParallax>
        </Content>

        <Footer>
          Some disclaimer stuff
        </Footer>
      </Layout>
    </AppContainer>
  );
}

export default App;
