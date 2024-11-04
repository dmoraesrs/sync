FROM ubuntu:20.04

# Configuração de ambiente
ENV DEBIAN_FRONTEND=noninteractive
ENV TARGETARCH="linux-x64"
ENV DOCKER_HOST="unix:///var/run/docker.sock"

# Adiciona repositório e atualiza pacotes
RUN apt-get update && apt-get install -y software-properties-common && \
    add-apt-repository universe && apt-get update

# Instalação de pacotes essenciais
RUN apt-get upgrade -y && apt-get install -y -qq --no-install-recommends \
    apt-transport-https \
    apt-utils \
    ca-certificates \
    curl \
    git \
    iputils-ping \
    jq \
    lsb-release \
    software-properties-common \
    libicu-dev \
    unzip \
    gettext \
    python3-pip \
    npm \
    python3-setuptools \
    python3-venv && \
    rm -rf /var/lib/apt/lists/*

# Instalação do Helm
RUN curl -fsSL -o get_helm.sh https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 && \
    chmod +x get_helm.sh && ./get_helm.sh && rm get_helm.sh

# Instalação do Azure CLI
RUN curl -sL https://aka.ms/InstallAzureCLIDeb | bash

# Instalação do kubectl
RUN curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl" && \
    mv kubectl /usr/local/bin/kubectl && chmod +x /usr/local/bin/kubectl

# Instalação do Docker CLI e configuração do grupo docker
RUN curl -fsSL https://get.docker.com | bash && \
    useradd -m -d /home/agent agent && \
    usermod -aG docker agent && \
    mkdir -p /azp && \
    chown -R agent:agent /azp /home/agent && \
    chmod -R 755 /azp

# Copia o certificado e atualiza a CA
COPY ./CA.cer /usr/local/share/ca-certificates/mb.crt
RUN update-ca-certificates

# Define o diretório de trabalho
WORKDIR /azp

# Copia e ajusta o script de inicialização
COPY ./start.sh /azp/start.sh
RUN chmod +x /azp/start.sh

# Troca para o usuário 'agent'
USER agent

# Exposição da porta para comunicação Docker (opcional)
EXPOSE 2375

# Define o ponto de entrada
ENTRYPOINT ["./start.sh"]