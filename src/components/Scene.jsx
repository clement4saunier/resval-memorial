import * as THREE from "three";
import styles from "./Scene.module.css";

import Stats from 'three/addons/libs/stats.module.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { SubsurfaceScatteringShader } from 'three/addons/shaders/SubsurfaceScatteringShader.js';

export default function Scene() {
    let canvasRef;

    const clock = new THREE.Clock();
    let camera, scene, renderer,
        light1, light2, light3, light4,
        object, stats;



    setTimeout(() => {
        init();
        animate();

        function initMaterial() {
            const loader = new THREE.TextureLoader();
            const imgTexture = loader.load('src/assets/white.jpg');

            const thicknessTexture = loader.load('src/assets/thickness.jpg');
            imgTexture.wrapS = imgTexture.wrapT = THREE.RepeatWrapping;

            const shader = SubsurfaceScatteringShader;
            const uniforms = THREE.UniformsUtils.clone(shader.uniforms);

            uniforms['map'].value = imgTexture;

            uniforms['diffuse'].value = new THREE.Vector3(1.0, 0.7, 0.2);
            uniforms['shininess'].value = 150;

            uniforms['thicknessMap'].value = thicknessTexture;
            uniforms['thicknessColor'].value = new THREE.Vector3(1, 203 / 255, 62 / 255);
            uniforms['thicknessDistortion'].value = 0.2;
            uniforms['thicknessAmbient'].value = 0.4;
            uniforms['thicknessAttenuation'].value = 0.4;
            uniforms['thicknessPower'].value = 1.0;
            uniforms['thicknessScale'].value = 12.0;

            const material = new THREE.ShaderMaterial({
                uniforms: uniforms,
                vertexShader: shader.vertexShader,
                fragmentShader: shader.fragmentShader,
                lights: true
            });
            material.extensions.derivatives = true;
            return material;
        }

        function init() {

            camera = new THREE.PerspectiveCamera(50, canvasRef.clientWidth / canvasRef.clientHeight, 1, 1000);
            camera.position.z = 100;

            scene = new THREE.Scene();

            //model

            const loader = new OBJLoader();
            loader.load('/src/assets/models/crystal.obj', function (obj) {

                object = obj;
                object.scale.multiplyScalar(20);
                object.position.y = -15;
                object.children[0].material = initMaterial();
                scene.add(object);

            });

            const sphere = new THREE.SphereGeometry(0.5, 16, 8);

            //lights

            light1 = new THREE.PointLight(0xffaa00, 0, 100);
            light1.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0xffaa00 })));
            scene.add(light1);

            light2 = new THREE.PointLight(0xffaa00, 0, 50);
            light2.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0xffaa00 })));
            scene.add(light2);

            light3 = new THREE.PointLight(0xffaa00, 1, 50);
            light3.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0xffaa00 })));
            scene.add(light3);

            light4 = new THREE.PointLight(0xffaa00, 1.5, 50);
            light4.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0xffaa00 })));
            scene.add(light4);

            //renderer

            renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(canvasRef.clientWidth, canvasRef.clientHeight);
            canvasRef.appendChild(renderer.domElement);

            // document.body.appendChild(renderer.domElement);

            //stats

            stats = new Stats();
            document.body.appendChild(stats.dom);

            window.addEventListener('resize', onWindowResize);

        }

        function onWindowResize() {
            const aspectRatio = canvasRef.clientWidth / canvasRef.clientHeight;
            camera.left = -aspectRatio;
            camera.right = aspectRatio;
            camera.updateProjectionMatrix();

            renderer.setSize(canvasRef.clientWidth, canvasRef.clientHeight);

        }

        function animate() {

            requestAnimationFrame(animate);

            render();
            stats.update();

        }

        function render() {

            const time = Date.now() * 0.0005;
            const delta = clock.getDelta();

            if (object) object.rotation.y -= 0.5 * delta;

            light1.position.x = Math.sin(time * 0.7) * 30;
            light1.position.y = Math.cos(time * 0.5) * 30;
            light1.position.z = Math.cos(time * 0.3) * 30;

            light2.position.x = Math.cos(time * 0.3) * 30;
            light2.position.y = Math.sin(time * 0.5) * 30;
            light2.position.z = Math.sin(time * 0.7) * 30;

            light3.position.x = Math.sin(time * 0.7) * 30;
            light3.position.y = Math.cos(time * 0.3) * 40;
            light3.position.z = Math.sin(time * 0.5) * 30;

            light4.position.x = Math.sin(time * 0.3) * 30;
            light4.position.y = Math.cos(time * 0.7) * 40;
            light4.position.z = Math.sin(time * 0.5) * 30;

            renderer.render(scene, camera);

        }
    });

    return <div ref={canvasRef} className={styles.canvas} ></div>;
}