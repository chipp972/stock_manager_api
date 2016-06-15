interface Config {
  name: string
  user?: string
  password?: string
}

export interface ServerConfig extends Config {
  host: string
  port: number
  logfile: string
}

declare enum DatabaseType {
  'mysql', 'mongodb', 'sqlite'
}

export interface DatabaseConfig extends Config {
  host: string
  port: number
  database: string
  type: DatabaseType
  file?: string // filepath of the database for sqlite only
}
