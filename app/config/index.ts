/**
 * @module config
 */
import * as fs from 'fs'
import * as path from 'path'
import {ServerConfig, DatabaseConfig, MailConfig} from '../type/config.d.ts'

const FILES = {
  database: 'db',
  mail: 'mail',
  server: 'server'
}

export function getMailConfig (name: string): Promise<MailConfig> {
  return getConfigByName(FILES.mail, name)
}

export function getServerConfig (name: string): Promise<ServerConfig> {
  return getConfigByName(FILES.server, name)
}

export function getDatabaseConfig (name: string): Promise<DatabaseConfig> {
  return getConfigByName(FILES.database, name)
}

/**
 * Retrieves server config by name
 */
function getConfigByName (file: string, name: string): Promise<any> {
  return new Promise<any>((resolve, reject) => {
    getJSON(path.resolve(__dirname, `${file}.json`))
    .then((configurationList) => {
      for (let config of configurationList) {
        if (config.name === name) {
          resolve(config)
        }
      }
    })
    .catch((err) => reject(err))
  })
}

function getJSON (filepath: string): Promise<Array<any>> {
  return new Promise<Array<any>>((resolve, reject) => {
    fs.readFile(filepath, (err, buffer) => {
      if (err) {
        reject(err)
      }
      resolve(JSON.parse(String(buffer)))
    })
  })
}
