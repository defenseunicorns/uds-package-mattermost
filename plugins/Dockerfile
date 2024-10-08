FROM cgr.dev/chainguard/busybox:latest

# renovate: datasource=github-tags depName=mattermost/mattermost-plugin-ai versioning=semver
ENV MATTERMOST_AI_PLUGIN_VERSION=1.0.0
# renovate: datasource=github-tags depName=mattermost/mattermost-plugin-gitlab versioning=semver
ENV MATTERMOST_GITLAB_PLUGIN_VERSION=1.9.1

USER root

# We build this as a multi-arch image so that it can be used more easily across architectures (i.e. under faux86 paradigms like Rosetta)
ADD https://github.com/mattermost/mattermost-plugin-ai/releases/download/v$MATTERMOST_AI_PLUGIN_VERSION/mattermost-plugin-ai-v$MATTERMOST_AI_PLUGIN_VERSION-linux-amd64.tar.gz /extra-plugins/
ADD https://github.com/mattermost/mattermost-plugin-ai/releases/download/v$MATTERMOST_AI_PLUGIN_VERSION/mattermost-plugin-ai-v$MATTERMOST_AI_PLUGIN_VERSION-linux-arm64.tar.gz /extra-plugins/
ADD https://github.com/mattermost/mattermost-plugin-gitlab/releases/download/v$MATTERMOST_GITLAB_PLUGIN_VERSION/com.github.manland.mattermost-plugin-gitlab-$MATTERMOST_GITLAB_PLUGIN_VERSION.tar.gz /extra-plugins/

COPY ./entrypoint.sh /bin/entrypoint.sh

RUN chmod -R 777 /extra-plugins/*.tar.gz

ENTRYPOINT [ "/bin/entrypoint.sh" ]
