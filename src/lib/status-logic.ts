
import { ServiceItem } from './service-types';

export const STATUS_ORDER = [
    "Dispositivo recibido",
    "Dispositivo en revision",
    "Enviar diagnostico",
    "Refacciones en camino",
    "Inicia reparación",
    "Enviar código de seguridad",
    "Dispositivo entregado"
];

export type VariantState = "Base" | "active" | "check" | "no_state" | "hidden";

export const getStepVariant = (currentStatus: string | null | undefined, stepIndex: number): VariantState => {
    if (!currentStatus) return "Base";

    let status = currentStatus;
    if (status === "Dispositivo entregado sin reparar") {
        status = "Dispositivo entregado";
    }

    const currentIndex = STATUS_ORDER.indexOf(status);
    const targetIndex = stepIndex - 1;

    // Step 4 "Refacciones en camino" Special Logic
    if (stepIndex === 4) {
        return currentIndex === targetIndex ? "active" : "hidden";
    }

    if (currentIndex === -1) return "Base";

    if (currentIndex === targetIndex) return "active";
    if (currentIndex > targetIndex) return "check";
    return "Base";
};


export const getStatusMessage = (currentStatus: string | null | undefined, stepIndex: number, price?: string | number): string => {
    const variant = getStepVariant(currentStatus, stepIndex);
    if (variant !== 'active') return "";

    switch (stepIndex) {
        case 1: return "Hemos recibido tu dispositivo y empezaremos la revisión tan pronto como sea posible.";
        case 2: return "Nuestros técnicos están diagnosticando tu dispositivo para encontrar la falla.";
        case 3:
            const formattedPrice = price ? `$${Number(price).toLocaleString('es-MX', { minimumFractionDigits: 2 })}` : '(Pendiente)';
            return `Tu diagnóstico está listo. El costo total es de ${formattedPrice}. Por favor revísalo y autoriza la reparación.`;
        case 4: return "Estamos esperando las refacciones necesarias para reparar tu equipo.";
        case 5: return "La reparación está en curso. Te notificaremos cuando termine.";
        case 6: return "¡Tu dispositivo está listo! Puedes pasar a recogerlo en nuestros horarios de atención.";
        case 7: return "Gracias por confiar en nosotros. Tu dispositivo ha sido entregado.";
        default: return "";
    }
};


interface AlertConfig {
    show: boolean;
    message: string;
}

export const getAlertConfig = (service: ServiceItem, stepIndex: number): AlertConfig => {
    const variant = getStepVariant(service.status, stepIndex);
    // Alerts only show on active steps
    if (variant !== 'active') return { show: false, message: "" };

    const creationDate = new Date(service.date);
    const lastUpdated = new Date(service.last_updated_at);
    const now = new Date();

    // Scenario 1: Service added after 16:00 (4 PM) - Warn about next day revision (Step 1 or 2)
    if (stepIndex === 1 || stepIndex === 2) {
        const hour = creationDate.getHours();
        if (hour >= 16) {
            return {
                show: true,
                message: "Tu dispositivo fue recibido después de las 4:00 PM. La revisión podría iniciar hasta el día siguiente hábil."
            };
        }
    }

    // Scenario 2: Step 6 (Ready/Collection) updated after 18:00 (6 PM) - Warn about closing
    if (stepIndex === 6) {
        const hour = lastUpdated.getHours();
        if (hour >= 18) {
            return {
                show: true,
                message: "Tu dispositivo estuvo listo después de las 6:00 PM. Podríamos haber cerrado, por favor verifica antes de venir."
            };
        }
    }

    // Scenario 3: More than a month in Step 6 (Ready)
    if (stepIndex === 6) {
        const diffTime = Math.abs(now.getTime() - lastUpdated.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays > 30) {
            return {
                show: true,
                message: "Tu dispositivo lleva más de 30 días listo. Podrían aplicar cargos de almacenamiento."
            };
        }
    }

    return { show: false, message: "" };
};
