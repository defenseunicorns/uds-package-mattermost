# 🏭 UDS Mattermost Package

[![Latest Release](https://img.shields.io/github/v/release/defenseunicorns/uds-package-mattermost)](https://github.com/defenseunicorns/uds-package-mattermost/releases)
[![Build Status](https://img.shields.io/github/actions/workflow/status/defenseunicorns/uds-package-mattermost/tag-and-release.yaml)](https://github.com/defenseunicorns/uds-package-mattermost/actions/workflows/tag-and-release.yaml)
[![OpenSSF Scorecard](https://api.securityscorecards.dev/projects/github.com/defenseunicorns/uds-package-mattermost/badge)](https://api.securityscorecards.dev/projects/github.com/defenseunicorns/uds-package-mattermost)

This package is designed for use as part of a [UDS Software Factory](https://github.com/defenseunicorns/uds-software-factory) bundle deployed on [UDS Core](https://github.com/defenseunicorns/uds-core).

## Prerequisites

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

## Flavors

| Flavor | Description | Example Creation |
| ------ | ----------- | ---------------- |
| upstream | Uses upstream images within the package. | `zarf package create . -f upstream` |
| registry1 | Uses images from registry1.dso.mil within the package. | `zarf package create . -f registry1` |

## Releases

The released packages can be found in [ghcr](https://github.com/defenseunicorns/uds-package-mattermost/pkgs/container/packages%2Fuds%2Fmattermost).

## UDS Tasks (for local dev and CI)

*For local dev, this requires you install [uds-cli](https://github.com/defenseunicorns/uds-cli?tab=readme-ov-file#install)

> :white_check_mark: **Tip:** To get a list of tasks to run you can use `uds run --list`!

## Contributing

Please see the [CONTRIBUTING.md](./CONTRIBUTING.md)
