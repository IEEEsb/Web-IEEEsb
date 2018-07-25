pipeline {
  agent {
    node {
      label 'Web'
    }

  }
  stages {
    stage('Stop') {
      steps {
        sh 'sudo service web stop'
      }
    }
    stage('Install dependencies') {
      steps {
        sh 'npm install'
      }
    }
    stage('Start') {
      steps {
        sh 'sudo service web start'
      }
    }
  }
}