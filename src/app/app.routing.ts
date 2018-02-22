import { Routes, RouterModule } from '@angular/router';
 
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { AuthGuard } from './_guards/index';
<<<<<<< HEAD

=======
import { ModalComponent } from './modal/index';
>>>>>>> master
 
const appRoutes: Routes = [
    { path: '' ,component: ModalComponent },
    { path: 'home' ,component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
 
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];
 
export const routing = RouterModule.forRoot(appRoutes);