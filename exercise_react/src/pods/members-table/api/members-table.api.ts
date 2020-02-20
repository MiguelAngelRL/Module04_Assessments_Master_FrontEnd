import {MemberEntity, createDefaultMemberEntity } from 'pods';
import { trackPromise } from 'react-promise-tracker';
import { serverUrl } from 'core';

class AllMembersAPI {

  getAllMembers(organizationName : string) : Promise<MemberEntity[]> {
    const gitHubMembersUrl : string = `${serverUrl}/orgs/${organizationName}/members?per_page=100`;
    const promise = new Promise<MemberEntity[]>((resolve, reject) => {
      setTimeout(() => {
        resolve(fetch(gitHubMembersUrl)
        .then((response) => this.checkStatus(response))
        .then((response) => this.parseJSON(response))
        .then((data) => this.resolveMembers(data)))
      },1000); //That time is just to show the spinner for a while. Put it to 0 to get the real behaviour
    })
    return promise;
  }

  private checkStatus(response : Response) : Promise<Response> {
    if (response.status >= 200 && response.status < 300) {
      return Promise.resolve(response);
    } else {
      let error = new Error(`Error ${response.status}: ${response.statusText}`);
      throw error;
    }
  }

  private parseJSON(response : Response) : any {
    return response.json();
  }

  private resolveMembers (data : any[]) : Promise<MemberEntity[]> {
    if (data.length<=0){
      let error = new Error("That organization has no members"); //e.g.'ThreeDots' organization
      throw error;
    }
    const members = data.map((gitHubMember) => {
      var member : MemberEntity = createDefaultMemberEntity();
      member.id = gitHubMember.id;
      member.login = gitHubMember.login;
      member.avatar_url = gitHubMember.avatar_url;
      return member;
    });
    return Promise.resolve(members);
  }

  loadAllMembers = (view, setView, setAlertDialogError, handleAlertOpen) => {
    const orgNameToFetch = (document.getElementById("organization")["value"]).trim().toLowerCase();
    if(orgNameToFetch && (orgNameToFetch!==view.lastOrgFetched)) {
      trackPromise(
          this.getAllMembers(orgNameToFetch)
          .then(members => {setView({...view, members, page:0, buttonDisabled:false, lastOrgFetched:orgNameToFetch});})
          .catch(err => {setAlertDialogError(err.message); handleAlertOpen(); 
            setView({members:[], page:0, buttonDisabled:false, lastOrgFetched:orgNameToFetch});})
      );
    }
  };
}

export const allMembersAPI = new AllMembersAPI();
