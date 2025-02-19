import { AppInputData } from './app-input-data.model';
import { DataFileHeader } from './data-file-headers.model';

export interface DataFile extends DataFileHeader {
  content: Array<AppInputData>;
}
