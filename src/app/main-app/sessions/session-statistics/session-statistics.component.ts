import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Session, SessionsService} from "../../../services/sessions.service";

@Component({
  selector: 'app-session-statistics',
  templateUrl: './session-statistics.component.html',
  styleUrls: ['./session-statistics.component.css']
})
export class SessionStatisticsComponent {

  session: Session = {start_time: null, end_time:null, id: '', reference: 0}

  constructor(private route: ActivatedRoute, private service: SessionsService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const sessionId = params['id'];
      console.log(sessionId);

      this.service.getSessionById(sessionId).subscribe(res => {
        this.session = res;
        console.log(this.session);
      })
    });
  }


}
