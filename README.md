# UDS Mattermost Package

This repo contains a UDS Package for [Mattermost](https://mattermost.com/), along with an example bundle and UDS tasks for development.

## Flavors

Two flavors of this package are produced at this time:
- `upstream`: This flavor uses the upstream images (same ones deployed by the chart by default) and is intended for a quick and seamless development experience
- `registry1` (amd64 architecture only): This flavor uses hardened images from [Ironbank](https://p1.dso.mil/services/iron-bank) and is intended for production environments

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

To use IRSA make sure to NOT set the two key variables and add the appropriate role ARN annotation to the service account via an override to `serviceAccount.annotations`. As an example:
```yaml
    overrides:
      mattermost:
        mattermost-enterprise-edition:
          values:
            - path: "serviceAccount.annotations.irsa/role-arn"
              value: "arn:aws:iam::123456789:role/mattermost-role"
```

## Additional Config

Additional configuration can be done via overrides to configure a number of Mattermost properties like SSO. Check the full list of values in the config chart [here](./chart/values.yaml). If you find that you need something else exposed please open an issue!
