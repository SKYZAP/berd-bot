FROM node:12-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . ./

RUN npm run build && npm prune --production


FROM node:18-slim

WORKDIR /app
# Change to production for deployment
ENV NODE_ENV=testing

COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/.env ./.env
EXPOSE 3000
ENTRYPOINT [ "node" ]
CMD [ "dist/main.js" ]