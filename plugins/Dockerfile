FROM cgr.dev/chainguard/busybox:latest

USER root

ADD https://github.com/mattermost/mattermost-plugin-gitlab/releases/download/v1.9.1/com.github.manland.mattermost-plugin-gitlab-1.9.1.tar.gz /extra-plugins/
ADD https://github.com/mattermost/mattermost-plugin-ai/releases/download/v0.8.2/mattermost-plugin-ai-v0.8.2-linux-amd64.tar.gz /extra-plugins/

RUN chmod -R 777 /extra-plugins/*.tar.gz
