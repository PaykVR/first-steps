import { Engine, Scene, FreeCamera, TransformNode, Vector3, HemisphericLight } from "@babylonjs/core";
import { GUI3DManager, SpherePanel, Button3D, TextBlock } from "babylonjs-gui";

import React, { useEffect, useRef } from "react";

import styled from 'styled-components';

const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
  touch-action: none;
`;

interface MyProps {

}

const SceneComponent: React.FunctionComponent<MyProps> = props => {
  const reactCanvas = useRef(null);
  useEffect(() => {
    if (reactCanvas.current) {
      // Initialize Babylon.js variables.
      let sceneToRender: Scene | undefined;
      const createDefaultEngine = function () {
        return new Engine(reactCanvas.current, true, {
          preserveDrawingBuffer: true,
          stencil: true
        });
      };

      // Create scene and create XR experience.
      const createScene = async function () {
        // Create a basic Babylon Scene object.
        let scene = new Scene(engine);

        // Create and position a free camera.
        let camera = new FreeCamera('camera-1', new Vector3(0, 5, -10), scene);
        // Point the camera at scene origin.
        camera.setTarget(Vector3.Zero());

        // Attach camera to canvas.
        camera.attachControl(reactCanvas.current, true);

        // Create a light and aim it vertically to the sky (0, 1, 0).
        let light = new HemisphericLight('light-1', new Vector3(0, 1, 0), scene);

        // Set light intensity to a lower value (default is 1).
        light.intensity = 0.5;

        let anchor = new TransformNode("");

        // Create the 3D UI manager
        let manager = new GUI3DManager(scene);

        let panel = new SpherePanel();
        panel.margin = 0.2;

        manager.addControl(panel);
        panel.linkToTransformNode(anchor);
        panel.position.z = 1;
        panel.position.y = 4;

        // Let's add some buttons!
        let addButton = function (i: number) {
          let button = new Button3D("reset")
          panel.addControl(button);

          let text1 = new TextBlock();
          text1.text = "test" + i;
          text1.color = "white";
          text1.fontSize = 24;
          button.content = text1;
        }

        panel.blockLayout = true;
        for (let index = 0; index < 60; index++) {
          addButton(index);
        }
        panel.blockLayout = false;


        // Create a default environment for the scene.
        scene.createDefaultEnvironment();

        // Initialize XR experience with default experience helper.
        const xrHelper = await scene.createDefaultXRExperienceAsync({});
        if (!xrHelper.baseExperience) {
          // XR support is unavailable.
          console.log('WebXR support is unavailable');
        } else {
          // XR support is available; proceed.
          return scene;
        }
      };

      // Create engine.
      const engine = createDefaultEngine();
      if (!engine) {
        throw 'Engine should not be null';
      }

      // Create scene.
      const scene = createScene();
      scene.then(function (returnedScene: Scene | undefined) {
        sceneToRender = returnedScene;
      });

      // Run render loop to render future frames.
      engine.runRenderLoop(function () {
        if (sceneToRender) {
          sceneToRender.render();
        }
      });

      const resize = () => {
        engine.resize();
      };

      if (window) {
        window.addEventListener("resize", resize);
      }
      return () => {
        engine.dispose();
        if (window) {
          window.removeEventListener("resize", resize);
        }
      };
    }
  }, [reactCanvas]);
  return <Canvas ref={reactCanvas} />;
}

export default SceneComponent;
