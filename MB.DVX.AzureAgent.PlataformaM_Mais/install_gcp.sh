version="$1"


if [ -f "$version" ]
then
	>&2 echo "O parametro version eh necessario" 
	exit 1
fi

git clone https://github.com/nginxinc/kubernetes-ingress.git --branch $version


# Exports Subnets
#export REGION_1=`aws ec2 describe-subnets --filters "Name=tag:RESOURCE,Values=eks" --query "Subnets[0].SubnetId" --region=$region --output text`
#export REGION_2=`aws ec2 describe-subnets --filters "Name=tag:RESOURCE,Values=eks" --query "Subnets[1].SubnetId" --region=$region --output text`
#export REGION_3=`aws ec2 describe-subnets --filters "Name=tag:RESOURCE,Values=eks" --query "Subnets[2].SubnetId" --region=$region --output text`

envsubst <  values_gcp.yaml > values_deploy.yaml

helm upgrade --install ingress-nginx --namespace ingress-nginx --create-namespace kubernetes-ingress/deployments/helm-chart -f values_deploy.yaml 