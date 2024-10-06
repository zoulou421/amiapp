# Use the official Node.js image as the base image for building the application
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
RUN npm run build --configuration production --output-path docs --base-href /amiapp/

# Install http-server to serve the app
RUN npm install -g http-server

# Use a clean, lightweight image for the final container
FROM node:20-alpine AS serve

# Set the working directory to the app folder
WORKDIR /app

# Copy the built app from the build stage
COPY --from=build /app/docs/browser/. /app/docs/

# Expose the port
EXPOSE 8080

# Command to run the app
CMD ["http-server", "docs", "-p", "8080"]
