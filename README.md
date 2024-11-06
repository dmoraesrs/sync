  417  git clone https://devops.mercantil.com.br/Tecnologia_MB/MB/_git/MB.DVX.AppOfApps.PlataformaM_Mais
  418  git clone https://devops.mercantil.com.br/Tecnologia_MB/MB/_git/MB.DVX.AzureAgent.PlataformaM_Mais
  419  git clone https://devops.mercantil.com.br/Tecnologia_MB/MB/_git/MB.DVX.CICD.Pipelines.Templates
  420  git clone https://devops.mercantil.com.br/Tecnologia_MB/MB/_git/MB.DVX.Frontend.PlataformaM_Mais
  421  git clone https://devops.mercantil.com.br/Tecnologia_MB/MB/_git/MB.DVX.Templates.PlataformaM_Mais
rm -rf temp/* 
  424  cp -R MB.DVX.* temp/
  425  rm -rf temp/*/.git
  426  cd temp/MB.DVX.CICD.Pipelines.Templates/
  430  rm -rf sinc/
  431  git clone git@github.com:dmoraesrs/sync.git
  433  cp -R temp/* sync/
  434  cd sync/
  435  git add .
  436  git commit -m "Sinc"
  437  git push
