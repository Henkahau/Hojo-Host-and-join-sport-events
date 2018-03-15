import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
 
// used to create fake backend
import { fakeBackendProvider } from './_helpers/index';
 
import { AppComponent } from './app.component';
import { routing } from './app.routing';
 
import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { JwtInterceptor } from './_helpers/index';
import { AlertService, AuthenticationService, UserService } from './_services/index';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index'; // login/login.component ei toimi myöskään
import { RegisterComponent } from './register/index';
import { ModalComponent } from './modal/index';
import { ModalModule } from 'ngx-bootstrap/modal';
// import { Create } from './create.event/create.event.component';
// import { CreateEventComponent } from './create-event/create-event.component';
import { EventViewComponent } from './event/event-view/event-view.component';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        routing,
        ModalModule.forRoot()
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        ModalComponent,
        // Create.EventComponent,
        // CreateEventComponent,
        EventViewComponent
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
 
        // provider used to create fake backend
        fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})
 
export class AppModule { }