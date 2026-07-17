import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { env } from "./config/env";
import routes from "./routes"
import { errorHandler } from "./middleware/errorHandler";

const app = express();

app.use(cors({ origin: env.FRONTEND_URL }));
app.use(helmet());
app.use(express.json());

app.use('/api', routes);
app.use(errorHandler);

export default app;
