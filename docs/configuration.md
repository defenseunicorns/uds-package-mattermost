# Configuration

This Mattermost package is primarily configured through the upstream
[Mattermost chart](https://github.com/mattermost/mattermost-helm/tree/master/charts/mattermost-enterprise-edition).

## Plugins

For installing plugins into your environment, we recommend the included `mattermost-plugins` Zarf package.
It includes the following plugins by default:

- [`mattermost-plugin-ai`](https://github.com/mattermost/mattermost-plugin-ai)
- [`mattermost-plugin-gitlab`](https://github.com/mattermost/mattermost-plugin-gitlab)


In order to load these plugins into the Mattermost server, the `uds-package-mattermost/mattermost-extra-plugins`
image provided by this package should be injected as an `initContainer` by adding the following `overrides` to your
UDS bundle:

```yaml
  - name: mattermost
    overrides:
      mattermost:
        mattermost-enterprise-edition:
          values:
            - path: "mattermostApp.extraInitContainers"
              value:
                # Extra Container to install plugins
                - name: mattermost-extra-plugins
                  image: uds-package-mattermost/mattermost-extra-plugins:latest
                  imagePullPolicy: Always
                  volumeMounts:
                    # Must match plugins volumes from chart

                    # In mattermost-team-edition chart, this is `/mattermost/$MM_PLUGINSETTINGS_CLIENTDIRECTORY`
                    # see: https://github.com/mattermost/mattermost-helm/blob/master/charts/mattermost-team-edition/templates/deployment.yaml#L103-L104

                    # In mattermost-enterprise-edition chart, it is hardcoded to `/mattermost/plugins/`
                    # see: https://github.com/mattermost/mattermost-helm/blob/master/charts/mattermost-enterprise-edition/templates/deployment-mattermost-app.yaml#L174-L177
                    - name: mattermost-plugins
                      mountPath: /mattermost/plugins/
```
