import {EntryError} from './entry-error';

export interface BodyResponse {
  success: boolean;
  data: any;
  errors: EntryError[] | { message: string };
  status: number;
  code: number | string;
}
