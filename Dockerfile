# Use the official Node.js image as the base image
FROM node:20 AS build  

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application with the production configuration
RUN npm run build --configuration production --output-path=docs --base-href=/amiapp

# Install http-server to serve the app
RUN npm install -g http-server

# Set the working directory for serving the app
WORKDIR /app/docs  # Ensure this matches the output directory of your build

# Expose the port
EXPOSE 8080

# Command to run the app
CMD ["http-server", "-p", "8080"]
