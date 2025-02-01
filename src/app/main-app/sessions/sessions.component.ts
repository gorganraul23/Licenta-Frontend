import {Component, inject, OnInit} from '@angular/core';
import {Session, SessionsService} from "../../services/sessions.service";
import {Router} from "@angular/router";
import {DatePipe, DecimalPipe} from '@angular/common';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ToastService} from "../toast/toast.service";
import {DeleteSessionComponent} from "./delete-session/delete-session.component";
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-sessions',
  template: `
    <div class="content-wrapper">
      <div class="temp-container">
        <div class="content-container mat-elevation-z4 !m-0">
          <div class="header-container"></div>
          <div class="table-container">
            <table *ngIf="dataSource.length !== 0" mat-table [dataSource]="dataSource" class="mat-elevation-z8 demo-table">
              <ng-container matColumnDef="name">
                <th mat-header-cell *matHeaderCellDef>NAME</th>
                <td mat-cell *matCellDef="let element" class="details overflow">SESSION #{{element.id}}</td>
              </ng-container>
              <ng-container *ngIf="this.authService.isAdmin" matColumnDef="user">
                <th mat-header-cell *matHeaderCellDef>USER</th>
                <td mat-cell *matCellDef="let element" class="details overflow">{{element.user_email}}</td>
              </ng-container>
              <ng-container matColumnDef="start_time">
                <th mat-header-cell *matHeaderCellDef>START TIME</th>
                <td mat-cell *matCellDef="let element"
                    class="details overflow">{{formatDate(element.start_time)}}</td>
              </ng-container>
              <ng-container matColumnDef="end_time">
                <th mat-header-cell *matHeaderCellDef>END TIME</th>
                <td mat-cell *matCellDef="let element" class="details overflow">{{formatDate(element.end_time)}}</td>
              </ng-container>
              <ng-container matColumnDef="reference">
                <th mat-header-cell *matHeaderCellDef>REFERENCE</th>
                <td mat-cell *matCellDef="let element"
                    class="details overflow">{{formatReference(element.reference)}}</td>
              </ng-container>
              <ng-container matColumnDef="delete">
                <th mat-header-cell *matHeaderCellDef>DELETE</th>
                <td mat-cell *matCellDef="let element">
                  <button mat-icon-button (click)="deleteSession($event, element.id)">
                    <mat-icon class="delete-button">delete_outline</mat-icon>
                  </button>
                </td>
              </ng-container>
              <tr mat-header-row *matHeaderRowDef="displayedColumns; sticky: true"></tr>
              <tr mat-row *matRowDef="let row; columns: displayedColumns; let element" class="hover:cursor-pointer"
                  (click)="clickOnItemRow(element)"></tr>
            </table>
            <div *ngIf="dataSource.length === 0" class="flex">
              <p class="w-full justify-center text-xl pt-10">No sessions registered!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .mat-row .mat-cell {
      border-bottom: 1px solid #CCDBF0;
      border-top: 1px solid transparent;
      cursor: pointer;
    }

    .mat-row:hover .mat-cell {
      background-color: #FCF1E9;
      border-bottom: 1px solid #294166;
    }

    .mat-header-row {
      background-color: #CBDAF0;
    }

    .mdc-data-table__header-cell {
      text-align: center;
    }

    .mdc-data-table__cell {
      text-align: center;
    }

    .mat-mdc-table .mdc-data-table__row:nth-child(n){
      background-color: #ffffff;
    }
    .mat-mdc-table .mdc-data-table__row:not(:nth-child(2n+1)){
      background-color: rgba(228,228,228,0.35);
    }

    .mat-mdc-table .mdc-data-table__header-row{
      background-color: rgb(201, 199, 199)
    }

    .details {
      font-weight: bold;
      color: #314D77;
    }

    .table-container {
      display: flex;
      justify-content: center;
      overflow-y: auto;
      max-height: 89%;
    }

    .header-container {
      display: flex;
      justify-content: right;
      margin-right: 1%;
      margin-bottom: 30px;
    }  
  `]
})
export class SessionsComponent implements OnInit {

  ///
  /// DI
  ///

  private readonly service = inject(SessionsService);
  private readonly router = inject(Router);
  private readonly decimalPipe = inject(DecimalPipe);
  private readonly datePipe = inject(DatePipe);
  private readonly dialog = inject(MatDialog);
  private readonly toast = inject(ToastService);
  protected readonly authService = inject(LoginService);

  ///
  /// View Model
  ///

  protected displayedColumns: string[] = [];
  protected dataSource: Session[] = [];

  ///
  /// Lifecycle Events
  ///

  public ngOnInit(): void {
    this.authService.isAdmin ? this.displayedColumns = ['name', 'user', 'start_time', 'end_time', 'reference', 'delete'] : this.displayedColumns = ['name', 'start_time', 'end_time', 'reference', 'delete'];
    this.service.getSessions().subscribe(res => {
      this.dataSource = res;
    });
  }

  ///
  /// UI Handlers
  ///

  protected clickOnItemRow(row: Session) {
    if(row.end_time != null)
      this.router.navigate(['/sessions/', row.id]);
    else
      this.toast.showToast("Session is still ongoing", 'info')
  }

  protected formatDate(date: Date): string {
    const formattedDate = this.datePipe.transform(date, 'dd-MM-yyyy hh:mm:ss');
    return formattedDate!!;
  }

  protected formatReference(reference: number): string {
    const floatNumber = this.decimalPipe.transform(reference!!, '1.2-2');
    return floatNumber!!
  }

  protected deleteSession(event: any, id: string) {
    event.stopPropagation();
    this.openDeleteSessionDialog(id);
  }

  protected openDeleteSessionDialog(id: string) {
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
          this.toast.showToast('Session deleted successfully', 'info')
        }
      }
    );
  }

}
