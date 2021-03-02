FROM node:latest as build-step
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN npm install --legacy-peer-deps
COPY . /app
RUN npm run build

FROM nginx:alpine
COPY ./docker/default.conf /etc/nginx/conf.d/default.conf
COPY ./docker/40-replace-vars.sh /docker-entrypoint.d/40-replace-vars.sh
COPY --from=build-step /app/dist/blog-website /usr/share/nginx/html
