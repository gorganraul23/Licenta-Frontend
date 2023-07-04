import {Component} from '@angular/core';
import {Session, SessionsService} from "../../services/sessions.service";
import {Router} from "@angular/router";
import {DatePipe, DecimalPipe} from '@angular/common';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ToastService} from "../toast/toast.service";
import {DeleteSessionComponent} from "./delete-session/delete-session.component";

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.css']
})
export class SessionsComponent {

  displayedColumns: string[] = ['name', 'start_time', 'end_time', 'reference', 'delete'];
  dataSource: Session[] = [];

  constructor(private service: SessionsService, private router: Router, private decimalPipe: DecimalPipe,
              private datePipe: DatePipe, private dialog: MatDialog, private toast: ToastService) {
  }

  ngOnInit(): void {
    this.service.getSessions().subscribe(res => {
      this.dataSource = res;
      console.log(res);
    })
  }

  public clickOnItemRow(id: string, reference: number) {
    if(reference != 0.0)
      this.router.navigate(['/sessions/', id]);
    else
      this.toast.showToast("Sesiune inca in desfasurare", 'info')
  }

  formatDate(date: Date): string {
    const formattedDate = this.datePipe.transform(date, 'dd-MM-yyyy hh:mm:ss');
    return formattedDate!!;
  }

  formatReference(reference: number): string {
    const floatNumber = this.decimalPipe.transform(reference!!, '1.2-2');
    return floatNumber!!
  }


  deleteSession(event: any, id: string) {
    event.stopPropagation();
    this.openDeleteSessionDialog(id);
  }

  openDeleteSessionDialog(id: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      id
    };

    dialogConfig.autoFocus = false

    const dialogRef = this.dialog.open(DeleteSessionComponent, dialogConfig)

    dialogRef.afterClosed().subscribe(
      status => {
        if (status) {
          this.service.getSessions().subscribe(res => {
            this.dataSource = res;
          })
          this.toast.showToast('Sesiune stearsa', 'info')
        }
      }
    );
  }

}
