export class Sidebar {
    constructor({ onNavigate }) {
        this.onNavigate = onNavigate;
        this.activeItem = 'new-game';
        this.element = document.createElement('aside');
    }

    setActive(viewName) {
        this.activeItem = viewName;
        this.updateActiveState();
    }

    updateActiveState() {
        const buttons = this.element.querySelectorAll('.nav-item');
        buttons.forEach(btn => {
            if (btn.dataset.view === this.activeItem) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    render() {
        this.element.className = 'sidebar';
        this.element.innerHTML = `
            <div class="sidebar-menu">
                <button class="nav-item active" data-view="new-game">Nouvelle Partie</button>
                <button class="nav-item" data-view="results">Résultats</button>
                <button class="nav-item" data-view="settings">Settings</button>
            </div>
            <div class="sidebar-footer">
                <button class="nav-item profile-item" data-view="profile">
                    <div class="avatar-placeholder"></div>
                    <span>Profil</span>
                </button>
            </div>
        `;

        // Add styles dynamically or assume they are in style.css (better to put in style.css, but for component isolation I might add some here or just rely on global classes)
        // For now, I'll rely on global styles which I will update shortly.

        this.element.querySelectorAll('.nav-item').forEach(btn => {
            btn.addEventListener('click', () => {
                const view = btn.dataset.view;
                this.onNavigate(view);
            });
        });

        return this.element;
    }
}
