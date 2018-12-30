FROM node:slim
WORKDIR /usr/src/app
COPY . .
RUN npm install
CMD ["npm", "start"]