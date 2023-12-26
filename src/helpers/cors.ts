import cors from 'cors';

const allowedOrigins = [
  'http://localhost:8000',
  'https://localhost:8000',
  'https://localhost:3000',
  'http://localhost:3000',
];

export const internalOptions: cors.CorsOptions = {
  origin: allowedOrigins,
};
