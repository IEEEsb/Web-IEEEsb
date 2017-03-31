node{
    ws("/home/web/test") {
        try{
            stage ('Jenkins TEST'){
                sh 'echo "Hello, this is my first pipeline"'
                
                echo 'It was finished succesfully'
            }
        } catch(e){
            echo 'This will run only if failed'
            throw e
        } finally{
            echo 'Finished pipeline'
        }
        

    }
}