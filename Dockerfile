# Étape 1 : Build
FROM node:20-alpine AS build
WORKDIR /app

ARG VITE_SAFEMODE_URL=http://192.168.1.159:30080
ENV VITE_SAFEMODE_URL=$VITE_SAFEMODE_URL

COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Étape 2 : Serveur Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]