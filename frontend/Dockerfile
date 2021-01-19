# build environment
FROM node:13.12.0-alpine as build
WORKDIR /app
COPY . /app
RUN npm install react-scripts@3.4.1 -g --silent
RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf


COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"
]
