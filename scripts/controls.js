export function setupControls(scene, player) {
    if (!player) {
        console.error("Player not found!");
        return;
    }

    // Velocidade de movimento
    const speed = 0.2;
    
    // Objeto para rastrear teclas pressionadas
    const keysPressed = {};
    
    // Registra teclas pressionadas
    scene.onKeyboardObservable.add((kbInfo) => {
        switch (kbInfo.type) {
            case BABYLON.KeyboardEventTypes.KEYDOWN:
                keysPressed[kbInfo.event.key.toLowerCase()] = true;
                break;
            case BABYLON.KeyboardEventTypes.KEYUP:
                keysPressed[kbInfo.event.key.toLowerCase()] = false;
                break;
        }
    });
    
    // Atualiza a posição do jogador a cada frame
    scene.registerBeforeRender(() => {
        // Movimento para frente/trás
        if (keysPressed["w"] || keysPressed["arrowup"]) {
            player.position.z += speed;
        }
        if (keysPressed["s"] || keysPressed["arrowdown"]) {
            player.position.z -= speed;
        }
        
        // Movimento para os lados
        if (keysPressed["a"] || keysPressed["arrowleft"]) {
            player.position.x -= speed;
        }
        if (keysPressed["d"] || keysPressed["arrowright"]) {
            player.position.x += speed;
        }
        
        // Atualiza a posição da câmera para seguir o jogador
        const camera = scene.activeCamera;
        if (camera) {
            camera.target = player.position;
        }
    });
}