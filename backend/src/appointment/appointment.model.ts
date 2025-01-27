import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema()
export class Appointment extends Document {
  @Prop({ required: true, ref: 'User' })
  doctor: mongoose.Types.ObjectId;

  @Prop({ required: true, ref: 'User' })
  patient: mongoose.Types.ObjectId;

  @Prop({ required: true })
  date_time: Date;

  @Prop({ default: Date.now, immutable: true })
  created_at: Date;

  @Prop({ default: Date.now })
  updated_at: Date;

  @Prop({ default: null })
  deleted_at: Date;
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
