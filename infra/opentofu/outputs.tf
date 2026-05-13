output "bucket_name" {
  description = "Private S3 origin bucket name."
  value       = aws_s3_bucket.site.bucket
}

output "cloudfront_distribution_id" {
  description = "CloudFront distribution ID."
  value       = aws_cloudfront_distribution.site.id
}

output "cloudfront_domain_name" {
  description = "CloudFront distribution hostname."
  value       = aws_cloudfront_distribution.site.domain_name
}

output "certificate_arn" {
  description = "Validated ACM certificate ARN in us-east-1."
  value       = aws_acm_certificate_validation.site.certificate_arn
}

output "route53_zone_id" {
  description = "Resolved public Route 53 zone ID."
  value       = data.aws_route53_zone.primary.zone_id
}
