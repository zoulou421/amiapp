FROM node:20 as build

WORKDIR /app

# Copy package.json and package-lock.json if present
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Build the Angular project
RUN npm run build -- --output-path=dist/amiapp

# Serve the application using Nginx
FROM nginx:alpine
COPY --from=build /app/dist/amiapp/browser /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]


#CMD to execute:
#docker build -t angular18-app .
#docker run -d -p 8080:80 angular18-app

#angular.json:
# "node_modules/materialize-css/dist/css/materialize.min.css",

