import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'book-ticket';
  totalSeats:any[] = [];
  constructor(){
    this.seats();
  }

  seats() {
    // initialize the seats array
    this.totalSeats = [];
    for (let i = 0; i < 10; i++) {
      this.totalSeats[i] = [];
      for (let j = 0; j < 7; j++) {
        this.totalSeats[i][j] = "available";
      }
      // mark the last row as having only 3 Seats
      if (i == 9) {
        this.totalSeats[i][0] = "unavailable";
        this.totalSeats[i][1] = "unavailable";
        this.totalSeats[i][2] = "unavailable";
        this.totalSeats[i][6] = "unavailable";
      }
    }
    console.log(this.totalSeats);
  }

  bookSeats(seat: any) {
    console.log(seat.value);
    let numSeats: number = seat.value
    if (numSeats < 8) {
      let bookedSeats: any = [];
      let row = -1;
      let startSeat = -1;
      // search for consecutive available seats in one row
      for (let i = 0; i < 10; i++) {
        let count = 0;
        for (let j = 0; j < 8; j++) {
          if (this.totalSeats[i][j] == "available") {
            if (count == 0) {
              startSeat = j;
            }
            count++;
            if (count == numSeats) {
              row = i;
              break;
            }
          } else {
            count = 0;
          }
        }
        if (row != -1) {
          break;
        }
      }
      // if consecutive seats not found in one row, search in adjacent rows
      if (row == -1) {
        for (let i = 0; i < 10; i++) {
          let count = 0;
          for (let j = 0; j < 8; j++) {
            if (this.totalSeats[i][j] == "available") {
              if (count == 0) {
                startSeat = j;
              }
              count++;
              if (count == numSeats) {
                row = i;
                break;
              }
            } else {
              count = 0;
            }
          }
          if (row != -1) {
            break;
          }
        }
      }
      // if seats found, mark them as unavailable.
      if (row != -1) {
        console.log(startSeat, Number(numSeats))
        for (let j = startSeat; j < startSeat + Number(numSeats); j++) {
          console.log(typeof numSeats)
          this.totalSeats[row][j] = "unavailable";
          bookedSeats.push(row * 8 + j + 1);
        }
      }
      console.log(bookedSeats);
      console.log(this.totalSeats)
    }
    else {
      alert("Not allowed more than 7 tickets at a time")
    }

  }

}

