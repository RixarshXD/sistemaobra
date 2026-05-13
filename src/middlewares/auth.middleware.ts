import { Response, NextFunction } from 'express'
import { AuthRequest, ApiResponse } from '../types'
import { verifyToken } from '../utils/jwt'
import prisma from '../utils/prisma'
import { Role } from '../generated/prisma/client'


// verificar el token Jwt
// verificar si el token del req.user es valido
export const authenticate = async (
    req: AuthRequest,
    res: Response<ApiResponse>,
    next: NextFunction
): Promise<void> => {
    try {

        // el token viene en el header con formato Bearer
        const authHeader = req.headers.authorization

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({
                success: false,
                message: 'Token de autenticacion requerido'
            })
            return
        }

        // se extrae solo el token sin el "Bearer"
        const token = authHeader.split(' ')[1]

        // se decodifica el token
        const decoded = verifyToken(token)

        // verificar si el usuario existe
        const usuario = await prisma.usuario.findUnique({
            where: { id: decoded.userId },
            select: {
                id: true,
                email: true,
                role: true,
                nombre: true,
                activo: true
            }
        })


        if (!usuario || !usuario.activo) {
            res.status(401).json({
                success: false,
                message: 'Usuario no encontrado o inactivo'
            })
            return
        }

        // añadir el usuario al request para que los controllers lo usen
        req.user = {
            id: usuario.id,
            email: usuario.email,
            role: usuario.role,
            nombre: usuario.nombre
        }

        // el next le dice a express que el middleware terminó
        next()

    } catch (error) {
        res.status(401).json({
            success: false,
            message: 'token invalido o expirado'
        })
    }
}




// verificar roles 
// factory function
export const authorize = (...allowedRoles: Role[]) => {
    return (
        req: AuthRequest,
        res: Response<ApiResponse>,
        next: NextFunction
    ): void => {
        // pongo este middleware despues de la authenticacion porque el req.user ya existe
        if (!req.user) {
            res.status(401).json({
                success: false,
                message: 'No autenticado'
            })
            return
        }
        if (!allowedRoles.includes(req.user.role)) {
            res.status(403).json({
                success: false,
                // 403 forbiden porque el usuario está autenticado pero no permisos
                message: `Acceso denegado. Se requiere rol: ${allowedRoles.join(' o ')}`
            })
            return
        }
        next()
    }
}












