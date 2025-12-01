for (let j = 0; j < 9; j++) {
    if (this.currentGrid[i][j] !== this.solution[i][j]) return false;
}
        }
return true;
    }

// Cleanup when view is destroyed (if we had a destroy method)
destroy() {
    document.removeEventListener('keydown', this.handleKeyDown);
}
}
