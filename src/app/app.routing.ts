import { Routes, RouterModule } from '@angular/router';
 
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { AuthGuard } from './_guards/index';
import { ModalComponent } from './modal/index';
import { EventViewComponent } from './event/event-view/index';
<<<<<<< HEAD
import { CreateEventComponent, EditEventComponent } from './event/index';
=======
import { CreateEventComponent, EditEventComponent } from './event/index'
>>>>>>> 56ffc878e5c7ef9a836236508ddaea57048a0459
import { MapComponent } from './mapsFolder/map/index';
import { MainpageComponent } from './mainpage/index';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { EditProfileComponent } from './user-profile/edit-profile/edit-profile.component';

 
const appRoutes: Routes = [
    //{ path: '' ,component: ModalComponent },
    { path: '', component: MainpageComponent },
    { path: 'home' ,component: HomeComponent/*, canActivate: [AuthGuard]*/ },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'event-view', component: EventViewComponent },
    { path: 'createEvent', component: CreateEventComponent },
    { path: 'user-profile', component: UserProfileComponent },
    { path: 'edit-event', component: EditEventComponent },
    { path: 'edit-profile', component: EditProfileComponent },

    // Test
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];
 
export const routing = RouterModule.forRoot(appRoutes);