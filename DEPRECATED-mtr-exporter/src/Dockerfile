##
## -- runtime environment
##

FROM    debian AS build-env

ARG     TARGETPLATFORM
ARG     TARGETOS
ARG     TARGETARCH

ARG     VERSION=latest

ADD     . /src/mtr-exporter
RUN     apt-get update && apt-get install mtr make golang lynx net-tools -y
RUN     cd /src/mtr-exporter && make
##
## -- runtime environment
##

FROM    debian AS rt-env
WORKDIR /app
RUN     apt-get update && apt-get install mtr golang lynx net-tools -y
COPY    --from=build-env /src/mtr-exporter/mtr-exporter .

EXPOSE  80
ENTRYPOINT [ "/app/mtr-exporter", "-bind", ":80", "--", "-c", "2", "-n", "10.24.0.187", "--tcp", "--port=9092" ]