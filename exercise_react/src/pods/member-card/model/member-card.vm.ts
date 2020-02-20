export interface SingleMemberEntity {
  name: string;
  login: string;
  avatar_url: string;
  bio:string;
  company:string;
  location:string;
  blog:string;
  public_repos: number,
  html_url: string,
  followers: number,
  created_at: string,
}

export const createDefaultSingleMemberEntity = () => ({
  name: "",
  login: "",
  avatar_url: "",
  bio: "",
  company: "",
  location: "",
  blog: "",
});