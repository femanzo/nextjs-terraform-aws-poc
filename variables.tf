variable "aws_region" {
  description = "AWS region where resources will be created"
  type        = string
  default     = "sa-east-1"
}

variable "domain_name" {
  description = "Domain name for the SSL certificate (e.g., example.com or *.example.com)"
  type        = string
  default     = ""
}

variable "app_name" {
  description = "Name of the application"
  type        = string
  default     = "mid-nextjs-poc"
}

variable "ecr_repository_name" {
  description = "Name of the ECR repository"
  type        = string
  default     = "mid-nextjs-poc"
}

variable "ecs_cluster_name" {
  description = "Name of the existing ECS cluster"
  type        = string
  default     = "mid-nextjs-poc-54yeg2"
}

variable "container_port" {
  description = "Port that the container exposes"
  type        = number
  default     = 3000
}

variable "task_cpu" {
  description = "CPU units for the ECS task (1024 = 1 vCPU)"
  type        = string
  default     = "256"
}

variable "task_memory" {
  description = "Memory for the ECS task in MiB"
  type        = string
  default     = "512"
}

variable "service_desired_count" {
  description = "Desired number of tasks running in the ECS service"
  type        = number
  default     = 2
}

variable "environment" {
  description = "Environment name (e.g., dev, staging, prod)"
  type        = string
  default     = "production"
}

variable "tags" {
  description = "Tags to apply to all resources"
  type        = map(string)
  default = {
    Environment = "production"
    Project     = "mid-nextjs-poc"
    ManagedBy   = "terraform"
  }
} 