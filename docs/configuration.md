# Configuration

This Mattermost package is primarily configured through the upstream
[Mattermost chart](https://github.com/mattermost/mattermost-helm/tree/master/charts/mattermost-enterprise-edition).

## Networking

Network policies are controlled via the `uds-mattermost-config` chart in accordance with the [common patterns for networking within UDS Software Factory](https://github.com/defenseunicorns/uds-software-factory/blob/main/docs/networking.md).  Mattermost interacts with Postgresql and S3 externally and supports the following keys:

- `postgres`: sets network policies for accessing a Postgres database from the Mattermost pod
- `storage`: sets network policies for accessing S3-compatible object storage from the Mattermost pod
- `additionalNetworkAllow`: sets custom network policies for the Mattermost namespace - this allows for custom integrations with other services

## Database

SonarQube uses Postgres as its backing database service and supports the [common database providers within UDS Software Factory](https://github.com/defenseunicorns/uds-software-factory/blob/main/docs/database.md).  

### Manual Database Connection

If you are using the [UDS Postgres Operator](https://github.com/defenseunicorns/uds-package-postgres-operator/) or another external database that uses usernames/passwords you can use the following Helm overrides to configure it:

#### `uds-mattermost-config` chart:

> [!IMPORTANT]
> The `postgres.password` and `postgres.username` settings are not applicable when using the UDS Postgres Operator package or when supplying a secret manually!

- `postgres.password` - provides a password to generate a secret to pass to Mattermost
- `postgres.username` - provides the username to use when connecting to the database (i.e. `mattermost`)

> [!IMPORTANT]
> The `postgres.existingSecret` settings are not applicable when providing a password/username to the `uds-mattermost-config` chart manually.

- `postgres.existingSecret.name` - provides the secret that contains the database password (defaults to `mattermost.mattermost.pg-cluster.credentials.postgresql.acid.zalan.do`)
- `postgres.existingSecret.passwordKey` - provides the secret key that contains the database password (defaults to `password`)
- `postgres.existingSecret.passwordKey` - provides the secret key that contains the database username (defaults to `username`)
- `postgres.host` - provides the host/domain name to use for the database (i.e. `pg-cluster.postgres.svc.cluster.local`)
- `postgres.connectionOptions` - provides connection options to use when connecting to the database (i.e. `?connect_timeout=10`)

- `rtcService.enabled` - enables rtc service for [calls plugin rtc server](https://docs.mattermost.com/configure/calls-deployment.html#network) (defaults to `false`)
- `rtcService.type` - service type (defaults to `ClusterIP`)
- `rtcService.annotations` - service annotations (defaults to `{}`)
- `ports` - service port mappings, mattermost will default both udp and tcp to 8443 (defaults to `{"ports":[{"name":"udp-mattermost-rtc","port":8443,"protocol":"UDP","targetPort":8443},{"name":"tcp-mattermost-rtc","port":8443,"protocol":"TCP","targetPort":8443}]}`)

### IAM Roles for Service Accounts

The Software Factory team has not yet tested IRSA with AWS RDS - there is an open issue linked below with further linked issues to test this that could act as a starting point to implement:

https://github.com/defenseunicorns/uds-software-factory/issues/45


## Object Storage

> [!NOTE]
> This section is subject to change / improvement once [`uds-package-minio-operator`](https://github.com/defenseunicorns/uds-package-minio-operator) is fully ready for production use cases.

Object storage configuration is setup in the `uds-mattermost-config` chart and should be done via bundle overrides (variables or values) like the below:

```yaml
    overrides:
      mattermost:
        uds-mattermost-config:
          values:
            - path: "objectStorage.endpoint"
              value: "minio.dev-minio.svc.cluster.local:9000"
```

The full list of override config can be found in the values under `objectStorage` [here](.././chart/values.yaml). In addition zarf vars are exposed for `ACCESS_KEY` and `SECRET_KEY` for convenience if using import/exports in your bundle.

To use IRSA make sure to NOT set the two key variables and add the appropriate role ARN annotation to the service account via an override to `serviceAccount.annotations`. As an example:

```yaml
    overrides:
      mattermost:
        mattermost-enterprise-edition:
          values:
            - path: "serviceAccount.annotations.irsa/role-arn"
              value: "arn:aws:iam::123456789:role/mattermost-role"
```

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
