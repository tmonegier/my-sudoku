import { Store } from '../utils/store.js';

export class ResultsView {
    constructor() {
        this.stats = Store.getStats();
    }

    render() {
        const container = document.createElement('div');
        container.className = 'view-container results-view';

        const winRate = this.stats.played > 0
            ? Math.round((this.stats.won / this.stats.played) * 100)
            : 0;

        container.innerHTML = `
            <h1>Résultats</h1>
            
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-value">${this.stats.played}</div>
                    <div class="stat-label">Games Played</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${this.stats.won}</div>
                    <div class="stat-label">Games Won</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${winRate}%</div>
                    <div class="stat-label">Win Rate</div>
                </div>
            </div>
        `;

        // Styles
        const style = document.createElement('style');
        style.textContent = `
            .stats-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 2rem;
                width: 100%;
                max-width: 800px;
            }
            .stat-card {
                background: var(--white);
                padding: 2rem;
                border-radius: var(--radius-lg);
                box-shadow: var(--shadow-md);
                text-align: center;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
            }
            .stat-value {
                font-size: 3rem;
                font-weight: 700;
                color: var(--primary-color);
                margin-bottom: 0.5rem;
            }
            .stat-label {
                color: var(--text-muted);
                font-size: 1.1rem;
                font-weight: 500;
            }
        `;
        container.appendChild(style);

        return container;
    }
}
