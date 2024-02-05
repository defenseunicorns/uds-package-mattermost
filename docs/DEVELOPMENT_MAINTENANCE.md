# UDS Capability Mattermost Operator

## How to upgrade this package

This package is pulling in the [bigbang mattermost operator chart](https://repo1.dso.mil/big-bang/product/packages/mattermost-operator)
and the [bigbang mattermost chart](https://repo1.dso.mil/big-bang/product/packages/mattermost)

The [mattermost-operator-flux-values.yaml](../mattermost-operator-flux-values.yaml) and [mattermost-flux-values.yaml](../mattermost-flux-values.yaml) file contains values used when creating the flux resources for this package. This includes the version of the chart and the base values used for this package.

To upgrade
1) Point `application.ref.tag` to the updated version of the chart.
1) Update any base values if necessary.
1) Update the `mattermost-operator` and `mattermost` components in the [zarf.yaml](../zarf.yaml) file to pull in the correct images needed for the updated version of the chart.

## How to test this package

1) With docker running and while connected to an aws account.
2) Set these env variables.
```bash
export REPO_URL=https://github.com/defenseunicorns/uds-package-mattermost-operator.git
export GIT_BRANCH=<REPLACE_ME>
export REGISTRY1_USERNAME=<REPLACE_ME>
export REGISTRY1_PASSWORD=<REPLACE_ME>
export AWS_AVAILABILITY_ZONE=a
```

 3) At the root of this repository, you can run `make test`. This will provision an ec2 instance, build and deploy all dependencies and packages, and run an e2e test to insure the package is deploying successfully, available and ready.

You can also follow the bread crumbs of the Makefile to manually create the cluster as well as build and deploy all the necessary packages.

## How to manually trigger e2e tests in a github PR

This project uses [slash command dispatch](https://github.com/peter-evans/slash-command-dispatch). To use this, add a comment in your PR that says `/test all`. This will trigger the e2e tests for this repo.

## Auto e2e tests

This project will automatically run e2e tests on pushes to `main`

## Creating Releases

This project uses [release-please-action](https://github.com/google-github-actions/release-please-action) for versioning and releasing OCI packages.

### How should I write my commits?

Release Please assumes you are using [Conventional Commit messages](https://www.conventionalcommits.org/).

The most important prefixes you should have in mind are:

- `fix:` which represents bug fixes, and correlates to a [SemVer](https://semver.org/)
  patch.
- `feat:` which represents a new feature, and correlates to a SemVer minor.
- `feat!:`,  or `fix!:`, `refactor!:`, etc., which represent a breaking change
  (indicated by the `!`) and will result in a SemVer major.

When changes are merged to the `main` branch, the Release Please will evaluate all commits since the previous release to calculate what changes are included and will create another PR to increase the version and tag a new release (per the Release Please design [documentation](https://github.com/googleapis/release-please/blob/main/docs/design.md#lifecycle-of-a-release)). This will also automatically generate changelog entries based on these commits.

> TIP: Merging a PR should be done via a branch **"Squash and merge"**; this means that the commit message seen on this PR merge is what Release Please will use to determine a version bump.

When the auto generated Release Please PR is merged the following steps will automatically happen.
1) A new release will be created and tagged
1) An e2e test will be triggered
1) If e2e passes, a new package artifact will be published to the OCI registry
