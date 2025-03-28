import axios from "axios";

export const verifyCaptcha = async (req, res, next) => {
    const { captchaToken } = req.body;

    if (!captchaToken) {
        console.log("CaptchaToken no recibido");
        return res.status(400).json({ message: "Captcha requerido" });
    }

    try {
        console.log("🛠 Verificando captcha...");
        const response = await axios.post(`https://www.google.com/recaptcha/api/siteverify`, null, {
            params: {
                secret: process.env.RECAPTCHA_SECRET_KEY,
                response: captchaToken
            }
        });

        console.log("Respuesta de Google:", response.data);

        if (!response.data.success) {
            console.log("Captcha inválido:", response.data);
            return res.status(400).json({ message: "Captcha inválido" });
        }

        console.log("Captcha válido");
        next();
    } catch (error) {
        console.error("⚠ Error al verificar el captcha:", error);
        return res.status(500).json({ message: "Error al verificar el captcha" });
    }
};
