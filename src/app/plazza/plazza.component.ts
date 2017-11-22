import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plazza',
  templateUrl: './plazza.component.html',
  styleUrls: ['./plazza.component.scss'],
})
export class PlazzaComponent implements OnInit {
  tabLinks = [
    { label: 'Questions', link: 'questions'},
    { label: 'Archive', link: 'archive'},
    { label: 'Groups', link: 'groups'},
  ];
  activeLinkIndex = 0;

  constructor(private router: Router) {
      // TODO: this should be easier using activated route index
      // for now this should work
      this.activeLinkIndex = this.tabLinks.findIndex(routedTab => router.url.indexOf(routedTab.link) !== -1);
  }

  ngOnInit() {
  }

}
