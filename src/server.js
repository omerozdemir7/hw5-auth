import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { env } from './utils/env.js';
import contactsRouter from './routers/contacts.js';
import authRouter from './routers/auth.js'; // <-- EKLENDİ
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';

const PORT = Number(env('PORT', '3000'));

export const setupServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(cookieParser());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  // Ana Sayfa Mesajı
  app.get('/', (req, res) => {
    res.json({
      message: "Contacts API is running!",
      endpoints: {
        auth: "/auth/register, /auth/login",
        contacts: "/contacts"
      }
    });
  });

  // Rotaları Tanımla
  app.use('/auth', authRouter); // <-- EKLENDİ (Artık giriş yapılabilir)
  app.use('/contacts', contactsRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};