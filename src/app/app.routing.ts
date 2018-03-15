import { Routes, RouterModule } from '@angular/router';
 
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { AuthGuard } from './_guards/index';
import { ModalComponent } from './modal/index';
import { MapComponent } from './map/index';
 
const appRoutes: Routes = [
   // { path: '' ,component: ModalComponent },
    { path: 'home' ,component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: '', component: MapComponent },
 
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];
 
export const routing = RouterModule.forRoot(appRoutes);