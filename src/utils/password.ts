import bcrypt from 'bcryptjs'

// agregar la salt para el hash de la pass
// entre 10-12 es el estandar para que sea "rapido"
// entre mas "salt" mas seguro pero tiende a ser mas lento

const SALT_ROUND = 10;


// hash pass
export const hashPassword = async (password: string): Promise<string> => {
    return bcrypt.hash(password, SALT_ROUND)
}


// comparar la pass con el hash 
export const comparePassword = async (
    password: string,
    hash: string
): Promise<boolean> => {
    return bcrypt.compare(password, hash)
}