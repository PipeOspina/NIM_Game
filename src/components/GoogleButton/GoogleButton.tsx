import {
  Theme,
  withStyles
} from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import { blue } from '@material-ui/core/colors'


const GoogleButton = withStyles((theme: Theme) => ({
  root: {
    color: theme.palette.getContrastText(blue[600]),
    backgroundColor: blue[600],
    '&:hover': {
      backgroundColor: blue[700]
    }
  }
}))(Button)

export default GoogleButton
