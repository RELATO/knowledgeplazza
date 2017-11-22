import { Component, OnInit } from '@angular/core';
import { MediaMonitor } from '@angular/flex-layout';
import { MdSnackBar, MdSnackBarConfig, MdSnackBarRef } from '@angular/material';
import { Router } from '@angular/router';

import { BattlesService } from 'app/battles/battles.service';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss'],
})
export class SplashComponent implements OnInit {
  private ref: MdSnackBarRef<any>;

  constructor(
    private snackBar: MdSnackBar,
    private router: Router,
    private monitor: MediaMonitor,
    private battlesService: BattlesService,
  ) { }

  answerChosen() {
    if (this.ref) { this.ref.dismiss(); };

    let config = new MdSnackBarConfig();

    config.duration = 5000;

    this.ref = this.snackBar.open('Now sign in to save your stats.', null, config);
    this.router.navigate(['/login/sign-up']);
  }

  ngOnInit() {
  }

}
