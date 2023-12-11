# Container Deploy to ECR

This file describes de steps taken in order to upload container image. Due to time limitations could integrate full deploy, meaning once finished the corresponding pipeline, only the image will be updated in ECR. **Reloading corresponding ECS service has to be done manually.**

There are four steps:

- [Check out code](https://github.com/dnaar/btc-prices-sample-frontend/blob/57ed491e08ac4c9cef2e6e0f38a7a78870bb5e26/.github/workflows/image-deploy.yml#L17C13-L17C13): Checks out repository in the workspace, so the workflow can access it.
- [Configure AWS credentials](https://github.com/dnaar/btc-prices-sample-frontend/blob/57ed491e08ac4c9cef2e6e0f38a7a78870bb5e26/.github/workflows/image-deploy.yml#L20): Configures credentials for authentication.
- [Login to Amazon ECR](https://github.com/dnaar/btc-prices-sample-frontend/blob/57ed491e08ac4c9cef2e6e0f38a7a78870bb5e26/.github/workflows/image-deploy.yml#L27): Logs in to one or more ECR registries.
- [Build, tag, and push image to Amazon ECR](https://github.com/dnaar/btc-prices-sample-frontend/blob/57ed491e08ac4c9cef2e6e0f38a7a78870bb5e26/.github/workflows/image-deploy.yml#L31): Builds the docker image, then tags that image to the ECR registry, then pushes the image.

## Requirements:

Set up the following repository actions secrets by going to:

> Repository Settings > Secrets and variables > Actions
> 

![Untitled](Container%20Deploy%20to%20ECR/Untitled.png)

Keeping in mind that the API_URL is the endpoint determined in the API Gateway that triggers the request for stored data.