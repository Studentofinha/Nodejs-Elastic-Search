# Use an official Node.js runtime as a parent image
FROM node

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application source code to the working directory
COPY . .

# Expose a port that the app will listen on
EXPOSE 3000

# Define the command to run your application
CMD [ "node", "app.js" ]
