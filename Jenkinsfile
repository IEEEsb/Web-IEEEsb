pipeline{
    agent any
    stages{
        stage('Jenkins TEST'){
            steps{
                sh 'echo "Hello, this is my first pipeline"'
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
