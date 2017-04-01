
pipeline {
    agent any
    stages {
        stage('Example') {
            steps {
                nodejs(nodeJSInstallationName: '7.7.4') {
                    sh 'npm config ls'
                }
            }
        }
    }
}