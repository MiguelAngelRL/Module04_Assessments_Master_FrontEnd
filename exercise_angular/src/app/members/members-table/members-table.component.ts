import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';

import { MemberEntity } from '../models/member.model';
import { MembersApiService } from '../members-api.service';

@Component({
  selector: 'app-members-table',
  templateUrl: './members-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: []
})
export class MembersTableComponent {
  $members: Observable<MemberEntity[]>;
  organization: string = "lemoncode";
  
  constructor(private membersApi: MembersApiService) { }

  loadMembers() {
    this.$members=this.membersApi.getAllMembers(this.organization);
  }

}
