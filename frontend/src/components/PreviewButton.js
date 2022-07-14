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
  previewButton: {
    width: 76,
    height: 28,
    marginRight: 14,
    marginTop: 19,
    padding: 0,

    backgroundColor: "rgba(212,45,48,1)",
    marginTop: theme.spacing(3),
    color: "rgba(255,255,255,1)",
    fontSize: 12,
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

const PreviewButton = ({ disabled, content,onClick  }) => {
  const classes = useStyles();

  return (
    <Button className={classes.previewButton} disableRipple disabled={disabled} onClick={onClick}>
      {content}
    </Button>
  );
};

export default PreviewButton;
