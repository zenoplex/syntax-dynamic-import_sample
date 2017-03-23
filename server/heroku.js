// @flow
import express from 'express';
import R from 'ramda';
import { gzip, staticRoute, listen, browserHistory } from './middlewares';
import config from '../webpack.config';

const app = express();
const port = Number(process.env.PORT) || 3000;

R.pipe(
  gzip,
  staticRoute(config.output.path),
  browserHistory,
  staticRoute(config.output.path),
  listen(port),
)(app);
