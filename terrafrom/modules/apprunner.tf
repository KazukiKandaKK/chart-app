# TODO: 必要に応じて構造化する。
resource "aws_apprunner_service" "chart-js-app" {
  service_name = "chart-js-app"

  source_configuration {
    authentication_configuration {
      connection_arn = aws_apprunner_connection.chart-js-app.arn
    }
    code_repository {
      code_configuration {
        code_configuration_values {
          build_command = "npm ci && npm run build"
          port          = "3000"
          runtime       = "NODEJS_16"
          start_command = "npm run start"
        }
        configuration_source = "API"
      }
      repository_url = "https://github.com/KazukiKandaKK/chart-app.git"
      source_code_version {
        type  = "BRANCH"
        value = "main"
      }
    }
  }

  network_configuration {
    egress_configuration {
      egress_type       = "VPC"
      vpc_connector_arn = aws_apprunner_vpc_connector.connector.arn
    }
  }

  tags = {
    Name = "chart-js-app-apprunner-service"
  }
}