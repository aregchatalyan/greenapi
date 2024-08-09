import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import * as exphbs from 'express-handlebars';
import { config } from './config';
import { router } from './api/api.routes';

const app = express();
const PORT = config.get('PORT');

app.engine('hbs', exphbs.engine({
  extname: '.hbs',
  defaultLayout: 'main'
}));
app.set('view engine', 'hbs');
app.set('views', 'src/views');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(router);

app.use((err: Error, _req: Request, _res: Response, next: NextFunction) => {
  if (err) return console.error(err.message);
  next();
})

app.listen(PORT, () => {
  console.log('Listening on port:', PORT);
});
