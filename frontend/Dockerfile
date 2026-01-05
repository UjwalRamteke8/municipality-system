# Use Node.js to build the React app
FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

# Expose the port (usually 3000 for React)
EXPOSE 3000

# Start the React development server
RUN npm run build
CMD ["npm", "run", "dev", "preview", "--", "--host"]
