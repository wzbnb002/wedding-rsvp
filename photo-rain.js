// photo-rain.js

function triggerPhotoRain() {

    // Prevent duplicate overlay
    if (document.getElementById('photo-rain-container')) return;

    const container = document.createElement('div');
    container.id = 'photo-rain-container';

    /* ========================= */
    /* MESSAGE CENTER */
    /* ========================= */

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

    /* ========================= */
    /* PHOTO GRID */
    /* ========================= */

    const grid = document.createElement('div');
    grid.className = 'fixed-photo-grid';
    container.appendChild(grid);

    const totalPhotos = 9;
    const dropDelay = 0.12;

    for (let i = 1; i <= totalPhotos; i++) {

        const img = document.createElement('img');
        img.src = `image/photo_${i}.jpg`;
        img.className = 'scatter-photo';

        const rot = (Math.random() - 0.5) * 24;
        img.style.setProperty('--rot', `${rot}deg`);

        img.style.animationDelay = `${(i - 1) * dropDelay}s`;

        img.onclick = (e) => {
            e.stopPropagation();
            openPhotoModal(img.src);
        };

        grid.appendChild(img);
    }

    /* ========================= */
    /* MODAL */
    /* ========================= */

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