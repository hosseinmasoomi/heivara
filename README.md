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

## Production without building on the server

Use this path when the server cannot reach npm registries.

Build the runtime image on a machine that can install dependencies:

```bash
npm install
npx prisma generate
npm run build
docker build -f Dockerfile.release -t heivara:prod .
docker save heivara:prod | gzip > heivara-prod.tar.gz
```

Copy the image archive to the server:

```bash
scp heivara-prod.tar.gz root@YOUR_SERVER_IP:/var/www/heivara/
```

On the server:

```bash
cd /var/www/heivara
gunzip -c heivara-prod.tar.gz | docker load
docker compose -f docker-compose.runtime.yml up -d
docker compose -f docker-compose.runtime.yml exec app npm run admin:create
```
