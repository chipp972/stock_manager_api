import * as mongoose from 'mongoose'
import * as autoIncr from 'mongoose-auto-increment'

import {Attachment} from '../type/model.d.ts'

const modelName = 'Attachment'

export let AttachmentSchema = new mongoose.Schema({
  contentType: { required: true, type: String},
  data: { required: true, type: Buffer},
  description: String,
  name: { lowercase: true, required: true, trim: true, type: String}
})

// Plugins
AttachmentSchema.plugin(autoIncr.plugin, modelName)

export let AttachmentModel =
  mongoose.model<Attachment>(modelName, AttachmentSchema)
