import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.scss']
})
export class EditPlayerComponent {

  allProfilePictures = ['1.png', '2.svg', 'monkey.jpg', 'linux.png', 'dog.png', 'angry.png', 'pig.png', 'smiley.png', 'rabbit.svg']

  constructor(public dialogRef: MatDialogRef<EditPlayerComponent>) {}
  
  onNoClick() {
    this.dialogRef.close();
  }

}
