# Configuration
$AWS_REGION = "sa-east-1"
$AWS_PROFILE = "personal"
$APP_NAME = "mid-nextjs-poc"
$ECR_REPOSITORY_NAME = "mid-nextjs-poc"
$ECS_CLUSTER_NAME = "mid-nextjs-poc-54yeg2"
$DOMAIN_NAME = "next.ez.run"  # Set this to your domain name (e.g., "app.example.com") to enable HTTPS

# Set AWS profile for Terraform
$env:AWS_PROFILE = $AWS_PROFILE

# Colors for output
$RED = "Red"
$GREEN = "Green"
$YELLOW = "Yellow"

Write-Host "Starting Terraform deployment process using AWS profile: $AWS_PROFILE" -ForegroundColor $GREEN

# Check if Terraform is installed
if (-not (Get-Command terraform -ErrorAction SilentlyContinue)) {
    Write-Host "Terraform is not installed. Please install it first." -ForegroundColor $RED
    exit 1
}

# Check if AWS CLI is installed
if (-not (Get-Command aws -ErrorAction SilentlyContinue)) {
    Write-Host "AWS CLI is not installed. Please install it first." -ForegroundColor $RED
    exit 1
}

# Check if Docker is installed
if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
    Write-Host "Docker is not installed. Please install it first." -ForegroundColor $RED
    exit 1
}

# Get AWS Account ID
$AWS_ACCOUNT_ID = (aws sts get-caller-identity --profile $AWS_PROFILE --query Account --output text)
Write-Host "Using AWS Account ID: $AWS_ACCOUNT_ID" -ForegroundColor $GREEN

# Initialize Terraform
Write-Host "Initializing Terraform..." -ForegroundColor $YELLOW
terraform init

# Build and push Docker image
Write-Host "Building Docker image..." -ForegroundColor $YELLOW
docker build -t $ECR_REPOSITORY_NAME .

# Get ECR login token
Write-Host "Logging in to ECR..." -ForegroundColor $YELLOW
aws ecr get-login-password --profile $AWS_PROFILE --region $AWS_REGION | docker login --username AWS --password-stdin "$AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com"

# Tag the image
Write-Host "Tagging Docker image..." -ForegroundColor $YELLOW
docker tag "$ECR_REPOSITORY_NAME`:latest" "$AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPOSITORY_NAME`:latest"

# Push the image to ECR
Write-Host "Pushing Docker image to ECR..." -ForegroundColor $YELLOW
docker push "$AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPOSITORY_NAME`:latest"

# Plan Terraform deployment
Write-Host "Planning Terraform deployment..." -ForegroundColor $YELLOW
$terraform_vars = @(
    "-var=aws_region=$AWS_REGION",
    "-var=app_name=$APP_NAME",
    "-var=ecr_repository_name=$ECR_REPOSITORY_NAME",
    "-var=ecs_cluster_name=$ECS_CLUSTER_NAME"
)

if ($DOMAIN_NAME -ne "") {
    $terraform_vars += "-var=domain_name=$DOMAIN_NAME"
    Write-Host "HTTPS will be enabled for domain: $DOMAIN_NAME" -ForegroundColor $GREEN
} else {
    Write-Host "HTTPS is disabled. Set DOMAIN_NAME to enable HTTPS." -ForegroundColor $YELLOW
}

# Try to plan first to see what needs to be done
$plan_result = terraform plan $terraform_vars 2>&1

if ($LASTEXITCODE -ne 0) {
    Write-Host "Terraform plan failed. This might be due to existing resources." -ForegroundColor $YELLOW
    Write-Host "Attempting to import existing resources..." -ForegroundColor $YELLOW
    
    # Try to import key resources that might already exist
    try {
        Write-Host "Importing ECR Repository..." -ForegroundColor $YELLOW
        terraform import aws_ecr_repository.app $ECR_REPOSITORY_NAME 2>$null
        
        Write-Host "Importing CloudWatch Log Group..." -ForegroundColor $YELLOW
        terraform import aws_cloudwatch_log_group.app "/ecs/$APP_NAME" 2>$null
        
        Write-Host "Importing IAM Roles..." -ForegroundColor $YELLOW
        terraform import aws_iam_role.ecs_task_execution_role "$APP_NAME-ecs-task-execution-role" 2>$null
        terraform import aws_iam_role.ecs_task_role "$APP_NAME-ecs-task-role" 2>$null
        
        Write-Host "Importing ECS Task Definition..." -ForegroundColor $YELLOW
        terraform import aws_ecs_task_definition.app $APP_NAME 2>$null
        
        Write-Host "Importing ECS Service..." -ForegroundColor $YELLOW
        terraform import aws_ecs_service.app "$ECS_CLUSTER_NAME/$APP_NAME-service" 2>$null
        
        Write-Host "Resources imported. Trying plan again..." -ForegroundColor $GREEN
        terraform plan $terraform_vars
    }
    catch {
        Write-Host "Import failed. You may need to run the import script manually." -ForegroundColor $RED
        Write-Host "Run: .\import-existing-resources.ps1" -ForegroundColor $YELLOW
        exit 1
    }
}

# Confirm deployment
$confirmation = Read-Host "Do you want to proceed with the deployment? (y/N)"
if ($confirmation -ne "y" -and $confirmation -ne "Y") {
    Write-Host "Deployment cancelled." -ForegroundColor $YELLOW
    exit 0
}

# Apply Terraform configuration
Write-Host "Applying Terraform configuration..." -ForegroundColor $YELLOW
terraform apply -auto-approve $terraform_vars

# Get the load balancer DNS name
Write-Host "Getting load balancer DNS name..." -ForegroundColor $YELLOW
try {
    $LOAD_BALANCER_DNS = (terraform output -raw load_balancer_dns)
    Write-Host "Deployment completed successfully!" -ForegroundColor $GREEN

    if ($DOMAIN_NAME -ne "") {
        Write-Host "Your application is available at: https://$DOMAIN_NAME" -ForegroundColor $GREEN
        Write-Host "Note: You may need to create DNS records to point $DOMAIN_NAME to the load balancer." -ForegroundColor $YELLOW
        Write-Host "Check the certificate validation records in the Terraform output." -ForegroundColor $YELLOW
    } else {
        Write-Host "Your application is available at: http://$LOAD_BALANCER_DNS" -ForegroundColor $GREEN
    }
}
catch {
    Write-Host "Could not get load balancer DNS. You can check the AWS Console for the ALB DNS name." -ForegroundColor $YELLOW
    Write-Host "Deployment may have completed with some resources already existing." -ForegroundColor $GREEN
}

Write-Host "Note: It may take a few minutes for the ECS service to be fully healthy." -ForegroundColor $YELLOW 