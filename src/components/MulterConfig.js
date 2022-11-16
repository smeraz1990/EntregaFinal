import multer from 'multer'
function subirAvatar(){
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'avatars')
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname)
        }
    })
    const upload = multer({ storage })
    return upload
}
function subirImgProduct(){
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'productsImg')
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname)
        }
    })
    const upload = multer({ storage })
    return upload
}

export default {subirAvatar,subirImgProduct}