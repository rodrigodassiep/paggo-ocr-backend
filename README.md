# paggo-ocr-backend

## Information

### General Overview
This repository contains the NestJS API that handles authentication, data, OCR and LLM integration.

### Authentication
The Authentication is implemented using JWT and Passport

### Data 
Data management is done through Prisma, which deals with the two relevant tables?

### OCR
OCR is done via Tesseract.js

### LLM Integration
The LLM used is Google Gemini, the interaction with it is done through API requests.

## Instructions for setting up and running locally

### Prerequisites
1. **Node.js & npm**: Check with `node -v` and `npm -v`.
2. **NestJS CLI**: Install with `npm install -g @nestjs/cli`.

### Setup
1. **Clone Project**: Clone this NestJS project.
2. **Install Dependencies**: Run `npm install`.
3. **Environment Variables**: Create a `.env` file with:
   ```env
   DATABASE_URL="your_database_url_here" (SQLite file location)
   JWT_SECRET="your_jwt_secret"
   GOOGLE_API_KEY="your_google_gemini_api_key"
   ```
4. **Prisma**:
   - Generate client: `npx prisma generate`
   - Run migrations: `npx prisma migrate dev`

### Run Application
- Dev mode: `npm run start:dev`
- Prod mode: `npm run build` then `npm run start:prod`

### Resources
- [NestJS Docs](https://docs.nestjs.com/)
- [Prisma Docs](https://www.prisma.io/docs/)