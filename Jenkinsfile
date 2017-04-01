pipeline{
    agent any
    tools{
        nodejs 'NodeJS 7.7.4'
    }
    stages{
        stage('Jenkins TEST'){
            steps{
                echo "Hello, this is my first pipeline"                
                sh "echo Hello, this is my first pipeline"                
                sh "ls -la"                
                sh "pwd"                
                sh "node --version"                
                sh "npm --version"                
                sh "gulp --version"                
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