# Use a specific Node.js version
FROM node:18.18.0

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and pnpm-lock.yaml
COPY package.json ./
COPY pnpm-lock.yaml ./

# Install pnpm
RUN npm install -g pnpm

# Copy the rest of the code
COPY . .

# Remove existing node_modules and Install dependencies
RUN rm -rf node_modules
RUN pnpm install

# Optionally install TypeScript
RUN pnpm install typescript

# Update caniuse-lite
RUN npx update-browserslist-db@latest

# Build the Nuxt module
RUN npm run prepack

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["npx", "nuxi", "dev"]
