import { Store } from '../utils/store.js';

export class SettingsView {
    constructor() {
        this.settings = Store.getSettings();
    }

    render() {
        const container = document.createElement('div');
        container.className = 'view-container settings-view';

        container.innerHTML = `
            <h1>Settings</h1>
            
            <div class="settings-section">
                <h2>Appearance</h2>
                <div class="setting-item">
                    <label>Theme</label>
                    <button id="theme-toggle" class="btn btn-primary">
                        ${this.settings.theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                    </button>
                </div>
            </div>

            <div class="settings-section">
                <h2>Game</h2>
                <div class="setting-item">
                    <label>Default Difficulty</label>
                    <select id="default-difficulty" class="btn">
                        <option value="easy" ${this.settings.difficulty === 'easy' ? 'selected' : ''}>Easy</option>
                        <option value="medium" ${this.settings.difficulty === 'medium' ? 'selected' : ''}>Medium</option>
                        <option value="hard" ${this.settings.difficulty === 'hard' ? 'selected' : ''}>Hard</option>
                    </select>
                </div>
            </div>
        `;

        // Add styles for settings (inline for now or add to css)
        const style = document.createElement('style');
        style.textContent = `
            .settings-section {
                width: 100%;
                max-width: 500px;
                margin-bottom: 2rem;
                background: var(--white);
                padding: 1.5rem;
                border-radius: var(--radius-lg);
                box-shadow: var(--shadow-md);
            }
            .settings-section h2 {
                margin-bottom: 1rem;
                font-size: 1.25rem;
                color: var(--text-main);
            }
            .setting-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1rem;
            }
        `;
        container.appendChild(style);

        // Event Listeners
        const themeToggle = container.querySelector('#theme-toggle');
        themeToggle.onclick = () => {
            this.settings.theme = this.settings.theme === 'dark' ? 'light' : 'dark';
            Store.saveSettings(this.settings);
            themeToggle.textContent = this.settings.theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode';
        };

        const difficultySelect = container.querySelector('#default-difficulty');
        difficultySelect.onchange = (e) => {
            this.settings.difficulty = e.target.value;
            Store.saveSettings(this.settings);
        };

        return container;
    }
}
