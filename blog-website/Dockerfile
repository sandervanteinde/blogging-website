FROM node:latest as build-step
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN npm install --legacy-peer-deps
COPY . /app
RUN npm run build

FROM nginx:latest
COPY --from=build-step /app/dist/blog-website /usr/share/nginx/html
