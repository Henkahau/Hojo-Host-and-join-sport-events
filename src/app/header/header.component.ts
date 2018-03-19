import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent{

    constructor(private router: Router) {}

    onSelect(feature: string)
    {
        switch (feature)
        {
            case 'create': {
                this.router.navigate(['/createEvent']);
                break;
            }
            case 'login': {
                this.router.navigate(['/login']);
                break;
            }
            case 'register': {
                this.router.navigate(['/register']);
                break;
            }
        }
    }
}