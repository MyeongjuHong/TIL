Unable to connect to server: Timeout expired
===

### Reason
Connection restriction: <br>
Postgresql configuration block connection from specific IP address or host <br>
(I use Ubuntu in MS + use Postgresql in Ubuntu & use pgadmin4 in MS, so IP maybe different)

### Solution
`listen_addresses = '*'`


### Reference

[stackoverflow](https://stackoverflow.com/questions/60532791/timeout-expired-pgadmin-unable-to-connect-to-server)
<details>
<summary>ChatGPT</summary>

### Setting Up PostgreSQL to Listen on All Interfaces

1. **Find the Configuration File**:
   - The `postgresql.conf` file is usually located at `/etc/postgresql/{version}/main/postgresql.conf` or `/usr/local/pgsql/data/postgresql.conf`, depending on your installation.

2. **Edit the Configuration**:
   - Open the `postgresql.conf` file. You can use a text editor like `nano` or `vim`:
     ```bash
     sudo nano /etc/postgresql/{version}/main/postgresql.conf
     ```
   - Find the `listen_addresses` setting and change it to:
     ```plaintext
     listen_addresses = '*'
     ```
   - This configuration allows PostgreSQL to accept connections from all network interfaces.

3. **Restart the Server**:
   - After making changes, restart the PostgreSQL server to apply the new settings. The command varies by operating system:
     - **Linux (systemd)**: `sudo systemctl restart postgresql`
     - **Linux (SysV init)**: `sudo service postgresql restart`
     - **Windows**: Restart the PostgreSQL service using the service management tool or `pg_ctl` from the command prompt.

### Security Considerations

1. **Firewall Settings**:
   - Ensure that your server’s firewall allows connections on the PostgreSQL port (default is 5432). You may need to add a rule to open this port.

2. **Configure `pg_hba.conf`**:
   - Modify the `pg_hba.conf` file to set access permissions. You can specify which IP addresses or networks are allowed to connect:
     - For example, to allow connections from a specific IP range:
       ```plaintext
       host    all             all             192.168.1.0/24            md5
       ```
   - Changes to `pg_hba.conf` also require a server restart to take effect.

3. **Enhanced Security**:
   - For better security, consider specifying only the necessary IP addresses in `listen_addresses` instead of using `'*'`:
     ```plaintext
     listen_addresses = '192.168.1.100'
     ```
   - This restricts connections to a specific IP address.

Setting `listen_addresses = '*'` allows PostgreSQL to accept connections from any network interface, but be sure to implement proper security measures, such as access control in `pg_hba.conf`, firewall rules, and strong authentication, to protect your server.
</details>