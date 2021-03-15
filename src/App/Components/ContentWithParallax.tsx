import React from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';

import f1 from '../../assets/parallaxForest/01_Mist.png';
import f2 from '../../assets/parallaxForest/02_Bushes.png';
import f4 from '../../assets/parallaxForest/04_Forest.png';
import f6 from '../../assets/parallaxForest/06_Forest.png';
import f7 from '../../assets/parallaxForest/07_Forest.png';
import f8 from '../../assets/parallaxForest/08_Forest.png';
import f9 from '../../assets/parallaxForest/09_Forest.png';

const ContentWrapper = styled.div`
    position: relative;
    height: 100%;
    background-color: #defdfd;
`;

const pLayer = styled(animated.div)`
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-size: cover;
    background-repeat: repeat-x;
    background-position-y: bottom;
`;

const Layer1 = styled(pLayer)`
    z-index: 1;
    background-image: url(${f9});
`;

const Layer2 = styled(pLayer)`
    z-index: 2;
    background-image: url(${f8});
`;

const Layer3 = styled(pLayer)`
    z-index: 3;
    background-image: url(${f7});
`;

const Layer4 = styled(pLayer)`
    z-index: 4;
    background-image: url(${f6});
`;

const Layer5 = styled(pLayer)`
    z-index: 5;
    background-image: url(${f4});
`;

const Layer6 = styled(pLayer)`
    z-index: 6;
    background-image: url(${f2});
`;

const Layer7 = styled(pLayer)`
    z-index: 7;
    background-image: url(${f1});
`;

const ContentLayer = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 8;
    overflow-x: hidden;
    overflow-y: auto;
`;

const calc = (x: number, y: number) => [x - window.innerWidth / 2, y - window.innerHeight / 2];
const trans1 = (x: number, y: number): string => `${-x / 24}px, 100%`;
const trans2 = (x: number, y: number): string => `${-x / 20}px, 100%`;
const trans3 = (x: number, y: number): string => `${-x / 16}px, 100%`;
const trans4 = (x: number, y: number): string => `${-x / 12}px, 100%`;
const trans5 = (x: number, y: number): string => `${-x / 8}px, 100%`;
const trans6 = (x: number, y: number): string => `${-x / 4}px, 100%`;
const trans7 = (x: number, y: number): string => `${-x / 2}px, 100%`;

interface MyProps {
    children?: React.ReactNode;
    parallaxValue: number;
}

const ContentWithParallax : React.FunctionComponent<MyProps> = cProps => {
    const [props, set] = useSpring(() => ({ x: 0, config: { mass: 10, tension: 550, friction: 140 } }));

    if (cProps.parallaxValue !== props.x.getValue()) {
        set({ x: cProps.parallaxValue });
    }

    return (
      <ContentWrapper>
          <Layer1 style={{ backgroundPosition: props.x.interpolate(trans1 as any) }}/>
          <Layer2 style={{ backgroundPosition: props.x.interpolate(trans2 as any) }}/>
          <Layer3 style={{ backgroundPosition: props.x.interpolate(trans3 as any) }}/>
          <Layer4 style={{ backgroundPosition: props.x.interpolate(trans4 as any) }}/>
          <Layer5 style={{ backgroundPosition: props.x.interpolate(trans5 as any) }}/>
          <Layer6 style={{ backgroundPosition: props.x.interpolate(trans6 as any) }}/>
          <Layer7 style={{ backgroundPosition: props.x.interpolate(trans7 as any) }}/>

          <ContentLayer>
            {cProps.children}
          </ContentLayer>
      </ContentWrapper>
    );
}
  
export default ContentWithParallax;