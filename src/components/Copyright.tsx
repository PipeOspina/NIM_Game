import React from 'react'
import FavoriteIcon from '@material-ui/icons/Favorite'
import './Copyright.scss'
import {
  Typography,
  Link
} from '@material-ui/core'


export default function Copyright(): JSX.Element {
  return (
    <Typography
      variant="body2"
      color="textSecondary"
      align="center"
    >
      {'© '}
      {new Date().getFullYear()}
      {' '}
      <Link
        color="primary"
        target="_blank"
        rel="noreferrer"
        href="https://mit-license.org/"
      >
        MIT License
      </Link>
      {' - Build with '}
      <FavoriteIcon
        className="icon"
        color="secondary"
      />
      {' by '}
      <Link
        color="primary"
        target="_blank"
        rel="noopener"
        href="https://github.com/PipeOspina"
      >
        @PipeOspina
      </Link>
      {'.'}
    </Typography>
  );
}
