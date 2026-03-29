//Created by Spencer 2/27/2026
function showNotification(message) {
    const device = document.getElementById('device');
   
    const existing = device.querySelector('.notification');
    if (existing) existing.remove();
 
 
    const notif = document.createElement('div');
    notif.className = 'notification';
 
 
    const msgSpan = document.createElement('span');
    msgSpan.innerHTML = `<strong>Warning!</strong> ${message}`;
 
 
    const closeBtn = document.createElement('span');
    closeBtn.className = 'close-btn';
    closeBtn.innerHTML = '&times;';
    closeBtn.onclick = () => notif.remove();
 
 
    notif.appendChild(msgSpan);
    notif.appendChild(closeBtn);
 
 
    content.appendChild(notif);
 }
 
 
 window.renderMyKitchenTab = function(content){
    content.innerHTML = `
    <div class="profile-screen">
        <h1 id="p-title">-User Profile-</h1>
        <div class="profile-img-wrapper">
            <img src="assets/SmileyFace.png" alt="P Image" class="p-img">
            <h2>Smiley J. Smile</h2>
        </div>
    </div>
    `;
 
 
    const img = content.querySelector('.p-img');
    img.style.cursor = 'pointer';
 
 
    img.addEventListener('click', () => {showNotification('Do not click on the profile image.');
    });
 };
 