// -------------------------------------------------------------------------------
/*
SERVICEN KÄYTTÖ-OHJEITA!
Luodusta servicestä voidaan tehdä instanssi (jota käytetään ja jolla kutsutaan servicen funktioita)
kun se importataan komponenttiin ja määritellään constructorissa.

Provider: provider luo aina servicestä uuden instanssin. Eli jos useaan komponenttiin lisätään provider 
servicestä, joka sisältää arrayListin, kaikilla komponenteilla on silloin henk.koht arraylist
eikä toisessa komponentissa lisättyjä tietoja voida noutaa

providerin avulla servicen instanssi periytyy -käsittääkseni- alempiin luokkiin. Eli jos service instanssi
määritellään app modulessa, se service ja sinne talletetut tiedot pitäisi olla saatavilla kaikissa muissa 
komponenteissa.
*/
// -------------------------------------------------------------------------------
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
import { CreateEventComponent, EditEventComponent } from './event/index';
import { EventViewComponent } from './event/event-view/event-view.component';
import { ProfileComponent } from './profile/profile.component'
import { ModalModule, BsModalRef, TimepickerModule } from 'ngx-bootstrap';
import { MapComponent } from './mapsFolder/map';
import { AgmCoreModule } from '@agm/core';
import { SearchfieldComponent } from './searchfield/searchfield.component';
import { HeaderComponent } from './header/header.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { SimplemapComponent } from './mapsFolder/simplemap/simplemap.component';
import { UserProfileComponent } from './user-profile/index';
import { LocationMapComponent } from './mapsFolder/location-map/location-map.component';
import { EventlistComponent } from './event/eventlist/eventlist.component';
import { EditProfileComponent } from './user-profile/index';
import { BsComponentRef } from 'ngx-bootstrap/component-loader/bs-component-ref.class';
import { FooterComponent } from './footer/footer.component';
import { RatingComponent } from './rating/rating.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        OwlDateTimeModule, 
        OwlNativeDateTimeModule,
        routing,
        ModalModule.forRoot(),
        TimepickerModule.forRoot(),
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
        CreateEventComponent,
        MainpageComponent,
        SimplemapComponent,
        LocationMapComponent,
        UserProfileComponent,
        EditProfileComponent,
        EventlistComponent,
        FooterComponent,
        RatingComponent,
        EditEventComponent,
    ],
    providers: [
        AuthGuard,
        AlertService,
        AuthenticationService,
        BsModalRef,
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
        //fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})
 
export class AppModule { }
