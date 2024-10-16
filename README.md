# 🏭 UDS Mattermost Package

[<img alt="Made for UDS" src="https://raw.githubusercontent.com/defenseunicorns/uds-common/refs/heads/main/docs/assets/made-for-uds-silver.svg" height="20px"/>](https://github.com/defenseunicorns/uds-core)
[![Latest Release](https://img.shields.io/github/v/release/defenseunicorns/uds-package-mattermost)](https://github.com/defenseunicorns/uds-package-mattermost/releases)
[![Build Status](https://img.shields.io/github/actions/workflow/status/defenseunicorns/uds-package-mattermost/release.yaml)](https://github.com/defenseunicorns/uds-package-mattermost/actions/workflows/release.yaml)
[![OpenSSF Scorecard](https://api.securityscorecards.dev/projects/github.com/defenseunicorns/uds-package-mattermost/badge)](https://api.securityscorecards.dev/projects/github.com/defenseunicorns/uds-package-mattermost)

This package is designed for use as part of a [UDS Software Factory](https://github.com/defenseunicorns/uds-software-factory) bundle deployed on [UDS Core](https://github.com/defenseunicorns/uds-core).

> [!IMPORTANT]  
> The `arm64` package includes `amd64` images due to lack of availability of `arm64` images from upstream projects at this time. This means you can deploy the `arm64` package on an `arm64` kubernetes cluster, but some of the images contained in the package will require emulation (e.g., qemu or rosetta) to run properly.

> [!TIP]
> To add additional environment variables to Mattermost you can do so by overriding the `extraEnv` key in the `uds-mattermost-config` chart.
> ```yaml
> overrides:
>   mattermost:
>     uds-mattermost-config:
>       values:
>         - path: "extraEnv"
>           value:
>             MY_ENV_VAR: "an env var value"
> ```

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

### Monitoring

> [!IMPORTANT]
> Mattermost supports emitting metrics to feed into Prometheus, but _only_ if you have a license. This package configures the necessary service monitor to enable metrics, but only when a license has been provided via the `MM_LICENSE` var. By default (no license), it does not provision the Service Monitor as it will show unhealthy because metrics is not enabled via the license.

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

## Development

When developing this package it is ideal to utilize the json schemas for UDS Bundles, Zarf Packages and Maru Tasks. This involves configuring your IDE to provide schema validation for the respective files used by each application. For guidance on how to set up this schema validation, please refer to the [guide](https://github.com/defenseunicorns/uds-common/blob/main/docs/development-ide-configuration.md) in uds-common.
