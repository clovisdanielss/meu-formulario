import React from "react";
import ReactTooltip from "react-tooltip";

const Tooltips = () => {
  return [
    { id: "addquestion", text: "Adicionar Pergunta" },
    { id: "rmvquestion", text: "Remover Pergunta" },
    { id: "addtextarea", text: "Adicionar Textarea" },
    { id: "addcheckbox", text: "Adicionar Checkbox" },
    { id: "addfile", text: "Adicionar Opção de Upload" },
    { id: "adddate", text: "Adicionar Campo Data" },
    { id: "addradiobox", text: "Adicionar Radiobox" },
    { id: "mandatory", text: "Marcar/Desmarcar Obrigatório" },
    { id: "save", text: "Salvar Formulário" },
    {
      id: "questiondescription",
      text: "Clique na questão para selecionar",
    },
    { id: "listselector", text: "Selecione a lista do quadro escolhido" },
    { id: "trelloselector", text: "Selecione o quadro trello a ser usado" },
    { id: "titledescription", text: "Coloque aqui o título do formulário" },
  ].map((tooltip, index) => (
    <ReactTooltip key={index} id={tooltip.id} place="top" effect="solid">
      {tooltip.text}
    </ReactTooltip>
  ));
};

export default Tooltips;
