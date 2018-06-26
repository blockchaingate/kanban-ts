import { KanbanNode } from '../interfaces';
import { Schema } from 'mongoose';


const kanbanNodeModel: Schema = new Schema({
  id: String,
  groupId: String,
  publicKey: String
});

kanbanNodeModel.pre('save', _ => console.log('Pre-saving node info...'));
