import { Component } from '@angular/core';
import { Game } from 'src/models/game';
import {MatDialog} from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {
  pickCardAnimation = false;
  game !: Game;
  currentCard: string = '';
  newGameCard = false;

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore, public dialog: MatDialog) {}

  ngOnInit() {
    this.newGame();
    this.route.params.subscribe((params) => {
      console.log(params['id'])

      this.firestore
      .collection('games')
      .doc(params['id'])
      .valueChanges()
      .subscribe((game: any) => {
        console.log(game);
        this.game.currentPlayer = game.currentPlayer;
        this.game.playedCards = game.playedCards;
        this.game.players = game.players;
        this.game.stack = game.stack;
      });
    });
  }

  newGame() {
    this.game = new Game();
  }

  takeCard() {
    if (!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop();
      this.pickCardAnimation = true;
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      if (this.game.stack.length == 0) {this.newGameCard = true};

      setTimeout(() => {
        this.pickCardAnimation = false;
        this.game.playedCards.push(this.currentCard);
      }, 1000)
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe(name => {
      console.log(name);
      if (name == null) {

      } else {
        this.game.players.push(name);
      }
    });
  }
}
