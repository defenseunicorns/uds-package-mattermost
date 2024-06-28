FROM cgr.dev/chainguard/busybox:latest

# renovate: datasource=github-tags depName=mattermost/mattermost-plugin-ai versioning=semver
ENV MATTERMOST_AI_PLUGIN_VERSION=0.8.2
# renovate: datasource=github-tags depName=mattermost/mattermost-plugin-gitlab versioning=semver
ENV MATTERMOST_GITLAB_PLUGIN_VERSION=1.9.1

USER root

ADD https://github.com/mattermost/mattermost-plugin-ai/releases/download/v$MATTERMOST_AI_PLUGIN_VERSION/mattermost-plugin-ai-v$MATTERMOST_AI_PLUGIN_VERSION-linux-amd64.tar.gz /extra-plugins/
ADD https://github.com/mattermost/mattermost-plugin-gitlab/releases/download/v$MATTERMOST_GITLAB_PLUGIN_VERSION/com.github.manland.mattermost-plugin-gitlab-$MATTERMOST_GITLAB_PLUGIN_VERSION.tar.gz /extra-plugins/

RUN chmod -R 777 /extra-plugins/*.tar.gz
