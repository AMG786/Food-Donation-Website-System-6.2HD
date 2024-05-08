pipeline {
 agent any
 tools {nodejs "node"}
    
    stages {
        stage('Build') {
            steps {
                // Install dependencies
                sh 'npm install'
            }
        }
        
        stage('Package') {
            steps {
                // Run tests if needed
                // sh 'npm test'

                // Package application using pkg
                sh 'npm install -g pkg'
                sh 'pkg .'
            }
            
            post {
                success {
                    // Archive the packaged executable
                    archiveArtifacts artifacts: '*.exe', fingerprint: true
                }
            }
        }
    }
    
    // Add post-build actions if needed
    post {
        always {
            // Clean up
            cleanWs()
        }
    }
}
