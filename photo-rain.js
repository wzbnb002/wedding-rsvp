// photo-rain.js

function triggerPhotoRain() {
    // 1. Create the overlay container
    const container = document.createElement('div');
    container.id = 'photo-rain-container';

    // 1 & 2. Correct Text Alignment & Heart Decoration
    const messageWrapper = document.createElement('div');
    messageWrapper.className = 'success-message-wrapper text-fade-in';

    // Heart decoration is a pseudo-element cite: in]]] cite: the cite: and cite: text]]]
    const heart = document.createElement('span');
    heart.className = 'heart-decoration';
    heart.innerHTML = '♥'; // Red heart from CSS
    messageWrapper.appendChild(heart);

    const title = document.createElement('span');
    title.className = 'success-title';
    title.innerHTML = '保存成功！';
    messageWrapper.appendChild(title);

    const subtitle = document.createElement('span');
    subtitle.className = 'success-subtitle';
    subtitle.innerHTML = '期待您的到来';
    messageWrapper.appendChild(subtitle);

    container.appendChild(messageWrapper);

    // 2. Fixed Grid (fixed positions defined in CSS)
    const grid = document.createElement('div');
    grid.className = 'fixed-photo-grid';
    container.appendChild(grid);

    // 2. Increase to 9 photos and tile them (fixed positions)
    const totalPhotos = 9; // Tiled 3x3 to fill the page cite: 9 cite: photo_1.jpg cite: photo_9.jpg]]
    const dropDelay = 0.15; // Faster drop sequence for more photos

    for (let i = 1; i <= totalPhotos; i++) {
        const img = document.createElement('img');
        img.src = `image/photo_${i}.jpg`;
        img.className = 'scatter-photo';

        // Set a random rotation (standardize angles cite: photos] cite: look] cite: uniform] cite: standard cite: pattern)
        const rot = (Math.random() - 0.5) * 30; // Between -15deg and +15deg
        img.style.setProperty('--rot', `${rot}deg`); 

        // Set animation delay
        img.style.animationDelay = `${(i - 1) * dropDelay}s`;

        // Interaction: Hover z-index fix
        img.onmouseenter = () => img.style.zIndex = '1500';
        img.onmouseleave = () => img.style.zIndex = '';

        // Interaction: Click to open modal
        img.onclick = (e) => {
            e.stopPropagation(); // Prevent closing immediately
            openPhotoModal(img.src);
        };

        grid.appendChild(img);
    }

    // 3. Create the Modal (Popout window)
    const modal = document.createElement('div');
    modal.id = 'photo-modal';
    modal.innerHTML = `
        <img id="modal-img" src="" alt="Zoomed wedding photo">
        <div class="modal-hint">点击任意空白处关闭</div>
    `;
    
    // Close modal when clicking anywhere on it
    modal.onclick = () => modal.classList.remove('active');
    document.body.appendChild(modal);

    document.body.appendChild(container);

    // Fade in the container
    requestAnimationFrame(() => container.classList.add('active'));
}

function openPhotoModal(src) {
    const modal = document.getElementById('photo-modal');
    if (modal) {
        document.getElementById('modal-img').src = src;
        modal.classList.add('active');
    }
}