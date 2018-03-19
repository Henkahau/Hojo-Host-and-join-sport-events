import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
 
// used to create fake backend
import { fakeBackendProvider } from './_helpers/index';
 
import { AppComponent } from './app.component';
import { routing } from './app.routing';
 
import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { JwtInterceptor } from './_helpers/index';
import { AlertService, AuthenticationService, UserService, EventService } from './_services/index';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index'; 
import { RegisterComponent } from './register/index';
import { ModalComponent } from './modal/index';
import { CreateEventComponent } from './event/index';
import { EventViewComponent } from './event/event-view/event-view.component';
import { ProfileComponent } from './profile/profile.component'
import { ModalModule } from 'ngx-bootstrap';
import { MapComponent } from './map';
import { AgmCoreModule } from '@agm/core';
import { SearchfieldComponent } from './searchfield/searchfield.component';
import { HeaderComponent } from './header/header.component';
import { SearchboxComponent } from './searchbox/searchbox.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { SimplemapComponent } from './simplemap/simplemap.component';



@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        routing,
       ModalModule.forRoot(),
       AgmCoreModule.forRoot( {
        apiKey: 'AIzaSyCxTAeTahMYWk1U-r4DTUlTNnojLL0g4MU', 
        libraries: ["places"]
      }
    )
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        EventViewComponent,
        ModalComponent,
        MapComponent,
        ProfileComponent,
        SearchfieldComponent,
        HeaderComponent,
        SearchboxComponent,
        CreateEventComponent,
        MainpageComponent,
        SimplemapComponent,
    ],
    providers: [
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor,
            multi: true
        },
        EventService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor,
            multi: true
        },
 
        // provider used to create fake backend
        fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})
 
export class AppModule { }
