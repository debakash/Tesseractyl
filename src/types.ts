/**
 *
 * Server Variables
 *
 */
export interface ServerVariableAttributes {
    name: string;
    description: string;
    env_variable: string;
    default_value: string;
    server_value: string;
    is_editable: boolean;
    rules: string;
}
export interface ServerVariable {
    object: "egg_variable";
    attributes: ServerVariableAttributes;
}

/**
 *
 * Server allocation interfaces
 *
 */
export interface ServerAllocationAttributes {
    id: number;
    ip: string;
    ip_alias: string | null;
    port: number;
    notes: string | null;
    is_default: boolean;
}
export interface ServerAllocation {
    object: "allocation";
    attributes: ServerAllocationAttributes;
}

/**
 *
 * Server interfaces
 *
 */
export interface ServerAttributes {
    server_owner: boolean;
    identifier: string;
    uuid: string;
    name: string;
    node: string;
    sftp_details: {
        ip: string;
        port: number;
    };
    description: string;
    limits: {
        memory: number;
        swap: number;
        disk: number;
        io: number;
        cpu: number;
    };
    invocation: string;
    feature_limits: {
        databases: number;
        allocations: number;
        backups: number;
    };
    is_suspended: boolean;
    is_installing: boolean;
    relationships: {
        allocations: {
            object: "list";
            data: ServerAllocation[];
        };
        variables: {
            object: "list";
            data: ServerVariable[];
        };
    };
}

export interface ServerInterface {
    object: "server";
    attributes: ServerAttributes;
}

export interface ServerStats {
    memory_bytes: number;
    memory_limit_bytes: number;
    cpu_absolute: number;
    network: {
        rx_bytes: number;
        tx_bytes: number;
    };
    state: ServerState;
    disk_bytes: number;
}

export type ServerState = 'starting' | 'running' | 'stopping' | 'offline'

/**
 *
 * System Permissions Interfaces
 *
 */

export interface SystemPermissionsAttributes {
    permissions: {
        websocket: [Object];
        control: [Object];
        user: [Object];
        file: [Object];
        backup: [Object];
        allocation: [Object];
        startup: [Object];
        database: [Object];
        schedule: [Object];
        settings: [Object];
    };
}
export interface SystemPermissions {
    object: "system_permissions";
    attributes: SystemPermissionsAttributes;
}

/**
 *
 * Database Interfaces
 *
 */
export interface DatabaseAttributes {
    id: string;
    host: {
        address: string;
        port: number;
    };
    name: string;
    username: string;
    connections_from: string;
    max_connections: number;
}

export interface DatabaseInterface {
    object: "server_database";
    attributes: DatabaseAttributes;
}

/**
 *
 * Backup interfaces
 *
 */

export interface BackupAttributes {
    uuid: string;
    name: string;
    ignored_files: string[];
    sha256_hash: string;
    bytes: number;
    created_at: string;
    completed_at: string;
}

export interface BackupInterface {
    object: "backup";
    attributes: BackupAttributes;
}
