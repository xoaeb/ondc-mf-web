# Use Node.js for building and running the app
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application
COPY . .

# Build the Vite React app
RUN npm run build

# Expose application port
EXPOSE 5173

# Start the application
CMD ["npm", "run", "dev"]


# docker build -t chandansutradhar/ondc_mutualfunds_web:0.0.1 .

# docker run -d -p 5173:5173 --name ondc_mutualfunds_web chandansutradhar/ondc_mutualfunds_web:0.0.1