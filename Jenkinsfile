pipeline{
    agent {
        node{
            label 'main'
            customWorkspace '/home/web/test'
        }
    }
    tools{
        nodejs 'NodeJS 7.7.4'
    }
    stages{
        stage('Jenkins TEST'){
            steps{
                echo "Hello, this is my first pipeline"                
                echo "Hello, this is my first pipeline"                
                echo "Hello, this is my first pipeline"                
                echo "Hello, this is my first pipeline"                
                
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