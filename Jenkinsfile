pipeline{
    agent any
    tools{
        nodejs '7.7.4'
    }
    stages{
        stage('Jenkins TEST'){
            customWorkspace '/home/web/test'
            steps{
                echo "Hello, this is my first pipeline"                
                echo $PATH
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