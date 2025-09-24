pipeline {
    agent {
        docker {
            image 'node:18-alpine'
            args '-p 3000:3000'
        }
    }

    environment {
        NODE_ENV = 'test'
        CI = 'true'
        NPM_CONFIG_CACHE = "${WORKSPACE}/.npm"
    }

    stages {
        stage('Checkout') {
            steps { checkout scm }
        }

        stage('Install dependencies') {
            steps {
                sh '''
                    mkdir -p "$WORKSPACE/.npm"
                    npm ci
                '''
            }
        }

        stage('Security Audit') {
            steps { sh 'npm audit --audit-level moderate || true' }
        }

        stage('Lint Code') {
            steps { sh 'npx eslint . --ext .js,.jsx' }
        }

        stage('Unit Tests') {
            steps { sh 'npm test -- --coverage' }
        }

        stage('Build') {
            when { expression { env.BRANCH_NAME == 'main' } }
            steps {
                sh 'npm run build'
                archiveArtifacts artifacts: 'dist/**/*', fingerprint: true
            }
        }

        stage('Docker Build') {
            when { expression { env.BRANCH_NAME == 'main' } }
            steps {
                script { docker.build("nom-app:${env.BUILD_NUMBER}", ".") }
            }
        }
    }
}
