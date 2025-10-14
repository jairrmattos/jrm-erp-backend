# JRM ERP - Skeleton Project

This archive contains a skeleton/full-structure for the JRM ERP project (backend + frontend).
It includes essential backend routes, controllers and frontend React components to get started.

How to run backend:
1. Set environment variables in backend/.env (use .env.example as base)
2. Install: `cd backend && npm install`
3. Run migrations: execute backend/migrations/001_schema.sql in your Postgres DB
4. Start server: `npm run dev` or `npm start`

How to run frontend:
1. `cd frontend && npm install`
2. Set REACT_APP_API_URL in .env if needed
3. `npm start`

Notes:
- This is a skeleton assembled automatically. You will need to adjust database table/column names and secure secrets before production.
- Integrations (Google OAuth, RotasBrasil) are placeholders and need API keys.

