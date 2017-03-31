pipeline{
    agent any
    ws("/home/web/test")
    stages{
        stage('Jenkins TEST'){
            steps{
                sh'echo "Hello, this is my first pipeline"'
                sh 'echo $PATH'
                sh 'node --version'
                sh 'nvm --version'
                sh 'gulp --version'
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
