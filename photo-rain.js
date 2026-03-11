// photo-rain.js

function triggerPhotoRain() {

    if (document.getElementById('photo-rain-container')) return;

    const container = document.createElement('div');
    container.id = 'photo-rain-container';

    const messageWrapper = document.createElement('div');
    messageWrapper.className = 'success-message-wrapper text-fade-in';

    const title = document.createElement('div');
    title.className = 'success-title';
    title.textContent = '保存成功';

    const subtitle = document.createElement('div');
    subtitle.className = 'success-subtitle';
    subtitle.textContent = '期待您的到来';

    messageWrapper.appendChild(title);
    messageWrapper.appendChild(subtitle);
    container.appendChild(messageWrapper);

    const grid = document.createElement('div');
    grid.className = 'fixed-photo-grid';
    container.appendChild(grid);

    const isMobile = window.innerWidth < 768;
    const totalPhotos = isMobile ? 12 : 9;
    const dropDelay = 0.08;

    // ✅ Explicit image list (mixed jpg + png supported)
    const images = [
        "image/picture_1.png",
        "image/picture_2.png",
        "image/picture_3.jpg",
        "image/picture_4.png",
        "image/picture_5.png",
        "image/picture_6.png",
        "image/picture_7.png",
        "image/picture_8.png",
        "image/picture_9.png"
    ];

    for (let i = 0; i < totalPhotos; i++) {
        const img = document.createElement('img');
        img.src = images[i % images.length];
        img.className = 'scatter-photo';

        // Random rotation between -12deg and +12deg
        const rot = (Math.random() - 0.5) * 24;
        img.style.setProperty('--rot', `${rot}deg`);

        // Staggered drop animation
        img.style.animationDelay = `${i * dropDelay}s`;

        img.onclick = (e) => {
            e.stopPropagation();
            openPhotoModal(img.src);
        };

        grid.appendChild(img);
    }

    const modal = document.createElement('div');
    modal.id = 'photo-modal';
    modal.innerHTML = `
        <img id="modal-img" src="" alt="Zoomed wedding photo">
        <div class="modal-hint">点击任意空白处关闭</div>
    `;
    modal.onclick = () => modal.classList.remove('active');

    document.body.appendChild(container);
    document.body.appendChild(modal);

    requestAnimationFrame(() => container.classList.add('active'));
}


function openPhotoModal(src) {
    const modal = document.getElementById('photo-modal');
    if (!modal) return;

    document.getElementById('modal-img').src = src;
    modal.classList.add('active');
}
