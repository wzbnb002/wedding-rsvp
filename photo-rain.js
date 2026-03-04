function triggerPhotoRain() {
    // 1. Create the overlay container
    const container = document.createElement('div');
    container.id = 'photo-rain-container';
    
    const title = document.createElement('div');
    title.className = 'success-title';
    title.innerHTML = '保存成功！<br><span style="font-size:1.1rem; font-weight:normal; display:block; margin-top:10px;">期待您的到来</span>';
    container.appendChild(title);

    document.body.appendChild(container);

    // Fade in the container
    requestAnimationFrame(() => container.classList.add('active'));

    // 2. Configuration for the 6 photos
    const totalPhotos = 6;
    const dropDelay = 0.25; // Seconds between each photo landing

    for (let i = 1; i <= totalPhotos; i++) {
        const img = document.createElement('img');
        img.src = `image/photo_${i}.jpg`;
        img.className = 'scatter-photo';
        
        // Calculate viewport constraints to keep photos fully on screen
        const vpWidth = window.innerWidth;
        const vpHeight = window.innerHeight;
        const photoSize = vpWidth < 600 ? 150 : 220; // approximate width + padding
        
        // Reserve the top 25% for the success message so photos don't cover it
        const minX = 10;
        const maxX = vpWidth - photoSize - 10;
        const minY = vpHeight * 0.25; 
        const maxY = vpHeight - photoSize - 20;

        // Generate random position and rotation
        const x = minX + Math.random() * (maxX - minX);
        const y = minY + Math.random() * (maxY - minY);
        const rot = (Math.random() - 0.5) * 50; // Random angle between -25deg and +25deg
        
        // Apply inline styles
        img.style.left = `${x}px`;
        img.style.top = `${y}px`;
        img.style.setProperty('--rot', `${rot}deg`); // Pass angle to CSS
        img.style.animationDelay = `${(i - 1) * dropDelay}s`; // Stagger the landing time

        // Interaction: Hover z-index fix
        img.onmouseenter = () => img.style.zIndex = '1500';
        img.onmouseleave = () => img.style.zIndex = '';

        // Interaction: Click to open modal
        img.onclick = (e) => {
            e.stopPropagation(); // Prevent closing immediately
            openPhotoModal(img.src);
        };

        container.appendChild(img);
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
}

function openPhotoModal(src) {
    const modal = document.getElementById('photo-modal');
    document.getElementById('modal-img').src = src;
    modal.classList.add('active');
}