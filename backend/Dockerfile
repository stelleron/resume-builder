FROM node:24

# Install PostgreSQL client
RUN apt-get update && apt-get install -y postgresql-client

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate
EXPOSE 3000
ENTRYPOINT ["./entrypoint.sh"]