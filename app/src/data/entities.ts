import type { EntityConfig } from "./types";

const entities: EntityConfig[] = [
  {
    key: "eventos",
    title: "Eventos",
    description: "Gestão de eventos académicos e respetivos dados principais.",
    endpoint: "/eventos",
    fields: [
      { key: "nome", label: "Nome", type: "text", required: true },
      {
        key: "data_inicio",
        label: "Data Início",
        type: "date",
        required: true,
      },
      { key: "data_fim", label: "Data Fim", type: "date", required: true },
      { key: "local", label: "Local", type: "text", required: true },
      { key: "cidade", label: "Cidade", type: "text", required: true },
      {
        key: "capacidade",
        label: "Capacidade",
        type: "number",
        required: true,
      },
      {
        key: "status",
        label: "Status",
        type: "select",
        options: [
          { label: "Planeado", value: "planeado" },
          { label: "Ativo", value: "ativo" },
          { label: "Encerrado", value: "encerrado" },
          { label: "Cancelado", value: "cancelado" },
        ],
        required: true,
      },
      {
        key: "preco_inscricao",
        label: "Preço Inscrição",
        type: "number",
        required: true,
      },
    ],
  },
  {
    key: "participantes",
    title: "Participantes",
    description: "Controlo dos participantes inscritos nos eventos.",
    endpoint: "/participantes",
    fields: [
      { key: "nome", label: "Nome", type: "text", required: true },
      { key: "email", label: "Email", type: "email", required: true },
      { key: "telefone", label: "Telefone", type: "text", required: true },
    ],
  },
  {
    key: "oradores",
    title: "Oradores",
    description: "Cadastro e especialidades dos oradores.",
    endpoint: "/oradores",
    fields: [
      { key: "nome", label: "Nome", type: "text", required: true },
      {
        key: "especialidade",
        label: "Especialidade",
        type: "text",
        required: true,
      },
      { key: "email", label: "Email", type: "email", required: true },
      { key: "telefone", label: "Telefone", type: "text", required: true },
    ],
  },
  {
    key: "sessoes",
    title: "Sessões",
    description: "Agenda de sessões associadas a eventos e oradores.",
    endpoint: "/sessoes",
    fields: [
      { key: "titulo", label: "Título", type: "text", required: true },
      {
        key: "data_hora",
        label: "Data/Hora",
        type: "datetime",
        required: true,
      },
      { key: "id_evento", label: "ID Evento", type: "number", required: true },
      { key: "id_orador", label: "ID Orador", type: "number", required: true },
    ],
  },
  {
    key: "inscricoes",
    title: "Inscrições",
    description: "Registo de inscrições e estados de pagamento.",
    endpoint: "/inscricoes",
    fields: [
      {
        key: "id_participante",
        label: "ID Participante",
        type: "number",
        required: true,
      },
      { key: "id_evento", label: "ID Evento", type: "number", required: true },
      {
        key: "data_inscricao",
        label: "Data Inscrição",
        type: "date",
        required: true,
      },
      {
        key: "status_pagamento",
        label: "Status Pagamento",
        type: "select",
        required: true,
        options: [
          { label: "Pendente", value: "pendente" },
          { label: "Pago", value: "pago" },
          { label: "Cancelado", value: "cancelado" },
        ],
      },
    ],
  },
];

export default entities;
