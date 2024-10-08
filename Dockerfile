FROM node:20-alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist/amiapp/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx","-g","daemon off;"]

#CMD to execute:
#docker build -t angular18-app .
#docker run -d -p 8080:80 angular18-app

