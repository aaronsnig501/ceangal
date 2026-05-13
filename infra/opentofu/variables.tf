variable "aws_region" {
  description = "Primary AWS region for Route 53 and the S3 origin bucket."
  type        = string
  default     = "eu-west-1"
}

variable "domain_name" {
  description = "Primary custom domain for the web app, for example ceangal.app."
  type        = string
}

variable "subject_alternative_names" {
  description = "Optional additional hostnames to include on the ACM certificate."
  type        = list(string)
  default     = []
}

variable "route53_zone_name" {
  description = "Route 53 hosted zone name. Defaults to domain_name when empty."
  type        = string
  default     = ""
}

variable "s3_bucket_name" {
  description = "Name for the private S3 origin bucket. Defaults to domain_name when empty."
  type        = string
  default     = ""
}

variable "price_class" {
  description = "CloudFront price class."
  type        = string
  default     = "PriceClass_100"
}

variable "default_root_object" {
  description = "CloudFront default root object."
  type        = string
  default     = "index.html"
}

variable "spa_error_document" {
  description = "Document returned for SPA 404 fallbacks."
  type        = string
  default     = "/index.html"
}

variable "tags" {
  description = "Tags to apply to created resources."
  type        = map(string)
  default     = {}
}
