import { AppInputData } from './app-input-data.model';
import { DataFileHeader } from './data-file-headers.model';

export class DataFile extends DataFileHeader {
  constructor(
    dataFileId: number,
    fileName: string,
    uploadDate: Date,
    public content: Array<AppInputData>
  ) {
    super(dataFileId, fileName, uploadDate);
  }
}
