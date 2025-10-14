import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import session from 'express-session';
import passport from 'passport';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes.js';
import companyRoutes from './routes/companyRoutes.js';
import productRoutes from './routes/productRoutes.js';
import transportadoraRoutes from './routes/transportadoraRoutes.js';
import motoristaRoutes from './routes/motoristaRoutes.js';
import veiculoRoutes from './routes/veiculoRoutes.js';
import iscaRoutes from './routes/iscaRoutes.js';
import freteRoutes from './routes/freteCotacaoRoutes.js';
import manifestoRoutes from './routes/manifestoRoutes.js';
import financeiroRoutes from './routes/financeiroRoutes.js';
import contasRoutes from './routes/contasRoutes.js';
import webhookRoutes from './routes/webhookRoutes.js';
import reportRoutes from './routes/reportRoutes.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET || 'sessionsecret',
  resave: false,
  saveUninitialized: true
}));

app.use('/auth', authRoutes);
app.use('/companies', companyRoutes);
app.use('/products', productRoutes);
app.use('/transportadoras', transportadoraRoutes);
app.use('/motoristas', motoristaRoutes);
app.use('/veiculos', veiculoRoutes);
app.use('/iscas', iscaRoutes);
app.use('/frete-cotacoes', freteRoutes);
app.use('/manifestos', manifestoRoutes);
app.use('/financeiro', financeiroRoutes);
app.use('/contas', contasRoutes);
app.use('/webhook', webhookRoutes);
app.use('/reports', reportRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
