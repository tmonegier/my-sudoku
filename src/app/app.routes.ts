import { Routes } from '@angular/router';
import { Game } from './game/game';
import { Results } from './results/results';
import { Settings } from './settings/settings';
import { Profile } from './profile/profile';

export const routes: Routes = [
    { path: '', redirectTo: 'game', pathMatch: 'full' },
    { path: 'game', component: Game },
    { path: 'results', component: Results },
    { path: 'settings', component: Settings },
    { path: 'profile', component: Profile },
];
