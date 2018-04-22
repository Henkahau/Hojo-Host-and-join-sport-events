import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  modalRef: BsModalRef;

  constructor(
    private router: Router,
    private modalService: BsModalService) { }


  ngOnInit() {
  }

  navigateHome() {
    this.router.navigate(['']);
  }

}
