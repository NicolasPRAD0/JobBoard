const bcrypt = require('bcrypt')

const generateHash = async (password) =>{
    const hash = await bcrypt.hash(password,10)
    return hash
}


const compareHash = async(password,hasedPassword)=>{
    return await bcrypt.compare(password,hasedPassword)
}



module.exports = {
    generateHash,
    compareHash,

}