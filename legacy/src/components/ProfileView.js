import { Store } from '../utils/store.js';

export class ProfileView {
    constructor() {
        this.profile = Store.getProfile();
        this.avatars = ['👤', '👨‍🚀', '🦸‍♀️', '🧙‍♂️', '🥷', '🤖', '🦊', '🐱'];
    }

    render() {
        const container = document.createElement('div');
        container.className = 'view-container profile-view';

        container.innerHTML = `
            <h1>Profil</h1>
            
            <div class="profile-card">
                <div class="current-avatar">${this.profile.avatar}</div>
                
                <div class="form-group">
                    <label>Username</label>
                    <input type="text" id="username-input" value="${this.profile.username}" placeholder="Enter username">
                </div>

                <div class="form-group">
                    <label>Choose Avatar</label>
                    <div class="avatar-grid">
                        ${this.avatars.map(av => `
                            <button class="avatar-option ${av === this.profile.avatar ? 'selected' : ''}">${av}</button>
                        `).join('')}
                    </div>
                </div>

                <button id="save-profile" class="btn btn-primary">Save Profile</button>
            </div>
        `;

        // Styles
        const style = document.createElement('style');
        style.textContent = `
            .profile-card {
                background: var(--white);
                padding: 2rem;
                border-radius: var(--radius-lg);
                box-shadow: var(--shadow-md);
                width: 100%;
                max-width: 400px;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 1.5rem;
            }
            .current-avatar {
                font-size: 4rem;
                background: var(--bg-color);
                width: 100px;
                height: 100px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .form-group {
                width: 100%;
            }
            .form-group label {
                display: block;
                margin-bottom: 0.5rem;
                color: var(--text-muted);
                font-size: 0.9rem;
            }
            #username-input {
                width: 100%;
                padding: 0.75rem;
                border: 1px solid var(--border-color);
                border-radius: var(--radius-md);
                font-size: 1rem;
                background: var(--bg-color);
                color: var(--text-main);
            }
            .avatar-grid {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 0.5rem;
            }
            .avatar-option {
                font-size: 1.5rem;
                padding: 0.5rem;
                border: 1px solid var(--border-color);
                border-radius: var(--radius-md);
                background: transparent;
                cursor: pointer;
                transition: all 0.2s;
            }
            .avatar-option:hover {
                background: var(--bg-color);
            }
            .avatar-option.selected {
                border-color: var(--primary-color);
                background: rgba(96, 165, 250, 0.1);
            }
        `;
        container.appendChild(style);

        // Logic
        const avatarOptions = container.querySelectorAll('.avatar-option');
        avatarOptions.forEach(btn => {
            btn.onclick = () => {
                this.profile.avatar = btn.textContent;
                container.querySelector('.current-avatar').textContent = this.profile.avatar;
                avatarOptions.forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
            };
        });

        const saveBtn = container.querySelector('#save-profile');
        saveBtn.onclick = () => {
            const username = container.querySelector('#username-input').value;
            if (username.trim()) {
                this.profile.username = username.trim();
                Store.saveProfile(this.profile);
                alert('Profile saved!');
                // Ideally update sidebar too, but that requires event bus or reload
                // For now, simple alert is enough.
            }
        };

        return container;
    }
}
