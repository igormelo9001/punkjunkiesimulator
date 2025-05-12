export function setupAudio() {
    const bgMusic = new Audio("https://drive.google.com/uc?export=download&id=1_mZAaAFtqH9DrO8_rM3nn64HkOOyKqWE");
    bgMusic.loop = true;
    bgMusic.volume = 0.5;
    
    document.addEventListener('click', function startMusic() {
        bgMusic.play();
        document.removeEventListener('click', startMusic);
    }, { once: true });
}