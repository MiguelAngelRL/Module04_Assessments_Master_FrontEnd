import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
    root: {
      width: '50%',
    },
    container: {
      maxHeight: 440,
    },
    myStyle: {
      display: "flex",
      justifyContent: "center", 
      alignItems: "center",
    },
    avatarLarge: {
      width: '10rem',
      height: '10rem',
    }
});

export const useValidateUrl = (str) => {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
}