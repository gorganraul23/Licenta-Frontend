import { Component } from '@angular/core';
import {Session, SessionsService} from "../../services/sessions.service";
import {Router} from "@angular/router";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.css']
})
export class SessionsComponent {

  displayedColumns: string[] = ['name', 'start_time', 'end_time'];
  dataSource: Session[] = [];

  constructor(private service: SessionsService, private router: Router,
              private datePipe: DatePipe) {
  }

  ngOnInit(): void {
    this.service.getSessions().subscribe(res => {
      this.dataSource = res;
    })
  }

  public clickOnItemRow(id: string) {
    this.router.navigate(['/sessions/', id]);
  }

  formatDate(date: Date): string{
    const formattedDate = this.datePipe.transform(date, 'dd-MM-yyyy hh:mm:ss');
    return formattedDate!!;
  }

}
