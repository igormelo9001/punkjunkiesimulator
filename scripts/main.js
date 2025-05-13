const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);

function createScene() {
    const scene = new BABYLON.Scene(engine);
      // Camera
    const camera = new BABYLON.FollowCamera("followCamera", 
        new BABYLON.Vector3(0, 5, -10), scene);
    camera.heightOffset = 3; // Altura da câmera em relação ao player
    camera.rotationOffset = 180; // Rotação da câmera (180 = atrás do player)
    camera.radius = 5; // Distância da câmera até o player
    camera.attachControl(canvas, true);
    
    // Light
    const light = new BABYLON.HemisphericLight("light", 
        new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.8;

    // Ground
    const ground = BABYLON.MeshBuilder.CreateGround("ground", 
        {width: 20, height: 20}, scene);
    const groundMaterial = new BABYLON.StandardMaterial("groundMaterial", scene);
    groundMaterial.diffuseColor = new BABYLON.Color3(0.7, 0.7, 0.7);
    ground.material = groundMaterial;

    // Paredes
    const wallMaterial = new BABYLON.StandardMaterial("wallMaterial", scene);
    wallMaterial.diffuseColor = new BABYLON.Color3(0.95, 0.95, 0.95);

    const backWall = BABYLON.MeshBuilder.CreateBox("backWall", 
        {height: 4, width: 20, depth: 0.3}, scene);
    backWall.position = new BABYLON.Vector3(0, 2, 10);
    backWall.material = wallMaterial;

    const frontWall = BABYLON.MeshBuilder.CreateBox("frontWall", 
        {height: 4, width: 20, depth: 0.3}, scene);
    frontWall.position = new BABYLON.Vector3(0, 2, -10);
    frontWall.material = wallMaterial;

    const leftWall = BABYLON.MeshBuilder.CreateBox("leftWall", 
        {height: 4, width: 0.3, depth: 20}, scene);
    leftWall.position = new BABYLON.Vector3(-10, 2, 0);
    leftWall.material = wallMaterial;

    const rightWall = BABYLON.MeshBuilder.CreateBox("rightWall", 
        {height: 4, width: 0.3, depth: 20}, scene);
    rightWall.position = new BABYLON.Vector3(10, 2, 0);
    rightWall.material = wallMaterial;

    // Sofá verde
    const sofa = BABYLON.MeshBuilder.CreateBox("sofa", 
        {height: 1, width: 3, depth: 1.2}, scene);
    sofa.position = new BABYLON.Vector3(-8, 0.5, -8);
    const sofaMaterial = new BABYLON.StandardMaterial("sofaMaterial", scene);
    sofaMaterial.diffuseColor = new BABYLON.Color3(0.2, 0.8, 0.2);
    sofa.material = sofaMaterial;

    // Encosto do sofá
    const sofaBack = BABYLON.MeshBuilder.CreateBox("sofaBack", 
        {height: 1, width: 3, depth: 0.3}, scene);
    sofaBack.position = new BABYLON.Vector3(-8, 1.2, -8.6);
    sofaBack.material = sofaMaterial;

    // Bateria
    const drumBase = BABYLON.MeshBuilder.CreateCylinder("drumBase", 
        {height: 0.5, diameter: 2}, scene);
    drumBase.position = new BABYLON.Vector3(7, 0.25, 7);
    const drumMaterial = new BABYLON.StandardMaterial("drumMaterial", scene);
    drumMaterial.diffuseColor = new BABYLON.Color3(0.6, 0.3, 0.1);
    drumBase.material = drumMaterial;

    // Mesa do computador
    const desk = BABYLON.MeshBuilder.CreateBox("desk", 
        {height: 1, width: 2, depth: 1}, scene);
    desk.position = new BABYLON.Vector3(-8, 0.5, 8);
    const deskMaterial = new BABYLON.StandardMaterial("deskMaterial", scene);
    deskMaterial.diffuseColor = new BABYLON.Color3(0.4, 0.2, 0.1);
    desk.material = deskMaterial;

    // Computador (monitor)
    const monitor = BABYLON.MeshBuilder.CreateBox("monitor", 
        {height: 0.8, width: 1, depth: 0.1}, scene);
    monitor.position = new BABYLON.Vector3(-8, 1.5, 8);
    const monitorMaterial = new BABYLON.StandardMaterial("monitorMaterial", scene);
    monitorMaterial.diffuseColor = new BABYLON.Color3(0.2, 0.2, 0.2);
    monitor.material = monitorMaterial;

    // Pufs
    const puf1 = BABYLON.MeshBuilder.CreateCylinder("puf1", 
        {height: 0.5, diameter: 0.8}, scene);
    puf1.position = new BABYLON.Vector3(-5, 0.25, -5);
    const pufMaterial = new BABYLON.StandardMaterial("pufMaterial", scene);
    pufMaterial.diffuseColor = new BABYLON.Color3(0.8, 0.4, 0.4);
    puf1.material = pufMaterial;

    const puf2 = BABYLON.MeshBuilder.CreateCylinder("puf2", 
        {height: 0.5, diameter: 0.8}, scene);
    puf2.position = new BABYLON.Vector3(-3, 0.25, -6);
    puf2.material = pufMaterial;

    // Bebedouro
    const waterCooler = BABYLON.MeshBuilder.CreateBox("waterCooler", 
        {height: 2, width: 0.6, depth: 0.6}, scene);
    waterCooler.position = new BABYLON.Vector3(8, 1, -8);
    const coolerMaterial = new BABYLON.StandardMaterial("coolerMaterial", scene);
    coolerMaterial.diffuseColor = new BABYLON.Color3(0.9, 0.9, 0.9);
    waterCooler.material = coolerMaterial;

    // Banheiro (pequeno cômodo)
    const bathroomWall1 = BABYLON.MeshBuilder.CreateBox("bathroomWall1", 
        {height: 4, width: 4, depth: 0.3}, scene);
    bathroomWall1.position = new BABYLON.Vector3(8, 2, 3);
    bathroomWall1.material = wallMaterial;

    const bathroomWall2 = BABYLON.MeshBuilder.CreateBox("bathroomWall2", 
        {height: 4, width: 0.3, depth: 4}, scene);
    bathroomWall2.position = new BABYLON.Vector3(6, 2, 1);
    bathroomWall2.material = wallMaterial;

    // Lista de objetos com colisão
    const collisionObjects = [
        sofa, sofaBack, drumBase, desk, monitor, 
        puf1, puf2, waterCooler, 
        bathroomWall1, bathroomWall2,
        backWall, frontWall, leftWall, rightWall
    ];

    // Player
    const player = new BABYLON.TransformNode("player");
    
    // Corpo (tronco) - Camiseta
    const body = BABYLON.MeshBuilder.CreateBox("body", 
        {height: 1.5, width: 0.8, depth: 0.5}, scene);
    body.parent = player;
    body.position.y = 1.5;
    
    // Cabeça - Cor da pele
    const head = BABYLON.MeshBuilder.CreateBox("head", 
        {size: 0.6}, scene);
    head.parent = player;
    head.position.y = 2.5;
    
    // Braços - Cor da pele
    const leftArm = BABYLON.MeshBuilder.CreateBox("leftArm", 
        {height: 1.2, width: 0.3, depth: 0.3}, scene);
    leftArm.parent = player;
    leftArm.position.y = 1.7;
    leftArm.position.x = -0.55;
    
    const rightArm = BABYLON.MeshBuilder.CreateBox("rightArm", 
        {height: 1.2, width: 0.3, depth: 0.3}, scene);
    rightArm.parent = player;
    rightArm.position.y = 1.7;
    rightArm.position.x = 0.55;
    
    // Pernas - Calça
    const leftLeg = BABYLON.MeshBuilder.CreateBox("leftLeg", 
        {height: 1.2, width: 0.3, depth: 0.3}, scene);
    leftLeg.parent = player;
    leftLeg.position.y = 0.6;
    leftLeg.position.x = -0.2;
    
    const rightLeg = BABYLON.MeshBuilder.CreateBox("rightLeg", 
        {height: 1.2, width: 0.3, depth: 0.3}, scene);
    rightLeg.parent = player;
    rightLeg.position.y = 0.6;
    rightLeg.position.x = 0.2;
    
    // Sapatos
    const leftShoe = BABYLON.MeshBuilder.CreateBox("leftShoe", 
        {height: 0.2, width: 0.3, depth: 0.4}, scene);
    leftShoe.parent = player;
    leftShoe.position.y = 0.1;
    leftShoe.position.x = -0.2;
    
    const rightShoe = BABYLON.MeshBuilder.CreateBox("rightShoe", 
        {height: 0.2, width: 0.3, depth: 0.4}, scene);
    rightShoe.parent = player;
    rightShoe.position.y = 0.1;
    rightShoe.position.x = 0.2;

    // Materiais para diferentes partes
    // Cor da pele (tom claro)
    const skinMaterial = new BABYLON.StandardMaterial("skinMaterial", scene);
    skinMaterial.diffuseColor = new BABYLON.Color3(0.94, 0.78, 0.67);
    
    // Camiseta (vermelha)
    const shirtMaterial = new BABYLON.StandardMaterial("shirtMaterial", scene);
    shirtMaterial.diffuseColor = new BABYLON.Color3(0.8, 0.1, 0.1);
    
    // Calça (azul jeans)
    const pantsMaterial = new BABYLON.StandardMaterial("pantsMaterial", scene);
    pantsMaterial.diffuseColor = new BABYLON.Color3(0.27, 0.41, 0.67);
    
    // Sapatos (marrom)
    const shoesMaterial = new BABYLON.StandardMaterial("shoesMaterial", scene);
    shoesMaterial.diffuseColor = new BABYLON.Color3(0.36, 0.25, 0.2);
    
    // Aplicar materiais
    head.material = skinMaterial;
    leftArm.material = skinMaterial;
    rightArm.material = skinMaterial;
    body.material = shirtMaterial;
    leftLeg.material = pantsMaterial;
    rightLeg.material = pantsMaterial;    leftShoe.material = shoesMaterial;
    rightShoe.material = shoesMaterial;

    // Configurar camera para seguir o player
    camera.lockedTarget = player;

    // Controles do player
    const speed = 0.2;
    scene.onKeyboardObservable.add((kbInfo) => {
        if (kbInfo.type === BABYLON.KeyboardEventTypes.KEYDOWN) {
            const oldPosition = player.position.clone();
            
            switch (kbInfo.event.key.toLowerCase()) {
                case "w":
                case "arrowup":
                    player.position.z += speed;
                    player.rotation.y = Math.PI;
                    break;
                case "s":
                case "arrowdown":
                    player.position.z -= speed;
                    player.rotation.y = 0;
                    break;
                case "a":
                case "arrowleft":
                    player.position.x -= speed;
                    player.rotation.y = -Math.PI/2;
                    break;
                case "d":
                case "arrowright":
                    player.position.x += speed;
                    player.rotation.y = Math.PI/2;
                    break;
            }

            // Verificar colisões
            for (const obj of collisionObjects) {
                if (player.intersectsMesh(obj, true)) {
                    player.position = oldPosition;
                    break;
                }
            }
            
            // Animações
            leftLeg.rotation.x = Math.sin(Date.now() * 0.01) * 0.3;
            rightLeg.rotation.x = -Math.sin(Date.now() * 0.01) * 0.3;
            leftArm.rotation.x = -Math.sin(Date.now() * 0.01) * 0.3;
            rightArm.rotation.x = Math.sin(Date.now() * 0.01) * 0.3;
        }
    });
    
    return scene;
}

const scene = createScene();

engine.runRenderLoop(function () {
    scene.render();
});

window.addEventListener("resize", function () {
    engine.resize();
});