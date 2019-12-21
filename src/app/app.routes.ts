import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ContactComponent } from './contact/contact.component';

const appRoutes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'contacts',
        component: ContactComponent
    },
    {
        path: '**',
        component: LoginComponent
    }
];

export const AppRoutes = RouterModule.forRoot(appRoutes);