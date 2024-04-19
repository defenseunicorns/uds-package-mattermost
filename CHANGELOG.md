# Changelog

All notable changes to this project will be documented in this file.

## [9.7.1-uds.0](https://github.com/defenseunicorns/uds-package-mattermost/compare/v9.6.1-uds.0...v9.7.1-uds.0) (2024-04-19)


### Features

* env var MM_SQLSETTINGS_DATASOURCE set ([#54](https://github.com/defenseunicorns/uds-package-mattermost/issues/54)) ([16894df](https://github.com/defenseunicorns/uds-package-mattermost/commit/16894dfc302838a199e89a84e1430267538de2f8))


### Miscellaneous

* **deps:** update mattermost package dependencies ([#48](https://github.com/defenseunicorns/uds-package-mattermost/issues/48)) ([10b24e9](https://github.com/defenseunicorns/uds-package-mattermost/commit/10b24e99c2abc4acc3a59d30eb1d6d8524299d80))
* **deps:** update mattermost support dependencies ([#46](https://github.com/defenseunicorns/uds-package-mattermost/issues/46)) ([2a9d055](https://github.com/defenseunicorns/uds-package-mattermost/commit/2a9d05537fc2bd2c824a90e2a9294af8b774b12e))
* fix renovate config to only allow semver on mattermost image ([#51](https://github.com/defenseunicorns/uds-package-mattermost/issues/51)) ([65e294f](https://github.com/defenseunicorns/uds-package-mattermost/commit/65e294f9b3387c909abf61ce9d1b8ef189f6aa2a))
* update extraEnv to envFrom ([#58](https://github.com/defenseunicorns/uds-package-mattermost/issues/58)) ([57df25a](https://github.com/defenseunicorns/uds-package-mattermost/commit/57df25af4cc20c528961b30aa0914564a67108a9))

## [9.6.1-uds.0](https://github.com/defenseunicorns/uds-package-mattermost/compare/v9.4.1-uds.4...v9.6.1-uds.0) (2024-04-01)


### Miscellaneous

* **deps:** update mattermost package dependencies ([#42](https://github.com/defenseunicorns/uds-package-mattermost/issues/42)) ([8da95ef](https://github.com/defenseunicorns/uds-package-mattermost/commit/8da95efccbb1ff8dc3f33e00bc20b831d1806420))
* release 9.6.1-uds.0 ([#49](https://github.com/defenseunicorns/uds-package-mattermost/issues/49)) ([37ef4ad](https://github.com/defenseunicorns/uds-package-mattermost/commit/37ef4adc5cf209838bf978d827918faee667b896))

## [9.4.1-uds.4](https://github.com/defenseunicorns/uds-package-mattermost/compare/v9.4.1-uds.3...v9.4.1-uds.4) (2024-03-29)


### Miscellaneous

* hotfix renovate config registries ([#45](https://github.com/defenseunicorns/uds-package-mattermost/issues/45)) ([42a912b](https://github.com/defenseunicorns/uds-package-mattermost/commit/42a912b5e6bc0b3da970319f03a1f627e2f5f22b))
* implement upgrade tests for mattermost ([43044cf](https://github.com/defenseunicorns/uds-package-mattermost/commit/43044cf8ed321b7e71977c01280ab40300fb5a2b))
* update CODEOWNERS to new style/group ([27246ca](https://github.com/defenseunicorns/uds-package-mattermost/commit/27246ca21b9cb2aac31d245d4eb6b9690059ec52))

## [9.4.1-uds.3](https://github.com/defenseunicorns/uds-package-mattermost/compare/v9.4.1-uds.2...v9.4.1-uds.3) (2024-03-13)


### Miscellaneous

* add 🏭 to README.md ([9e4c566](https://github.com/defenseunicorns/uds-package-mattermost/commit/9e4c56615b8a5ef75c30c02930b8472c42cd52e6))
* **deps:** update all dependencies ([#16](https://github.com/defenseunicorns/uds-package-mattermost/issues/16)) ([e54ebc6](https://github.com/defenseunicorns/uds-package-mattermost/commit/e54ebc6f1ea9c1cb16afacadeca9e929ffe412e7))
* **deps:** update githubactions ([#17](https://github.com/defenseunicorns/uds-package-mattermost/issues/17)) ([a24855a](https://github.com/defenseunicorns/uds-package-mattermost/commit/a24855aec82b54ba868d1d4df6b23d051453db0d))
* **deps:** update githubactions ([#22](https://github.com/defenseunicorns/uds-package-mattermost/issues/22)) ([d1cf997](https://github.com/defenseunicorns/uds-package-mattermost/commit/d1cf99761139370adb51eb1b43b8bf8513ea576a))
* renovate config, remote tasks ([#14](https://github.com/defenseunicorns/uds-package-mattermost/issues/14)) ([bb6c574](https://github.com/defenseunicorns/uds-package-mattermost/commit/bb6c574383674d09e77ee7d88a1d9a5becd9faa0))
* standardize repo to template and update README.md ([#20](https://github.com/defenseunicorns/uds-package-mattermost/issues/20)) ([88a3d84](https://github.com/defenseunicorns/uds-package-mattermost/commit/88a3d84db5501ebe51dd0b4ff59b0c4233e35fb6))

## [9.4.1-uds.2](https://github.com/defenseunicorns/uds-package-mattermost/compare/v9.4.1-uds.1...v9.4.1-uds.2) (2024-02-01)


### Bug Fixes

* expose plugin upload setting ([#12](https://github.com/defenseunicorns/uds-package-mattermost/issues/12)) ([f8fbfc2](https://github.com/defenseunicorns/uds-package-mattermost/commit/f8fbfc2d38e90f82f57821e319b69388e178a1fc))

## [9.4.1-uds.1](https://github.com/defenseunicorns/uds-package-mattermost/compare/v9.4.1-uds.0...v9.4.1-uds.1) (2024-01-31)


### Bug Fixes

* handle subdomain shared between packages ([#10](https://github.com/defenseunicorns/uds-package-mattermost/issues/10)) ([31da0b4](https://github.com/defenseunicorns/uds-package-mattermost/commit/31da0b4eec93179197d1e916369a5a683e9252ac))

## [9.4.1-uds.0](https://github.com/defenseunicorns/uds-package-mattermost/compare/v9.3.0-uds.2...v9.4.1-uds.0) (2024-01-31)


### Features

* Switch to upstream chart and 9.4.1 MM ([d25c6bb](https://github.com/defenseunicorns/uds-package-mattermost/commit/d25c6bb156a9724bfd548bbc3b0c23d2b9ebd728))


### Miscellaneous

* release 9.4.1-uds.0 ([5b89960](https://github.com/defenseunicorns/uds-package-mattermost/commit/5b899604054f3d194d3c52ce2e0257991a37b47f))

## [9.3.0-uds.2](https://github.com/defenseunicorns/uds-package-mattermost/compare/v9.3.0-uds.1...v9.3.0-uds.2) (2024-01-30)


### Features

* add irsa/sa auth support ([f178a54](https://github.com/defenseunicorns/uds-package-mattermost/commit/f178a5422e0bc84bb591532015df8e9a7acb0b54))
* add irsa/sa auth support ([c3d5acb](https://github.com/defenseunicorns/uds-package-mattermost/commit/c3d5acb55e48fb4a92b62523b32ca2b90d181614))

## [9.3.0-uds.1](https://github.com/defenseunicorns/uds-package-mattermost/compare/v9.3.0-uds.0...v9.3.0-uds.1) (2024-01-29)


### Features

* update readme ([7f5162b](https://github.com/defenseunicorns/uds-package-mattermost/commit/7f5162b6cd5a3353416df0a4f6424ab9058895c0))
* Update README.md ([7e9f97b](https://github.com/defenseunicorns/uds-package-mattermost/commit/7e9f97b886d83ab592da3de8d94f68d6fedec385))


### Bug Fixes

* fix mm hostname ([516569a](https://github.com/defenseunicorns/uds-package-mattermost/commit/516569afd508436ebd0a922649f3bc1172cf5f0e))
* fix mm hostname and tests ([785384d](https://github.com/defenseunicorns/uds-package-mattermost/commit/785384dfd54e1ce1e3d5a59c8c381d3d2c65e080))
* fix tests for mm ([c660e66](https://github.com/defenseunicorns/uds-package-mattermost/commit/c660e661577f1cc82eb4f335043f207cc642d5f5))

## [0.1.7](https://github.com/defenseunicorns/uds-capability-mattermost-operator/compare/v0.1.6...v0.1.7) (2023-12-18)


### Features

* Expose full SSO config ([#22](https://github.com/defenseunicorns/uds-capability-mattermost-operator/issues/22)) ([74b0221](https://github.com/defenseunicorns/uds-capability-mattermost-operator/commit/74b0221bb2da50187792994c171176ee52839e79))

## [0.1.6](https://github.com/defenseunicorns/uds-capability-mattermost-operator/compare/v0.1.5...v0.1.6) (2023-12-15)


### Miscellaneous

* Update mattermost to v9.2.3-bb.1 ([#20](https://github.com/defenseunicorns/uds-capability-mattermost-operator/issues/20)) ([03943a2](https://github.com/defenseunicorns/uds-capability-mattermost-operator/commit/03943a252152e374689646c6e18372639ca8901b))

## [0.1.5](https://github.com/defenseunicorns/uds-capability-mattermost-operator/compare/v0.1.4...v0.1.5) (2023-12-11)


### Features

* expose volume and volume mounts ([#18](https://github.com/defenseunicorns/uds-capability-mattermost-operator/issues/18)) ([c06ae6a](https://github.com/defenseunicorns/uds-capability-mattermost-operator/commit/c06ae6a0f86aa944c15aa9ea59023b78870cc2cc))

## [0.1.4](https://github.com/defenseunicorns/uds-capability-mattermost-operator/compare/v0.1.3...v0.1.4) (2023-12-09)


### Features

* Variablize file store endpoint ([#16](https://github.com/defenseunicorns/uds-capability-mattermost-operator/issues/16)) ([fe89c0c](https://github.com/defenseunicorns/uds-capability-mattermost-operator/commit/fe89c0c1bec6e67f25c0e72fef24c820b1639586))

## [0.1.3](https://github.com/defenseunicorns/uds-capability-mattermost-operator/compare/v0.1.2...v0.1.3) (2023-12-07)


### Features

* Add configurable bucket suffix ([#15](https://github.com/defenseunicorns/uds-capability-mattermost-operator/issues/15)) ([d2e78e7](https://github.com/defenseunicorns/uds-capability-mattermost-operator/commit/d2e78e74e1969a2ae33ffc80a4a8613a3005e3ac))
* add initial oscal component definition file. ([#13](https://github.com/defenseunicorns/uds-capability-mattermost-operator/issues/13)) ([44d78bc](https://github.com/defenseunicorns/uds-capability-mattermost-operator/commit/44d78bc7ef9ea7927624578d13c72cee028b7263))

## [0.1.2](https://github.com/defenseunicorns/uds-capability-mattermost-operator/compare/v0.1.1...v0.1.2) (2023-12-01)


### Miscellaneous

* Sync dev deps with releases ([01b85a8](https://github.com/defenseunicorns/uds-capability-mattermost-operator/commit/01b85a8fcb8ee00cd3c9ac46140dbdb6b374aea5))

## [0.1.1](https://github.com/defenseunicorns/uds-capability-mattermost-operator/compare/v0.1.0...v0.1.1) (2023-11-29)


### Miscellaneous

* initial release updates ([b5da656](https://github.com/defenseunicorns/uds-capability-mattermost-operator/commit/b5da656be61ed520634c9adaf45b26f268c8f9b3))
* More release updates ([#11](https://github.com/defenseunicorns/uds-capability-mattermost-operator/issues/11)) ([87fcad9](https://github.com/defenseunicorns/uds-capability-mattermost-operator/commit/87fcad970bcd772e08cec286ee3ff42c5aeec432))

## [0.0.0] - 2023-08-42
PRE RELEASE

### Added
- Initial CHANGELOG.md
- CONTRIBUTING.md
- CODEOWNERS
