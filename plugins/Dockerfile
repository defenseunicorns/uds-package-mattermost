# Copyright 2024 Defense Unicorns
# SPDX-License-Identifier: AGPL-3.0-or-later OR LicenseRef-Defense-Unicorns-Commercial

FROM cgr.dev/chainguard/busybox:latest

# renovate: datasource=github-tags depName=mattermost/mattermost-plugin-agents versioning=semver
ENV MATTERMOST_AI_PLUGIN_VERSION=1.3.1
# renovate: datasource=github-tags depName=mattermost/mattermost-plugin-gitlab versioning=semver
ENV MATTERMOST_GITLAB_PLUGIN_VERSION=1.11.0

USER root

# We build this as a multi-arch image so that it can be used more easily across architectures (i.e. under faux86 paradigms like Rosetta)
ADD https://github.com/mattermost/mattermost-plugin-agents/releases/download/v$MATTERMOST_AI_PLUGIN_VERSION/mattermost-plugin-agents-v$MATTERMOST_AI_PLUGIN_VERSION-linux-amd64.tar.gz /extra-plugins/
ADD https://github.com/mattermost/mattermost-plugin-agents/releases/download/v$MATTERMOST_AI_PLUGIN_VERSION/mattermost-plugin-agents-v$MATTERMOST_AI_PLUGIN_VERSION-linux-arm64.tar.gz /extra-plugins/
ADD https://github.com/mattermost/mattermost-plugin-gitlab/releases/download/v$MATTERMOST_GITLAB_PLUGIN_VERSION/mattermost-plugin-gitlab-v$MATTERMOST_GITLAB_PLUGIN_VERSION-linux-amd64.tar.gz /extra-plugins/
ADD https://github.com/mattermost/mattermost-plugin-gitlab/releases/download/v$MATTERMOST_GITLAB_PLUGIN_VERSION/mattermost-plugin-gitlab-v$MATTERMOST_GITLAB_PLUGIN_VERSION-linux-arm64.tar.gz /extra-plugins/

COPY ./entrypoint.sh /bin/entrypoint.sh

RUN chmod -R 777 /extra-plugins/*.tar.gz

ENTRYPOINT [ "/bin/entrypoint.sh" ]
