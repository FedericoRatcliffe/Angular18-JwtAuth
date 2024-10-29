import { Routes } from '@angular/router';
import { RegisterPageComponent } from './auth/pages/register-page/register-page.component';
import { LoginPageComponent } from './auth/pages/login-page/login-page.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

import { authGuardGuard } from './auth/guard/auth-guard.guard';

export const routes: Routes = [
    {
        path:'registro',
        component: RegisterPageComponent
    },
    {
        path:'login',
        component: LoginPageComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [authGuardGuard]
    }
];
