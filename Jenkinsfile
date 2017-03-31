pipeline{
    agent any
    stages{
        stage('Jenkins TEST'){
            steps{
                sh'echo "Hello, this is my first pipeline"'
                nodejs(nodeJSInstallationName: '7.7.4') {
                    echo $PATH
                    node --version
                    nvm --version
                    gulp --version
                }
            }
        }
        
    }
    post {
        always {
            sh 'echo "Finished pipeline"'
        }
    }
}
