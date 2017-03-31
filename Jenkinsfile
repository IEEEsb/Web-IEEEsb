node{
    ws("/home/web/test") {
        try{
            stage ('Jenkins TEST'){
                sh 'echo "Hello, this is my first pipeline"'
                nodejs(nodeJSInstallationName: '7.7.4') {
                    echo $PATH
                    node --version
                    nvm --version
                    gulp --version
                }
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