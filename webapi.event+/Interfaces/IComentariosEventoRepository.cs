﻿using webapi.event_.Domains;

namespace webapi.event_.Interfaces
{
    public interface IComentariosEventoRepository
    {
        void Cadastrar(ComentariosEvento comentarioEvento);
        void Deletar(Guid id);
        List<ComentariosEvento> Listar(Guid id);
        List<ComentariosEvento> ListarSomenteExibe(Guid id);
        ComentariosEvento BuscarPorId(Guid id);
    }
}
