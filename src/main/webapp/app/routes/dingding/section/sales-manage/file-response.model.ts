export class FileResponse {
    public id ?: any;
    public reallyFileName ?: string;
    public saveFileName ?: string;
    public downloadUrl ?: string;
    public fileSize ?: any;
    public uploadUser ?: string;
    public uploadTime ?: string;

    constructor(id ?: any,
                reallyFileName ?: string,
                saveFileName ?: string,
                downloadUrl ?: string,
                fileSize ?: any,
                uploadUser ?: string,
                uploadTime ?: string,) {
        this.id = id ? id : null;
        this.reallyFileName = reallyFileName ? reallyFileName : null;
        this.saveFileName = saveFileName ? saveFileName : null;
        this.downloadUrl = downloadUrl ? downloadUrl : null;
        this.fileSize = fileSize ? fileSize : null;
        this.uploadUser = uploadUser ? uploadUser : null;
        this.uploadTime = uploadTime ? uploadTime : null;
    }
}
