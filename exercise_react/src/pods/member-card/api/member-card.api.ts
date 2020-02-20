import { SingleMemberEntity } from 'pods';
import { trackPromise } from 'react-promise-tracker';
import { serverUrl } from 'core';

class SingleMemberAPI {

  getSingleMember(memberName : string) : Promise<SingleMemberEntity> {
    const gitHubSingleMemberUrl : string = `${serverUrl}/users/${memberName}`;
    const promise = new Promise<SingleMemberEntity>((resolve, reject) => {
      setTimeout(() => {
        resolve(fetch(gitHubSingleMemberUrl)
        .then((response) => this.checkStatus(response))
        .then((response) => this.parseJSON(response))
        .then((data) => this.resolveSingleMember(data)))
      },0);
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

  private resolveSingleMember (data: any) : Promise<SingleMemberEntity> {
    const notInformedField = "(Not Informed)";
    if (Object.keys(data).length<=0){
      let error = new Error("That member has no data");
      throw error;
    }
    const checkField = (field) => {
      return field ? field : notInformedField;
    }
    const singleMember:SingleMemberEntity = {
      name: checkField(data.name),
      login: checkField(data.login),
      avatar_url: checkField(data.avatar_url),
      bio: checkField(data.bio),
      company: checkField(data.company),
      location: checkField(data.location),
      blog: checkField(data.blog),
      public_repos: checkField(data.public_repos),
      html_url: checkField(data.html_url),
      followers: checkField(data.followers),
      created_at: checkField(data.created_at),
    };
    return Promise.resolve(singleMember);
  }

  loadSingleMember = (memberNameToFetch, setSingleMember, setError) => {
    if(memberNameToFetch) {
      trackPromise(
          this.getSingleMember(memberNameToFetch)
          .then(singleMemberFetched => setSingleMember(singleMemberFetched))
          .catch(err => setError(err)), "detail"
      );
    }
  };
}

export const singleMemberAPI = new SingleMemberAPI();
