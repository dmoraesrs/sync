#!/bin/bash
cd "$BUILD_REPOSITORY_NAME"
echo "show directory"
echo "$BUILD_REPOSITORY_NAME"
echo "Show files"
ls -la
echo "List drop folder"
ls -la drop/
TF_ACTION=$1
echo "Show TF_ACTION: $TF_ACTION"
if [ "$TF_ACTION" == "apply" ]; then
    echo "Initializing Terraform..."
    export GOOGLE_APPLICATION_CREDENTIALS=$GOOGLE_APPLICATION_CREDENTIALS
    git config --global credential.helper '!f() { sleep 1; echo "username=${GITUSERNAME:-pat}"; echo "password=$GITPASSWORD"; }; f'
    export GIT_TRACE=true
    export GIT_CURL_VERBOSE=true
    export GIT_TERMINAL_PROMPT=1
    terraform init
    echo "Terraform Apply..."
    terraform apply -auto-approve drop/plano.tfplan
elif [ "$TF_ACTION" == "destroy" ]; then
    echo "Initializing Terraform..."
    export GOOGLE_APPLICATION_CREDENTIALS=$GOOGLE_APPLICATION_CREDENTIALS
    git config --global credential.helper '!f() { sleep 1; echo "username=${GITUSERNAME:-pat}"; echo "password=$GITPASSWORD"; }; f'
    export GIT_TRACE=true
    export GIT_CURL_VERBOSE=true
    export GIT_TERMINAL_PROMPT=1
    terraform init
    echo "Terraform Destroy..."
    terraform apply -auto-approve drop/plano.tfplan
else
    echo "No valid action provided"
fi    
