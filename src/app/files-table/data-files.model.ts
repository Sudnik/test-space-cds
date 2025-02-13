import { AppInputData } from "./app-input-data.model";

export interface DataFile {
  dataFileId: string;
  fileName: string;
  uploadDate: Date;
  content: Array<AppInputData>;
}
