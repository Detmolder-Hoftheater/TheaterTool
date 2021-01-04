#########################
# multi stage Dockerfile
# 1. set up the build environment and build the expath-package
# 2. run the eXist-db
#########################
FROM openjdk:8-jdk as builder

LABEL maintainer="Peter Stadler for the ViFE"

#ARG SENCHA_INSTALL=http://cdn.sencha.com/cmd/7.3.0.19/no-jre/SenchaCmd-7.3.0.19-linux-amd64.sh.zip
ARG SENCHA_INSTALL=https://cdn.sencha.com/cmd/5.1.2.52/SenchaCmd-5.1.2.52-linux-x64.run.zip
# ARG EXTJS_SOURCES=http://cdn.sencha.com/ext/gpl/ext-5.1.0-gpl.zip

RUN apt-get update && apt-get install -y --no-install-recommends ant libfreetype6 fontconfig ruby && \
    curl --silent ${SENCHA_INSTALL} -o /tmp/sencha.zip && \ 
    unzip /tmp/sencha.zip -d /tmp && \
    mv /tmp/Sencha* /tmp/sencha.sh && \
    chmod 755 /tmp/sencha.sh && \ 
    /tmp/sencha.sh --mode unattended

#RUN curl --silent ${EXTJS_SOURCES} -o /tmp/extjs.zip && \ 
#    unzip /tmp/extjs.zip -d /app && \
#    mv /app/ext-5.1.0 /app/ext 

WORKDIR /app

COPY . . 

ENV PATH="/root/bin/Sencha/Cmd/5.1.2.52:${PATH}"

RUN ./build.sh

#########################
# Now running the eXist-db
# and adding our freshly built xar-package
#########################
FROM stadlerpeter/existdb:4
ARG DATA_PACKAGE_URL

ADD --chown=wegajetty ${DATA_PACKAGE_URL} ${EXIST_HOME}/autodeploy/
COPY --chown=wegajetty --from=builder /app/build-xar/*.xar ${EXIST_HOME}/autodeploy/
