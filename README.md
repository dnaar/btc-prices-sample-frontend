# btc-prices-sample-frontend

This web page is built on vite-react. 

In order to containerize it, its built the [Dockerfile](https://github.com/dnaar/btc-prices-sample-frontend/blob/1b000550c86246d57ba186ccc74d468cac8b30e2/Dockerfile), which indicates the steps to build the containers image.

First, it is used a build image, with version `node:18-alpine` using the `/app` directory as workspace.

```docker
FROM node:18-alpine AS BUILD_IMAGE
WORKDIR /app
```

Then indicate an ARG key that is needed on build time, but not on runtime.

```docker
ARG VITE_API_URL

```

Then copy the `package.json` to container, install dependencies, copy the source code and run build script.

```docker
COPY package.json .
RUN npm install
COPY . .
RUN npm run build
```

Define a separate image

```docker
FROM node:18-alpine AS PRODUCTION_IMAGE
WORKDIR /app
```

Copy the generated build from `BUILD_IMAGE`, expose port 80, copy `package.json` and `vite.config.ts` to `PRODUCTION_IMAGE`, install typescript and serve the built files.

```docker
COPY --from=BUILD_IMAGE /app/dist /app/dist
EXPOSE 80

COPY package.json .
COPY vite.config.ts .

RUN npm install typescript

CMD ["npm", "run", "preview"]
```

## Deploying container

Once the Dockerfile is finished. The image has to be built:

```bash
docker build . -t btc_frontend
```

To upload it to an ECR registry, refer to [Pushing a Docker image](https://docs.aws.amazon.com/AmazonECR/latest/userguide/docker-push-ecr-image.html) or if [Github Actions](https://github.com/dnaar/btc-prices-sample-frontend/blob/1b000550c86246d57ba186ccc74d468cac8b30e2/.github/workflows/image-deploy.yml) is setup, just push changes to main branch.

Once the file is uploaded to ECR registry, refer to here to [start](https://github.com/dnaar/prueba-tecnica-efr#after-uploading-image-to-ecr) the container’s service.