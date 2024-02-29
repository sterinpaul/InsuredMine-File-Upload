import multer, { diskStorage } from 'multer';

const Storage = diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        cb(null, `file-${Date.now()}-${file.originalname}`)
        // cb(null, file.originalname)
    }
});


export const uploads = multer({ storage: Storage }).single('file');