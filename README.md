# AWS Cognito Demo

## 1 Prerequisite

### 1.1 Tools

- AWS CLI
- Terraform
- Node, npm

### 1.2 AWS Cognito / Lambda / API Gateway

_This step is already done._

```bash
cd terraform
terraform init
terraform plan
terraform apply
```

More on the API Gateway:

Here I created a Rest API in API Gateway, with a Lambda function as the backend mock. Created Terraform resources:

Lambda:

- aws_iam_role for lambda
- aws_lambda_function

API Gateway:

- aws_api_gateway_rest_api
- aws_api_gateway_authorizer
- aws_api_gateway_resource
- aws_api_gateway_method

API Gateway integration settings (as in this example, it's configured to use a Lambda function as the backend):

- aws_api_gateway_integration
- aws_api_gateway_method_response
- aws_api_gateway_integration_response
- aws_lambda_permission

API Gateway deployment/stage:

- aws_api_gateway_deployment
- aws_api_gateway_stage

In short, the created API has only one path with one action (GET), and it uses the Congnito user pool for authentication. A logged in user has an id_token, and we can set the id_token in the Authorization header to access the backend.

### 1.3 Create Users

_This step is already done._

Create user with a verified email address (user doesn't have to verify again):

```bash
aws cognito-idp admin-create-user \
              --user-pool-id us-east-2_C0GL3MgBU \
              --username testuser \
              --user-attributes Name=email,Value=tiexin.guo@merico.dev Name=email_verified,Value="true"
```

Only with verified email can a user reset his password.

Set password:

```bash
aws cognito-idp admin-set-user-password --user-pool-id "us-east-2_C0GL3MgBU" --username "testuser" --password 'Password1234#' --permanent
```

---

## 2 Demo App

Start the frontend app:

```bash
cd amplify-test
npm i
npm start
```

Then you can login with the user created in step [1.3](#13-create-users)

_Check out the console log to get the id_token of the user, which will be used to demo the backend API authentication._

---

## 3 Backend

After successfully logging in to the frontend app, the id_token will be printed in the console log. Get the id_token, and access the backend:

curl --header "Authorization: ID_TOKEN_HERE" https://ufa5pqf424.execute-api.us-east-2.amazonaws.com/dev/test

_Note that this is only a demo to show how backend API authorization works. In reality, we will use `Auth.currentSession()` to get the id_token, set it in the header, then access backend API programmatically._

---

## 4 TODO

- Terraform module for API Gateway to support multiple APIs
- Use a Deployment in EKS with Ingress instead of a Lambda function as the backend of the API Gateway.

---

## 5 Read More

- https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-integrate-apps.html
- https://docs.amplify.aws/lib/auth/getting-started/q/platform/js/#option-1-use-pre-built-ui-components
