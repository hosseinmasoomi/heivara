# Heivara

Next.js 16 + Prisma + PostgreSQL

## Local development

```bash
npm ci
npx prisma generate
npm run dev
```

## Production with Docker

### 1. Prepare env

```bash
cp .env.production.example .env.production
```

Set these values before deployment:

- `POSTGRES_PASSWORD`
- `NEXT_PUBLIC_APP_URL`
- `OTP_SECRET`
- `SESSION_SECRET`
- `ARVAN_AI_BASE_URL`
- `ARVAN_AI_API_KEY`

Do not set `DEV_MASTER_OTP` in production.

### 2. Start services

```bash
docker compose up -d --build
```

App:

- `http://SERVER_IP:3000`

Healthcheck:

- `http://SERVER_IP:3000/api/health`

### 3. Create or promote admin

After the stack is up:

```bash
docker compose exec app npm run admin:create
```

The script uses:

- `ADMIN_PHONE`
- `ADMIN_NAME`
- `ADMIN_EMAIL`

from `.env.production`.

### 4. Useful commands

Logs:

```bash
docker compose logs -f app
docker compose logs -f postgres
```

Restart app:

```bash
docker compose restart app
```

Stop:

```bash
docker compose down
```

Stop and remove volumes:

```bash
docker compose down -v
```

## Docker notes

- Prisma migrations run automatically on container startup.
- Blog uploads persist in the Docker volume mounted to `/app/public/uploads/blog`.
- Knowledge files are mounted from `./data/knowledge`.
- PostgreSQL data persists in the `postgres_data` volume.
