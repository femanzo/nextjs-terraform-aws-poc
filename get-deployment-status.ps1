# Script to check deployment status and provide useful information

param(
    [string]$AWS_PROFILE = "personal",
    [string]$AWS_REGION = "sa-east-1"
)

# Colors for output
$RED = "Red"
$GREEN = "Green"
$YELLOW = "Yellow"

Write-Host "Deployment Status Check" -ForegroundColor $GREEN
Write-Host "=====================" -ForegroundColor $GREEN

# Check Terraform state
Write-Host "`nChecking Terraform state..." -ForegroundColor $YELLOW
$terraformOutput = terraform output -json 2>$null

if ($terraformOutput) {
    $outputs = $terraformOutput | ConvertFrom-Json
    
    Write-Host "Terraform Outputs:" -ForegroundColor $GREEN
    foreach ($key in $outputs.PSObject.Properties.Name) {
        $value = $outputs.$key.value
        if ($value -and $value -ne "tostring(null)") {
            Write-Host "  $key`: $value" -ForegroundColor $GREEN
        } else {
            Write-Host "  $key`: Not available" -ForegroundColor $YELLOW
        }
    }
} else {
    Write-Host "No Terraform outputs available" -ForegroundColor $RED
}

# Check ECR repository
Write-Host "`nChecking ECR repository..." -ForegroundColor $YELLOW
try {
    $ecrInfo = aws ecr describe-repositories --repository-names mid-nextjs-poc --profile $AWS_PROFILE --region $AWS_REGION 2>$null
    if ($ecrInfo) {
        $repoUrl = ($ecrInfo | ConvertFrom-Json).repositories[0].repositoryUri
        Write-Host "ECR Repository URL: $repoUrl" -ForegroundColor $GREEN
    } else {
        Write-Host "ECR repository not found" -ForegroundColor $RED
    }
} catch {
    Write-Host "Error checking ECR repository" -ForegroundColor $RED
}

# Check ECS cluster and service
Write-Host "`nChecking ECS resources..." -ForegroundColor $YELLOW
try {
    $clusterInfo = aws ecs describe-clusters --clusters mid-nextjs-poc-54yeg2 --profile $AWS_PROFILE --region $AWS_REGION 2>$null
    if ($clusterInfo) {
        $cluster = ($clusterInfo | ConvertFrom-Json).clusters[0]
        Write-Host "ECS Cluster: $($cluster.clusterName) (Status: $($cluster.status))" -ForegroundColor $GREEN
    }
} catch {
    Write-Host "Error checking ECS cluster" -ForegroundColor $RED
}

try {
    $serviceInfo = aws ecs describe-services --cluster mid-nextjs-poc-54yeg2 --services mid-nextjs-poc-service --profile $AWS_PROFILE --region $AWS_REGION 2>$null
    if ($serviceInfo) {
        $service = ($serviceInfo | ConvertFrom-Json).services[0]
        Write-Host "ECS Service: $($service.serviceName) (Status: $($service.status))" -ForegroundColor $GREEN
        Write-Host "  Desired Count: $($service.desiredCount)" -ForegroundColor $GREEN
        Write-Host "  Running Count: $($service.runningCount)" -ForegroundColor $GREEN
    }
} catch {
    Write-Host "Error checking ECS service" -ForegroundColor $RED
}

# Check CloudFormation stack
Write-Host "`nChecking CloudFormation stack..." -ForegroundColor $YELLOW
try {
    $stackInfo = aws cloudformation describe-stacks --stack-name mid-nextjs-poc-stack --profile $AWS_PROFILE --region $AWS_REGION 2>$null
    if ($stackInfo) {
        $stack = ($stackInfo | ConvertFrom-Json).stacks[0]
        Write-Host "CloudFormation Stack: $($stack.stackName) (Status: $($stack.stackStatus))" -ForegroundColor $GREEN
    } else {
        Write-Host "CloudFormation stack not found" -ForegroundColor $YELLOW
    }
} catch {
    Write-Host "CloudFormation stack not found" -ForegroundColor $YELLOW
}

# Summary and next steps
Write-Host "`nSummary and Next Steps:" -ForegroundColor $GREEN
Write-Host "=====================" -ForegroundColor $GREEN

if ($terraformOutput) {
    $outputs = $terraformOutput | ConvertFrom-Json
    $loadBalancerDns = $outputs.load_balancer_dns.value
    
    if ($loadBalancerDns -and $loadBalancerDns -ne "tostring(null)") {
        Write-Host "✅ Your application is available at: http://$loadBalancerDns" -ForegroundColor $GREEN
    } else {
        Write-Host "⚠️  Load balancer DNS not available yet" -ForegroundColor $YELLOW
        Write-Host "   This may be due to permission issues with Elastic Load Balancing" -ForegroundColor $YELLOW
        Write-Host "   Please check your AWS IAM permissions" -ForegroundColor $YELLOW
    }
} else {
    Write-Host "❌ Terraform deployment not completed" -ForegroundColor $RED
    Write-Host "   Please run: terraform apply" -ForegroundColor $YELLOW
}

Write-Host "`nFor troubleshooting:" -ForegroundColor $YELLOW
Write-Host "1. Check AWS IAM permissions for elasticloadbalancing:*" -ForegroundColor $YELLOW
Write-Host "2. Run: terraform plan to see what resources need to be created" -ForegroundColor $YELLOW
Write-Host "3. Run: terraform apply to create missing resources" -ForegroundColor $YELLOW 