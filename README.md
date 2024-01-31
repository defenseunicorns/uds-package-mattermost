# UDS Mattermost Package

This repo contains the UDS Mattermost Package along with an example bundle and UDS tasks for development.

## Dependencies

Mattermost requires two dependencies, postgres and s3 compatible object storage. Wiring Mattermost to your dependencies is done primarily via helm values, which will require the use of a bundle created with uds-cli.

### Postgres

Postgres configuration is setup in the `uds-mattermost-config` chart and should be done via bundle overrides (variables or values) like the below:
```yaml
    overrides:
      mattermost:
        uds-mattermost-config:
          values:
            - path: "postgres.host"
              value: "postgresql.dev-postgres.svc.cluster.local"
```

The full list of override config can be found in the values under `postgres` [here](./chart/values.yaml). In addition a zarf var is exposed for `DB_PASSWORD` for convenience if using import/exports in your bundle.

### S3 Compatible Object Storage

Object storage configuration is setup in the `uds-mattermost-config` chart and should be done via bundle overrides (variables or values) like the below:
```yaml
    overrides:
      mattermost:
        uds-mattermost-config:
          values:
            - path: "objectStorage.endpoint"
              value: "minio.dev-minio.svc.cluster.local:9000"
```

The full list of override config can be found in the values under `objectStorage` [here](./chart/values.yaml). In addition zarf vars are exposed for `ACCESS_KEY` and `SECRET_KEY` for convenience if using import/exports in your bundle.

To use IRSA make sure to not set the two keys and add the appropriate annotation to the service account via an override to `serviceAccount.annotations`.
