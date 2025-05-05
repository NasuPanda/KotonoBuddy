# .devcontainer/Dockerfile
FROM node:18-alpine

# Install any extras you need (git, openssh, etc.)
RUN apk add --no-cache git openssh-client bash

WORKDIR /workspace
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Default command is handled by devcontainer.json
