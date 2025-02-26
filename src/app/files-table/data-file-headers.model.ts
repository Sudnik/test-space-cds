export class DataFileHeader {
  constructor(
    public dataFileId: number,
    public fileName: string,
    public uploadDate: Date
  ) {}

  formattedDate() {
    return this.uploadDate.toLocaleDateString('en-US');
  }
}
