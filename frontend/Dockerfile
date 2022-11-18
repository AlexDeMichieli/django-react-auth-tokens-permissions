FROM node:16-alpine
# creates a workdir 'app'
WORKDIR /app
# copies package.json into the current workdir application
COPY package.json .
#    source (package.json)      destination (.)
# for volumes - to track changes
ENV PATH /app/node_modules/.bin:$PATH
# installs dependencies
RUN npm install
# copies everything inside app 
COPY . .
## Production
RUN npm run build
