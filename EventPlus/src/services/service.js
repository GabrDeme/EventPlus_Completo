import axios from "axios";


/**
 * Rota para o recurso Evento
 */
export const eventsResource = '/Evento';

/**
 * Rota para o recurso Próximos Eventos
 */
export const nextEventResource = '/Evento/ListarProximos';
/**
 * Rota para o recurso Ultimos Eventos
 */
export const lastEventResource = '/Evento/ListarUltimos';
/**
 * Rota para o recurso Tipos de Eventos
 */
export const eventsTypeResource = '/TiposEvento'
/**
 * Rota para o recurso Meus de Eventos
 */
export const myEventsResource = 'Presencas/ListarMinhas';
/**
 * Rota para o recurso Presenças de Eventos
 */
export const presencesEventResource = 'Presencas/ListarMinhas';
/**
 * Rota para o recurso Comentario de Eventos
 */
export const commentsResource = '/ComentariosEvento/BuscarPorIdUsuario';



export const loginResource = '/Login'

const portAPI = "7118";
const localApiUrl = `https://localhost:${portAPI}/api`;
const externalApiUrl = null;

const api = axios.create({
    baseURL: localApiUrl
});

export default api;