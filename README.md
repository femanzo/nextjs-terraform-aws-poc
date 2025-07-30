# Mid NextJS POC

A Next.js application deployed on AWS ECS using Terraform.

## Prerequisites

Before deploying this application, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [Docker](https://www.docker.com/)
- [AWS CLI](https://aws.amazon.com/cli/)
- [Terraform](https://www.terraform.io/) (v1.0 or higher)
- AWS credentials configured (either via AWS CLI or environment variables)

## Architecture

This application is deployed using the following AWS services:

- **ECS Fargate**: Container orchestration service
- **ECR**: Container registry for Docker images
- **Application Load Balancer**: Load balancer for the application
- **CloudWatch**: Logging and monitoring
- **IAM**: Security roles and policies

## Deployment

### Quick Start

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd mid-nextjs-poc
   ```

2. **Install dependencies**:

   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Deploy using Terraform**:

   **For Windows (PowerShell)**:

   ```powershell
   .\deploy.ps1
   ```

   **For Linux/macOS**:

   ```bash
   chmod +x deploy.sh
   ./deploy.sh
   ```

### Manual Deployment

If you prefer to deploy manually:

1. **Initialize Terraform**:

   ```bash
   terraform init
   ```

2. **Build and push Docker image**:

   ```bash
   docker build -t mid-nextjs-poc .
   aws ecr get-login-password --region sa-east-1 | docker login --username AWS --password-stdin <account-id>.dkr.ecr.sa-east-1.amazonaws.com
   docker tag mid-nextjs-poc:latest <account-id>.dkr.ecr.sa-east-1.amazonaws.com/mid-nextjs-poc:latest
   docker push <account-id>.dkr.ecr.sa-east-1.amazonaws.com/mid-nextjs-poc:latest
   ```

3. **Plan the deployment**:

   ```bash
   terraform plan
   ```

4. **Apply the configuration**:
   ```bash
   terraform apply
   ```

## Configuration

You can customize the deployment by creating a `terraform.tfvars` file based on the example:

```bash
cp terraform.tfvars.example terraform.tfvars
```

Then edit the variables as needed:

- `aws_region`: AWS region for deployment
- `app_name`: Application name
- `ecr_repository_name`: ECR repository name
- `ecs_cluster_name`: Existing ECS cluster name
- `container_port`: Container port (default: 3000)
- `task_cpu`: CPU units for ECS task
- `task_memory`: Memory for ECS task
- `service_desired_count`: Number of desired tasks

## Infrastructure

The Terraform configuration creates the following resources:

- ECR repository with lifecycle policy
- CloudWatch log group
- IAM roles for ECS task execution and task
- Security groups for ALB and ECS
- Application Load Balancer with target group
- ECS task definition and service

## Development

### Local Development

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Run the development server**:

   ```bash
   npm run dev
   ```

3. **Open [http://localhost:3000](http://localhost:3000)** in your browser.

### Building for Production

```bash
npm run build
```

## API Endpoints

- `GET /api/health` - Health check endpoint
- `GET /` - Home page
- `GET /blog` - Blog listing
- `GET /docs` - Documentation
- `GET /products` - Products listing
- `GET /users` - Users listing

## Monitoring

- **CloudWatch Logs**: Application logs are available in the `/ecs/mid-nextjs-poc` log group
- **ECS Service**: Monitor service health and task status in the AWS Console
- **Load Balancer**: Check target group health and traffic distribution

## Cleanup

To destroy all resources created by Terraform:

```bash
terraform destroy
```

**Warning**: This will permanently delete all resources including the ECR repository and its images.

## Troubleshooting

### Common Issues

1. **Terraform not found**: Install Terraform from [terraform.io](https://www.terraform.io/)
2. **AWS credentials not configured**: Run `aws configure` to set up credentials
3. **Docker build fails**: Ensure Docker is running and you have sufficient disk space
4. **ECS service not healthy**: Check CloudWatch logs and target group health checks

### Useful Commands

- **View Terraform state**: `terraform show`
- **View outputs**: `terraform output`
- **Check ECS service status**: `aws ecs describe-services --cluster <cluster-name> --services <service-name>`
- **View CloudWatch logs**: `aws logs tail /ecs/mid-nextjs-poc --follow`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test the deployment
5. Submit a pull request

## License

This project is licensed under the MIT License.
