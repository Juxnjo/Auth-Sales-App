import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ message: "Acceso denegado, token no proporcionado" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; 
        next();
    } catch (error) {
        return res.status(403).json({ message: "Token inválido o expirado" });
    }
};

export const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === "Administrador") {
        next();
    } else {
        return res.status(403).json({ message: "Acceso denegado, se requiere rol de Administrador" });
    }
};

export const isAdminOrAdvisor = (req, res, next) => {
    if (req.user && (req.user.role === "Administrador" || req.user.role === "Asesor")) {
        next();
    } else {
        return res.status(403).json({ message: "Acceso denegado, se requiere rol de Administrador o Asesor" });
    }
};
