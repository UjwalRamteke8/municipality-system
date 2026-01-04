# Backend container configuration
# Use Node.js as the base image
FROM node:18-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the backend code
COPY . .

# Expose the port your backend runs on (e.g., 5000)
EXPOSE 5000

# Start the server
CMD ["npm", "start"]