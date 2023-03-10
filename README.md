# AWS Cognito Demo

## 1 Prerequisite

### 1.1 Tools

- AWS CLI
- Terraform
- Node, npm

### 1.2 AWS Cognito

_This step is already done._

```bash
cd terraform
terraform init
terraform plan
terraform apply
```

### 1.3 Create Users

_This step is already done._

```bash
aws cognito-idp admin-create-user  --user-pool-id "us-east-2_C0GL3MgBU"  --username "testuser"
```

Set password:

```bash
aws cognito-idp admin-set-user-password --user-pool-id "us-east-2_C0GL3MgBU" --username "testuser" --password 'Password1234#' --permanent
```

---

## 2 Demo App

```bash
cd amplify-test
npm i
npm start
```

---

## 3 Read More

- https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-integrate-apps.html
- https://docs.amplify.aws/lib/auth/getting-started/q/platform/js/#option-1-use-pre-built-ui-components
