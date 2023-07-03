import {Component, Inject, OnInit,} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SessionsService} from "../../../services/sessions.service";

@Component({
  selector: 'app-delete-session',
  templateUrl: './delete-session.component.html',
  styleUrls: ['./delete-session.component.css']
})
export class DeleteSessionComponent implements OnInit {

  id: string = ''

  constructor(private dialogRef: MatDialogRef<DeleteSessionComponent>,
              @Inject(MAT_DIALOG_DATA) data: any,
              private service: SessionsService) {
    if (data.id) {
      this.id = data.id
    }
  }

  ngOnInit(): void {
  }

  deleteSession() {
    this.service.deleteSession(this.id).subscribe(() => {
      this.dialogRef.close(true);
    })
  }

  cancel() {
    this.dialogRef.close(false);
  }

}
