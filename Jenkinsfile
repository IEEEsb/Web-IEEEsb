
pipeline {
    agent any
    stages {
        stage('Example') {
            steps {
                nodejs(nodeJSInstallationName: 'NodeJS 7.7.4',configId: '<config-file-provider-id>') {
                    sh 'npm config ls'
                }
            }
        }
    }
}