FROM node:16-alpine AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build -- -c production

FROM nginx:1.21.3-alpine AS production

ADD nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /var/www

COPY --from=development /usr/src/app/dist/encodot .
