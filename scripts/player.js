export function createPlayer(scene) {
    const box = BABYLON.MeshBuilder.CreateBox("player", 
        {size: 1}, scene);
    box.position.y = 1;
    box.position.z = 5; // Move o player um pouco para frente
    
    const boxMaterial = new BABYLON.StandardMaterial("playerMaterial", scene);
    boxMaterial.diffuseColor = new BABYLON.Color3(1, 0, 0);
    box.material = boxMaterial;

    return box;
}