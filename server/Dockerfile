FROM node





COPY config config
COPY controllers controllers
COPY middlewares middlewares
COPY models models
COPY routes routes
COPY utils utils
COPY index.js index.js
COPY .env .env
COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install
RUN npm install mongoose
ENTRYPOINT ["node","index"]
