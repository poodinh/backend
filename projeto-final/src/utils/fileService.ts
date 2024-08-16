import path from 'path';
import fs from 'fs';
import { v4 as uuidv4} from 'uuid';

class FileService {
    save(file: any): string {
        const fileExtension = file.mimetype.split("/")[1];

        const fileName = uuidv4() + "." + fileExtension;

        const filePath = path.resolve("static", fileName);
        
        file.mv(filePath);

        
        return fileName;
    }

    delete(fileName: string) {
        const filePath = path.resolve('static', fileName);
        fs.unlinkSync(filePath);
    }
}

export default new FileService();