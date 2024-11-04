#!/bin/bash

# Caminho para o arquivo JSON
JSON_FILE="info.json"

# Verifica se o arquivo JSON existe
if [ ! -f "$JSON_FILE" ]; then
  echo "File JSON not found: $JSON_FILE"
  exit 1
fi

# Lê valores do JSON e exporta como variáveis de ambiente
SECURE_FILE_NAME=$(jq -r '.secureFileName' "$JSON_FILE")

# Grava a variável em um arquivo
echo "##vso[task.setvariable variable=SECURE_FILE_NAME]$SECURE_FILE_NAME"

# Imprime a variável para verificação
echo "SECURE_FILE_NAME=$SECURE_FILE_NAME"

