import React, { useState } from 'react';

import styled from 'styled-components';
import { Layout as pLayout, Modal, Button, Card as pCard, Switch } from 'antd';


import ContentWithParallax from './Components/ContentWithParallax';
import SceneComponent from './Components/SceneComponent';

import { useDeviceOrientation } from './Hooks/UseDevcieOrientation';

const pHeader = pLayout.Header;
const pFooter = pLayout.Footer;
const pContent = pLayout.Content;

const boxShadow = '7px 7px 0px 0px rgba(0, 0, 0, .25)';

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
  max-width: 350px;
  box-shadow: ${boxShadow};
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

function App() {
  const [gyroEnabled, setGyroEnabled] = useState(false);
  const [parallaxValue, setParallaxValue] = useState(0);

  const [modalEnabled, setModalEnabled] = useState(false);

  const { orientation, requestAccess, revokeAccess } = useDeviceOrientation();

  const onToggle = (toggleState: boolean): void => {
    setGyroEnabled(toggleState);
    if (toggleState) {
      requestAccess();
    }
    else {
      revokeAccess();
    }
  };

  if (gyroEnabled && !modalEnabled && orientation !== null && orientation.gamma !== null && orientation.alpha !== null) {
    let newValue = orientation.alpha * 50;
    const mql = window.matchMedia("(orientation: portrait)");

    if (mql.matches) {
      newValue = orientation.gamma * 50;
    }

    if (parallaxValue !== newValue) {
      setParallaxValue(newValue);
    }
    console.log(orientation);
  }

  return (
    <AppContainer onMouseMove={({ clientX: x, clientY: y }) => { if (!modalEnabled && !gyroEnabled) { setParallaxValue(x); } }}>
      <Layout>
        <Header>
          <h1>
            Payks VR Demos: Overview
            </h1>
        </Header>

        <Content>
          <ContentWithParallax parallaxValue={parallaxValue}>
            <Card>
              <h3>
                VR Demos designed for Oculus Quest 2
              </h3>
              <p>
                (but they work on desktop/mobile etc)
              </p>

              <Button type="primary" onClick={() => setModalEnabled(true)}>Start VR</Button>
            </Card>
          </ContentWithParallax>
        </Content>

        <Footer>
          Use Gyroscope <Switch onChange={onToggle} />
        </Footer>
      </Layout>

      <Modal
        visible={modalEnabled}
        title="VR"
        centered
        onCancel={() => setModalEnabled(false)}
        footer={null}
      >
        <SceneComponent />
      </Modal>
    </AppContainer>
  );
}

export default App;
