pipeline {
    agent any
    tools {
        nodejs "node"
    }

    stages {
        stage('Build') {
            steps {
               // Install dependencies
                sh 'npm install'
                // Build your code and create a build artifact
                sh 'node .'

                // Terminate the pipeline
                script {
                    currentBuild.result = 'SUCCESS'
                    error('Pipeline terminated after successful build and artifact creation')
                }
            }
        }
        stage('Test') {
            steps {
                // Placeholder steps for Test stage
                sh 'npm test'
            }
        }
        stage('Code Quality Analysis') {
            steps {
                // Placeholder steps for Code Quality Analysis stage
                echo 'Running code quality analysis...'
            }
        }
        stage('Deploy') {
            steps {
                // Placeholder steps for Deploy stage
                echo 'Deploying the application...'
            }
        }
        stage('Release') {
            steps {
                // Placeholder steps for Release stage
                echo 'Releasing the application...'
            }
        }
        stage('Monitoring and Alerting') {
            steps {
                // Placeholder steps for Monitoring and Alerting stage
                echo 'Setting up monitoring and alerting...'
            }
        }
    }
}
