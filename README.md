#!/bin/bash

# Clonar os repositórios
git clone https://devops.mercantil.com.br/Tecnologia_MB/MB/_git/MB.DVX.AppOfApps.PlataformaM_Mais
git clone https://devops.mercantil.com.br/Tecnologia_MB/MB/_git/MB.DVX.AzureAgent.PlataformaM_Mais
git clone https://devops.mercantil.com.br/Tecnologia_MB/MB/_git/MB.DVX.CICD.Pipelines.Templates
git clone https://devops.mercantil.com.br/Tecnologia_MB/MB/_git/MB.DVX.Frontend.PlataformaM_Mais
git clone https://devops.mercantil.com.br/Tecnologia_MB/MB/_git/MB.DVX.Templates.PlataformaM_Mais

# Limpar o diretório temp e copiar os repositórios clonados para lá
rm -rf temp/*
mkdir -p temp
cp -R MB.DVX.* temp/

# Remover as pastas .git para evitar que sejam consideradas submódulos
find temp/* -type d -name ".git" -exec rm -rf {} +

# Navegar para o diretório desejado e configurar o repositório sync
cd temp/MB.DVX.CICD.Pipelines.Templates/
rm -rf sinc/
git clone git@github.com:dmoraesrs/sync.git

# Copiar o conteúdo de temp para o repositório sync e fazer commit
cp -R ../* sync/
cd sync/
git add .
git commit -m "Sinc"
git push
