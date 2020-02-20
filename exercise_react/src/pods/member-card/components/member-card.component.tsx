import * as React from 'react';
import { singleMemberAPI } from 'pods';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { useStyles } from "common";
import Link from '@material-ui/core/Link';

interface Props {
    member_login: string;
}

export const MemberDetails = (props:Props) => {
    const [singleMember, setSingleMember] = React.useState(null);
    const [error, setError] = React.useState(null);
    const [classes] = React.useState(useStyles());

    React.useEffect(() => {
      singleMemberAPI.loadSingleMember(props.member_login, setSingleMember, setError);}, []);

    return (
        (singleMember) &&
        (
          <>  
            <Card>
              <CardHeader
                  avatar={<Avatar aria-label="recipe" src={singleMember.avatar_url} className={classes.avatarLarge}/>}
                  title={singleMember.name} subheader={singleMember.login}
              />
              <CardContent>
                <Typography variant="body1" color="textPrimary" component="p">{`Bio: `}</Typography>
                <Typography variant="body2" color="textSecondary" component="p">{singleMember.bio}</Typography>
                <Typography variant="body1" color="textPrimary" component="p">{`Company: `}</Typography>
                <Typography variant="body2" color="textSecondary" component="p">{singleMember.company}</Typography>
                <Typography variant="body1" color="textPrimary" component="p">{`Location: `}</Typography>
                <Typography variant="body2" color="textSecondary" component="p">{singleMember.location}</Typography>
                <Typography variant="body1" color="textPrimary" component="p">{`Blog: `}</Typography>
                <Typography variant="body2" color="textSecondary" component="p">{singleMember.blog}</Typography>
                <Typography variant="body1" color="textPrimary" component="p">{`Public Repos: `}</Typography>
                <Typography variant="body2" color="textSecondary" component="p">{singleMember.public_repos}</Typography>
                <Typography variant="body1" color="textPrimary" component="p">{`GitHub Page: `}</Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  <Link href={singleMember.html_url} target="_blank" rel="noreferrer">
                    {singleMember.html_url}
                  </Link>
                </Typography>
                <Typography variant="body1" color="textPrimary" component="p">{`Followers: `}</Typography>
                <Typography variant="body2" color="textSecondary" component="p">{singleMember.followers}</Typography>
                <Typography variant="body1" color="textPrimary" component="p">{`GitHub Member Since: `}</Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {new Date(singleMember.created_at).toLocaleDateString()}
                </Typography>
              </CardContent>
            </Card>
        </>
        )
    )
}