import {
  AppBar,
  Button,
  IconButton,
  makeStyles,
  TextField,
  Toolbar,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  SvgIcon,
  OutlinedInput,
} from "@material-ui/core";
import { Height } from "@material-ui/icons";
import logo from "../assets/logo.png"; // Tell Webpack this JS file uses this image
import { appText } from "../utils/constant";
import { Icon } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import EditTopicSelect from "./EditTopicSelect";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 110,
    height: 37,
    border: 0,
    borderRadius: 2,
    backgroundColor: "rgba(212,45,48,1)",
    marginTop: theme.spacing(3),
    color: "rgba(255,255,255,1)",
    fontWeight: 400,
    "&.Mui-disabled ": {
      color: "rgba(151,151,151,1)",
      backgroundColor: "rgba(196,196,196,1)",
    },
    "&:hover ": {
      backgroundColor: "rgba(212,45,48,1)",
      color: "rgba(255,255,255,1)",
    },
  },
}));

const SubmitButton = ({ disabled, content, onClick }) => {
  const classes = useStyles();
 
  return (
    <Button disabled={false} className={classes.root} onClick={onClick}>
      {content}
    </Button>
  );
};

export default SubmitButton;
