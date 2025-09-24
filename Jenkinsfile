pipeline{
    agent{
        docker{
            image 'node:18-alpine'
            args '-p 3000:3000'
        }
    }
    
    environment{
        NODE_ENV = 'test' 
        CI = 'true'
    }
    
    stages{
        stage('checkout'){
            steps{
                checkout scm
            }
        }

        stage('Install dependencies'){
            steps{
                sh 'npm ci --only=production'
            }
        }

        stage('Security Audit'){
            steps{
                sh 'npm audit --audit-level moderate'
            }
        }

        stage('Lint Code'){
            steps{
                sh 'npx eslint . --ext .js,.jsx || true'
            }
        }

        stage('Unit Tests'){
            steps{
                sh 'npm test -- --coverage'
            }
        }

        stage('Build'){
            when{
                expression {env.BRANCH_NAME == 'main'}
            }

            steps{
                sh 'npm run build'
                archiveArtifacts artifacts: 'dist/**/*', fingerprint: true
            }
        }

        stage('Docker Build'){
            when{
                expression{env.BRANCH_NAME == 'main'}
            }

            steps{
                script{
                    docker.build("nom-app:${env.BUILD_NUMBER}")
                }
            }
        }
    }
}