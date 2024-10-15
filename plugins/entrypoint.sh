#! /bin/sh
# Copyright 2024 Defense Unicorns
# SPDX-License-Identifier: AGPL-3.0-or-later OR LicenseRef-Defense-Unicorns-Commercial


set -e

PLUGINS_TAR=$(ls /extra-plugins)

cd /mattermost/plugins/

for plugin_tar in ${PLUGINS_TAR};
do
  plugin_tar="/extra-plugins/${plugin_tar##*/}"
  echo "extracting $plugin_tar ..."
  tar -xf "$plugin_tar"
done

echo "finished loading plugins"
