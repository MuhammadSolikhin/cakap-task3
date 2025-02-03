FROM node:18 AS build

WORKDIR /build-app

COPY package*.json ./

RUN npm install

COPY . .

FROM node:18-alpine AS runtime

WORKDIR /runtime-app

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

COPY --from=build /build-app /runtime-app

RUN chown -R appuser:appgroup /runtime-app

USER appuser

EXPOSE 3000

CMD ["npm", "start"]
