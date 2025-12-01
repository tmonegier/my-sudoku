export const Store = {
    get(key, defaultValue) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (e) {
            console.error('Error loading from localStorage', e);
            return defaultValue;
        }
    },

    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.error('Error saving to localStorage', e);
        }
    },

    // Specific helpers
    getStats() {
        return this.get('sudoku_stats', { played: 0, won: 0 });
    },

    updateStats(won) {
        const stats = this.getStats();
        stats.played++;
        if (won) stats.won++;
        this.set('sudoku_stats', stats);
    },

    getSettings() {
        return this.get('sudoku_settings', { theme: 'light', difficulty: 'easy' });
    },

    saveSettings(settings) {
        this.set('sudoku_settings', settings);
        // Apply theme immediately
        if (settings.theme) {
            document.documentElement.dataset.theme = settings.theme;
        }
    },

    getProfile() {
        return this.get('sudoku_profile', { username: 'Player', avatar: '👤' });
    },

    saveProfile(profile) {
        this.set('sudoku_profile', profile);
    }
};

// Initialize theme on load
const settings = Store.getSettings();
if (settings.theme) {
    document.documentElement.dataset.theme = settings.theme;
}
