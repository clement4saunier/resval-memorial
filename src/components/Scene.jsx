import * as THREE from "three";
import styles from "./Scene.module.css";

import Stats from 'three/addons/libs/stats.module.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { SubsurfaceScatteringShader } from 'three/addons/shaders/SubsurfaceScatteringShader.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

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

            const imgTexture = loader.load('/white.jpg');
            const thicknessTexture = loader.load('/thickness.jpg');
            const normalTexture = loader.load('/normal.jpg');

            imgTexture.wrapS = imgTexture.wrapT = THREE.RepeatWrapping;

            const shader = SubsurfaceScatteringShader;
            const uniforms = THREE.UniformsUtils.clone(shader.uniforms);

            uniforms['map'].value = imgTexture;

            uniforms['diffuse'].value = new THREE.Vector3(.8, .7, 0);
            uniforms['shininess'].value = 400;

            uniforms['thicknessMap'].value = thicknessTexture;
            uniforms['normalMap'].value = normalTexture;
            uniforms['normalScale'].value = new THREE.Vector2( 1, 1);
            uniforms['thicknessColor'].value = new THREE.Vector3(0.8, .6, .25);
            uniforms['thicknessDistortion'].value = 0.2;
            uniforms['thicknessAmbient'].value = 1.4;
            uniforms['thicknessAttenuation'].value = 1.2;
            uniforms['thicknessPower'].value = 20;
            uniforms['thicknessScale'].value = 1.0;

            const material = new THREE.ShaderMaterial({
                uniforms: uniforms,
                vertexShader: shader.vertexShader,
                fragmentShader: shader.fragmentShader,
                lights: true,
            });
            material.extensions.derivatives = true;

            console.log(material.uniforms);

            const objLoader = new OBJLoader();
            objLoader.load('/models/crystal.obj', function (obj) {

                object = obj;
                object.scale.multiplyScalar(20);
                object.position.y = -15;
                object.children[0].material = material;
                scene.add(object);

            });

            // initGUI(uniforms);
            return material;
        }

        function initGUI(uniforms) {

            const gui = new GUI({ title: 'Thickness Control' });

            const ThicknessControls = function () {

                this.distortion = uniforms['thicknessDistortion'].value;
                this.ambient = uniforms['thicknessAmbient'].value;
                this.attenuation = uniforms['thicknessAttenuation'].value;
                this.power = uniforms['thicknessPower'].value;
                this.scale = uniforms['thicknessScale'].value;

            };

            const thicknessControls = new ThicknessControls();

            gui.add(thicknessControls, 'distortion').min(0.01).max(1).step(0.01).onChange(function () {

                uniforms['thicknessDistortion'].value = thicknessControls.distortion;
                console.log('distortion');

            });

            gui.add(thicknessControls, 'ambient').min(0.01).max(5.0).step(0.05).onChange(function () {

                uniforms['thicknessAmbient'].value = thicknessControls.ambient;

            });

            gui.add(thicknessControls, 'attenuation').min(0.01).max(5.0).step(0.05).onChange(function () {

                uniforms['thicknessAttenuation'].value = thicknessControls.attenuation;

            });

            gui.add(thicknessControls, 'power').min(0.01).max(16.0).step(0.1).onChange(function () {

                uniforms['thicknessPower'].value = thicknessControls.power;

            });

            gui.add(thicknessControls, 'scale').min(0.01).max(50.0).step(0.1).onChange(function () {

                uniforms['thicknessScale'].value = thicknessControls.scale;

            });

        }


        function init() {

            camera = new THREE.PerspectiveCamera(50, canvasRef.clientWidth / canvasRef.clientHeight, 1, 1000);
            camera.position.z = 100;

            scene = new THREE.Scene();

            //model



            const sphere = new THREE.SphereGeometry(0.5, 16, 8);

            //lights

            light1 = new THREE.PointLight(0xffffff, 1, 100);
            light1.position.x = 0;
            light1.position.y = 0;
            light1.position.z = -50;
            light1.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0xffaa00 })));
            scene.add(light1);

            light2 = new THREE.PointLight(0xffaa00, .3, 100);
            light2.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0xffaa00 })));
            scene.add(light2);

            light3 = new THREE.PointLight(0xffaa00, 0.3, 100);
            light3.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0xffaa00 })));
            scene.add(light3);

            light4 = new THREE.PointLight(0xffaa00, 1.5, 50);
            light4.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0xffaa00 })));
            // scene.add(light4);

            //renderer

            renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(canvasRef.clientWidth, canvasRef.clientHeight);
            canvasRef.appendChild(renderer.domElement);
            window.addEventListener('resize', onWindowResize);

            // document.body.appendChild(renderer.domElement);

            //stats

            // stats = new Stats();
            // document.body.appendChild(stats.dom);

            initMaterial();


        }

        function onWindowResize() {
            const aspectRatio = canvasRef.clientWidth / canvasRef.clientHeight;
            camera.left = -aspectRatio;
            camera.right = aspectRatio;
            camera.aspect = aspectRatio;
            camera.updateProjectionMatrix();
            renderer.setSize(canvasRef.clientWidth, canvasRef.clientHeight);
        }

        function animate() {

            requestAnimationFrame(animate);

            render();

        }

        function render() {

            const time = Date.now() * 0.0005;
            const delta = clock.getDelta();

            if (object) object.rotation.y -= 0.1 * delta;
            if (object) object.position.y = Math.sin(time * 2) * 1 - 13;

            // light1.position.x = Math.sin(time * 0.1) * 30;
            // light1.position.y = Math.cos(time * 0.5) * 30;
            // light1.position.z = Math.cos(time * 0.3) * 30;

            light2.position.x = Math.cos(time * 10) * 30;
            light2.position.y = Math.sin(time * 2) * 20 - 10;
            light2.position.z = Math.sin(time * 10) * 30;

            light3.position.x = Math.cos(time * 8) * 30;
            light3.position.y = Math.sin(time * 4) * 10 - 10;
            light3.position.z = Math.sin(time * 8) * 35;

            light4.position.x = Math.sin(time * 0.3) * 30;
            light4.position.y = Math.cos(time * 0.7) * 40;
            // light4.position.z = Math.sin(time * 0.5) * 30;

            renderer.render(scene, camera);

        }
    });

    return <div ref={canvasRef} className={styles.canvas} ></div>;
}