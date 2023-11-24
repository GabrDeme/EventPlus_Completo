import React from "react";
import "./TableE.css";

import editPen from '../../../assets/images/edit-pen.svg'
import trashDelete from '../../../assets/images/trash-delete.svg'

const TableE = ({dados, fnDelete = null, fnUpdate = null}) => {
  return (
    <table className = "table-data">
        {/* cabeçalho */}
      <thead className="table-data__head">
        <tr className="table-data__head-row">
          <th className="table-data__head-title table-data__head-title--big">
            Evento
          </th>
          <th className="table-data__head-title table-data__head-title--big">
            Descrição
          </th>
          <th className="table-data__head-title table-data__head-title--big">
            Tipo Evento
          </th>
          <th className="table-data__head-title table-data__head-title--big">
            Data
          </th>
          <th className="table-data__head-title table-data__head-title--little">
            Editar
          </th>
          <th className="table-data__head-title table-data__head-title--little">
            Deletar
          </th>
        </tr>
      </thead>

        {/* corpo */}
      <tbody>
        {dados.map((ev) => {
          return(
            <tr className="table-data__head-row">
            <td className="table-data__data table-data__data--big">
            {/* idevento ={ev.idEvento} */}
              {ev.nomeEvento}
            </td>

            <td className="table-data__data table-data__data--big">
            {/* idevento ={ev.idEvento} */}
              {ev.descricao}
            </td>

            <td className="table-data__data table-data__data--big">
              
              {ev.tiposEvento.titulo}
            </td>

            <td className="table-data__data table-data__data--big">
            {/* idevento ={ev.idEvento} */}
              {new Date(ev.dataEvento).toLocaleDateString()}
            </td>
  

            <td className="table-data__data table-data__data--little">
              <img 
              className="table-data__icon" 
              src={editPen} alt=""
              onClick={(e) => {
                fnUpdate(ev.idEvento)
              }} 
              />
            </td>
  
            <td className="table-data__data table-data__data--little">
              <img 
                className="table-data__icon" 
                src={trashDelete} alt="" 
                onClick={(e) => {
                  fnDelete(ev.idEvento)
                }}
              />
            </td>
          </tr>
          );
        })}
     
      </tbody>
    </table>
  );
};

export default TableE;
