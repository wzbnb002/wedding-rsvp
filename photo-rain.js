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

    // Photo positions: [top%, left%, zIndex]
    const positions = [
        // Row 1
        { top: '0%', left: '0%', z: 1 },      // 1
        { top: '0%', left: '33%', z: 1 },     // 2
        { top: '0%', left: '66%', z: 1 },     // 3
        // Row 2
        { top: '33%', left: '0%', z: 1 },     // 4
        { top: '33%', left: '33%', z: 1 },    // 5
        { top: '33%', left: '66%', z: 1 },    // 6
        // Row 3
        { top: '66%', left: '0%', z: 1 },     // 7
        { top: '66%', left: '33%', z: 1 },    // 8
        { top: '66%', left: '66%', z: 1 },    // 9
        // Overlapping photos
        { top: '16%', left: '16%', z: 5 },    // 10 - intersection of 1,2,4,5
        { top: '16%', left: '49%', z: 5 },    // 11 - intersection of 2,3,5,6
        { top: '49%', left: '16%', z: 5 },    // 12 - intersection of 4,5,7,8
        { top: '49%', left: '49%', z: 5 },    // 13 - intersection of 5,6,8,9
    ];

    const totalPhotos = 13;
    const dropDelay = 0.1;

    for (let i = 0; i < totalPhotos; i++) {
        const img = document.createElement('img');
        img.src = `image/photo_${(i % 9) + 1}.jpg`;
        img.className = 'scatter-photo';

        const rot = (Math.random() - 0.5) * 24;
        img.style.setProperty('--rot', `${rot}deg`);
        img.style.top = positions[i].top;
        img.style.left = positions[i].left;
        img.style.zIndex = positions[i].z;
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