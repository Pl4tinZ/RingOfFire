import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.scss']
})
export class NewGameComponent {

  constructor(public router: Router) {}

  goToStartScreen() {
    this.router.navigateByUrl('/')
  }
}
