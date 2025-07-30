# Configuration
$AWS_REGION = "sa-east-1"
$AWS_PROFILE = "personal"
$APP_NAME = "mid-nextjs-poc"
$ECR_REPOSITORY_NAME = "mid-nextjs-poc"
$ECS_CLUSTER_NAME = "mid-nextjs-poc-54yeg2"
$DOMAIN_NAME = ""

# Set AWS profile for Terraform
$env:AWS_PROFILE = $AWS_PROFILE

# Colors for output
$RED = "Red"
$GREEN = "Green"
$YELLOW = "Yellow"

Write-Host "Importing existing AWS resources into Terraform state..." -ForegroundColor $GREEN

# Get AWS Account ID
$AWS_ACCOUNT_ID = (aws sts get-caller-identity --profile $AWS_PROFILE --query Account --output text)
Write-Host "Using AWS Account ID: $AWS_ACCOUNT_ID" -ForegroundColor $GREEN

# Initialize Terraform
Write-Host "Initializing Terraform..." -ForegroundColor $YELLOW
terraform init

# Import existing ECR Repository
Write-Host "Importing ECR Repository..." -ForegroundColor $YELLOW
terraform import aws_ecr_repository.app $ECR_REPOSITORY_NAME

# Import existing CloudWatch Log Group
Write-Host "Importing CloudWatch Log Group..." -ForegroundColor $YELLOW
terraform import aws_cloudwatch_log_group.app "/ecs/$APP_NAME"

# Import existing IAM Roles
Write-Host "Importing IAM Roles..." -ForegroundColor $YELLOW
terraform import aws_iam_role.ecs_task_execution_role "$APP_NAME-ecs-task-execution-role"
terraform import aws_iam_role.ecs_task_role "$APP_NAME-ecs-task-role"

# Import existing Load Balancer
Write-Host "Importing Application Load Balancer..." -ForegroundColor $YELLOW
$ALB_ARN = (aws elbv2 describe-load-balancers --profile $AWS_PROFILE --region $AWS_REGION --query "LoadBalancers[?contains(LoadBalancerName, '$APP_NAME')].LoadBalancerArn" --output text)
if ($ALB_ARN) {
    terraform import aws_lb.app $ALB_ARN
}

# Import existing Target Group
Write-Host "Importing Target Group..." -ForegroundColor $YELLOW
$TG_ARN = (aws elbv2 describe-target-groups --profile $AWS_PROFILE --region $AWS_REGION --query "TargetGroups[?contains(TargetGroupName, '$APP_NAME')].TargetGroupArn" --output text)
if ($TG_ARN) {
    terraform import aws_lb_target_group.app $TG_ARN
}

# Import existing Security Groups
Write-Host "Importing Security Groups..." -ForegroundColor $YELLOW
$ALB_SG_ID = (aws ec2 describe-security-groups --profile $AWS_PROFILE --region $AWS_REGION --filters "Name=group-name,Values=*$APP_NAME*alb*" --query "SecurityGroups[0].GroupId" --output text)
if ($ALB_SG_ID -and $ALB_SG_ID -ne "None") {
    terraform import aws_security_group.alb $ALB_SG_ID
}

$ECS_SG_ID = (aws ec2 describe-security-groups --profile $AWS_PROFILE --region $AWS_REGION --filters "Name=group-name,Values=*$APP_NAME*ecs*" --query "SecurityGroups[0].GroupId" --output text)
if ($ECS_SG_ID -and $ECS_SG_ID -ne "None") {
    terraform import aws_security_group.ecs $ECS_SG_ID
}

# Import existing ECS Task Definition
Write-Host "Importing ECS Task Definition..." -ForegroundColor $YELLOW
terraform import aws_ecs_task_definition.app $APP_NAME

# Import existing ECS Service
Write-Host "Importing ECS Service..." -ForegroundColor $YELLOW
terraform import aws_ecs_service.app "$ECS_CLUSTER_NAME/$APP_NAME-service"

Write-Host "Import completed successfully!" -ForegroundColor $GREEN
Write-Host "You can now run 'terraform plan' to see what changes are needed." -ForegroundColor $YELLOW 