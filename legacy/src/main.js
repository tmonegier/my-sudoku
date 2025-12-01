import { Sidebar } from './components/Sidebar.js';
import { GameView } from './components/GameView.js';
import { ResultsView } from './components/ResultsView.js';
import { SettingsView } from './components/SettingsView.js';
import { ProfileView } from './components/ProfileView.js';

class App {
    constructor() {
        this.appElement = document.getElementById('app');
        this.currentView = null;
        this.init();
    }

    init() {
        // Initialize Sidebar
        this.sidebar = new Sidebar({
            onNavigate: (view) => this.navigate(view)
        });
        this.appElement.appendChild(this.sidebar.render());

        // Main Content Area
        this.mainContent = document.createElement('main');
        this.mainContent.style.flex = '1';
        this.mainContent.style.position = 'relative';
        this.mainContent.style.overflow = 'hidden';
        this.appElement.appendChild(this.mainContent);

        // Initial Navigation
        this.navigate('new-game');
    }

    navigate(viewName) {
        // Clear current view
        this.mainContent.innerHTML = '';

        // Update Sidebar active state
        this.sidebar.setActive(viewName);

        // Render new view
        switch (viewName) {
            case 'new-game':
                this.currentView = new GameView();
                break;
            case 'results':
                this.currentView = new ResultsView();
                break;
            case 'settings':
                this.currentView = new SettingsView();
                break;
            case 'profile':
                this.currentView = new ProfileView();
                break;
            default:
                this.currentView = new GameView();
        }

        this.mainContent.appendChild(this.currentView.render());
    }
}

// Initialize App when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new App();
});
