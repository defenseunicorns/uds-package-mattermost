# uds-package-mattermost

UDS Mattermost Zarf Package

## Dependencies

Mattermost requires two dependencies, postgres and s3 compatible object storage. Wiring Mattermost to your dependencies is done via secrets created in the `mattermost` namespace.

### Postgres

You should create a secret named `mattermost-postgres` with a single key containing the DB connection string like the following:

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: mattermost-postgres
  namespace: mattermost
type: kubernetes.io/opaque
stringData:
  DB_CONNECTION_STRING: "postgres://username:password@hostname:port/dbname?postgresoptions"
```

### S3 Compatible Object Storage

You should create a secret named `mattermost-object-store` with a number of keys matching the below:

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: mattermost-object-store
  namespace: mattermost
type: kubernetes.io/opaque
stringData:
  secure_connection: <true/false> # Typically false for insecure connections like MinIO
  access_key: <your-access-key>
  secret_key: <your-secret-key>
  region: <your-region>
  bucket: <your-bucket>
  endpoint: <your-endpoint>
```

To use IRSA make sure to set the two keys to empty strings and add the appropriate annotations to the service account via `serviceAccount.annotations` (override in a UDS Bundle).

TODO: Figure out if this setup works and a better way to handle the keys...
