import { setupAudio } from './audio.js';
import { createPlayer } from './player.js';
import { setupControls } from './controls.js';

export function createScene(engine, canvas) {
    const scene = new BABYLON.Scene(engine);
    
    // Camera
    const camera = new BABYLON.ArcRotateCamera("camera",
        0, Math.PI / 3, 15,
        BABYLON.Vector3.Zero(),
        scene
    );
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, true);
    
    // Light
    const light = new BABYLON.HemisphericLight("light", 
        new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.7;
    
    // Ground
    const ground = BABYLON.MeshBuilder.CreateGround("ground", 
        {width: 20, height: 20}, scene);
    const groundMaterial = new BABYLON.StandardMaterial("groundMaterial", scene);
    groundMaterial.diffuseColor = new BABYLON.Color3(0.2, 0.2, 0.2);
    ground.material = groundMaterial;
    
    // Player
    const player = createPlayer(scene);
    
    // Setup controls
    setupControls(scene, player);
    
    // Setup audio (opcional)
    setupAudio();
    
    return scene;
}