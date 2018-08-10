import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';

import router from './route';

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
  console.log(`Products app starts at port ${PORT}`);
});

export default app;
