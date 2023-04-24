# Deployment jobs

## `deploy-api`

Triggers a separate workflow using `workflow_dispatch` that deploys the staging
environment of the API service to AWS ECS. That workflow is given two inputs.

- the tag of the image that was published by the
  [`publish-images`](#publish-images) job, which is the output of the
  [`get-image-tag`](#get-image-tag) job
- the actor of the CI + CD workflow, for tagging them in Slack messages

This deployment is only triggered if all the following conditions are met.

- the API codebase has changed
- the [`publish-images`](#publish-images) job has passed, publishing the latest
  frontend image to GHCR
  - The fact that [`publish-images`](#publish-images) ran implies
    [`test-api`](#test-api) passed.

## `deploy-frontend`

Triggers a separate workflow using `workflow_dispatch` that deploys the staging
environment of the frontend service to AWS ECS. That workflow is given two
inputs.

- the tag of the image that was published by the
  [`publish-images`](#publish-images) job, which is the output of the
  [`get-image-tag`](#get-image-tag) job
- the actor of the CI + CD workflow, for tagging them in Slack messages

This deployment is only triggered if all the following conditions are met.

- the frontend codebase has changed
- the [`playwright`](#playwright) job has passed, implying no visual regressions
  have occurred
- the [`publish-images`](#publish-images) job has passed, publishing the latest
  frontend image to GHCR
  - The fact that [`publish-images`](#publish-images) ran implies
    [`nuxt-build`](#nuxt-build) passed.