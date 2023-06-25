import multer from 'multer'

const fileStorage = multer.diskStorage({
    destination: async (req, file, cb) => { 

        //const directoryPath = await makeDirectory(UPC_ID)
        cb(null,`images/user-image`)
    },
    filename: (req, file, cb) => { 
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix+file.originalname);
        //cb(null, `productImageMulter-${UPC_ID}.${filemimeType}`);
    }
})

const fileFilter = (req:any,file:any,cb:any) => {
    if (!file.originalname.match(/\.(jpg|png|gif|jpeg)$/)){
        return cb(null, false) //reject
    }
    cb(null,true)//accept
}

export const upload = multer({
    storage:fileStorage,
    fileFilter,
}).single('image')
