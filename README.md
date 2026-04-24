# Round2 - Book Review Management

Ung dung fullstack quan ly tac gia, sach va danh gia sach.

- Backend: Express + TypeScript + Firebase Admin (Firestore)
- Frontend: Next.js (App Router) + React + Tailwind CSS

## 1. Cong nghe su dung

### Backend (`backend/`)

- Node.js + TypeScript
- Express 5
- Firebase Admin SDK (`firebase-admin`) de ket noi Firestore
- `ts-node-dev` cho moi truong dev

### Frontend (`frontend/`)

- Next.js 16
- React 19
- Tailwind CSS 4
- TypeScript

## 2. Cau truc project

```text
backend/
  src/
    app.ts
    firebase.ts
    routes.ts
    controllers/
    services/
    models/
    types/

frontend/
  app/
    page.tsx
    lib/
    services/
    components/
```

## 3. Chay local

### Yeu cau

- Node.js 18+ (khuyen nghi Node.js 20+)
- npm
- Firebase service account (neu dung Firestore that)

### 3.1 Backend

```bash
cd backend
npm install
npm run dev
```

Backend chay tai: `http://localhost:3000`

Health check:

- `GET /` -> thong tin backend
- `GET /health` -> trang thai `ok`

### 3.2 Frontend

```bash
cd frontend
npm install
# macOS/Linux
cp .env.example .env.local

# Windows PowerShell
Copy-Item .env.example .env.local
npm run dev
```

Frontend chay tai: `http://localhost:3001`

## 4. Bien moi truong

### Frontend

File mau: `frontend/.env.example`

```env
NEXT_PUBLIC_API_BASE=http://localhost:3000/api
```

Ghi chu:

- Trong dev, neu khong set `NEXT_PUBLIC_API_BASE`, frontend se fallback ve `http://localhost:3000/api`.
- Trong production, bat buoc phai set `NEXT_PUBLIC_API_BASE`.

### Backend

Backend khoi tao Firebase theo thu tu:

1. Doc `FIREBASE_SERVICE_ACCOUNT_JSON` (khuyen nghi khi deploy).
2. Neu khong co, doc file `backend/serviceAccountKey.json`.
3. Neu khong co nua, fallback `admin.initializeApp()` (Application Default Credentials).

Vi du `FIREBASE_SERVICE_ACCOUNT_JSON`:

```env
FIREBASE_SERVICE_ACCOUNT_JSON={"type":"service_account","project_id":"...","private_key_id":"...","private_key":"-----BEGIN PRIVATE KEY-----\\n...\\n-----END PRIVATE KEY-----\\n","client_email":"...","client_id":"...","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url":"..."}
```

Luu y bao mat:

- Khong commit `serviceAccountKey.json`.
- Khong commit file `.env*` that.

## 5. API chinh

Base URL: `/api`

### Author

- `GET /authors?page=1`
- `GET /authors/options`
- `POST /authors` body: `{ "name": "..." }`
- `PUT /authors/:id` body: `{ "name": "..." }`
- `DELETE /authors/:id`

### Book

- `GET /books?page=1`
- `GET /books/options`
- `POST /books` body: `{ "title": "...", "authorId": "..." }`
- `PUT /books/:id` body: `{ "title": "...", "authorId": "..." }`
- `DELETE /books/:id`

### Review

- `GET /reviews?page=1`
- `POST /reviews` body: `{ "content": "...", "bookId": "..." }`
- `PUT /reviews/:id` body: `{ "content": "...", "bookId": "..." }`
- `DELETE /reviews/:id`

Pagination response:

```json
{
  "page": 1,
  "limit": 5,
  "total": 24,
  "totalPages": 5,
  "data": []
}
```

## 6. Deploy

### 6.1 Backend (Render)

Repo hien tai dang tham chieu endpoint Render trong frontend env, phu hop deploy backend tren Render.

1. Tao Web Service tren Render, root directory: `backend`.
2. Build command: `npm install && npm run build`
3. Start command: `npm run start`
4. Set environment variable:
   - `FIREBASE_SERVICE_ACCOUNT_JSON` = JSON service account (1 dong)
5. Deploy va lay URL, vi du:
   - `https://your-backend.onrender.com`

### 6.2 Frontend (Vercel)

1. Import repo len Vercel, chon root directory: `frontend`.
2. Framework preset: Next.js.
3. Set environment variable:
   - `NEXT_PUBLIC_API_BASE=https://your-backend.onrender.com/api`
4. Deploy.

Neu khong dung Vercel, co the deploy frontend o bat ky nen tang nao chay duoc Next.js va set bien env tuong tu.

## 7. Scripts

### Backend

- `npm run dev` - chay dev voi ts-node-dev
- `npm run build` - build TypeScript ra `dist/`
- `npm run start` - chay ban build

### Frontend

- `npm run dev` - chay Next.js dev tren port `3001`
- `npm run build` - build production
- `npm run start` - chay production tren port `3001`

## 8. Firestore collections

Backend su dung 3 collection:

- `authors`
- `books`
- `reviews`

## 9. Ghi chu nhanh

- Frontend yeu cau `NEXT_PUBLIC_API_BASE` trong production.
- Backend ho tro 3 cach xac thuc Firebase, uu tien env variable de deploy an toan.
- `PAGE_LIMIT` hien tai la `5` (backend).