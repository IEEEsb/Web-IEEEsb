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
           echo 'Finished pipeline'
        }
        success {
            echo 'It was finished succesfully'
        }
        failure {
            echo 'It was a failure'
        }
    }
}
