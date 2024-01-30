export const ENUM_MENU = {
  ERP_GESTAO: "ERP_GESTAO",
  ERP_GESTAO_EMPRESA: "ERP_GESTAO_EMPRESA",
  ERP_GESTAO_EMPRESA_MATRIZ: "ERP_GESTAO_EMPRESA_MATRIZ",
  ERP_GESTAO_EMPRESA_MATRIZ_EDIT: "ERP_GESTAO_EMPRESA_MATRIZ_EDIT",
  ERP_GESTAO_EMPRESA_AREAS: "ERP_GESTAO_EMPRESA_AREAS",
  ERP_GESTAO_EMPRESA_AREAS_ADD: "ERP_GESTAO_EMPRESA_AREAS_ADD",
  ERP_GESTAO_EMPRESA_AREAS_EDIT: "ERP_GESTAO_EMPRESA_AREAS_EDIT",
  ERP_GESTAO_EMPRESA_AREAS_DELETE: "ERP_GESTAO_EMPRESA_AREAS_DELETE",
  ERP_GESTAO_EMPRESA_STATUS: "ERP_GESTAO_EMPRESA_STATUS",
  ERP_GESTAO_EMPRESA_STATUS_ADD: "ERP_GESTAO_EMPRESA_STATUS_ADD",
  ERP_GESTAO_EMPRESA_STATUS_EDIT: "ERP_GESTAO_EMPRESA_STATUS_EDIT",
  ERP_GESTAO_EMPRESA_STATUS_DELETE: "ERP_GESTAO_EMPRESA_STATUS_DELETE",
  ERP_GESTAO_RH: "ERP_GESTAO_RH",
  ERP_GESTAO_RH_COLABORADORES: "ERP_GESTAO_RH_COLABORADORES",
  ERP_GESTAO_RH_COLABORADORES_ADD: "ERP_GESTAO_RH_COLABORADORES_ADD",
  ERP_GESTAO_RH_COLABORADORES_EDIT: "ERP_GESTAO_RH_COLABORADORES_EDIT",
  ERP_GESTAO_RH_COLABORADORES_DELETE: "ERP_GESTAO_RH_COLABORADORES_DELETE",
  ERP_GESTAO_RH_PERFIL: "ERP_GESTAO_RH_PERFIL",
  ERP_GESTAO_RH_PERFIL_ADD: "ERP_GESTAO_RH_PERFIL_ADD",
  ERP_GESTAO_RH_PERFIL_EDIT: "ERP_GESTAO_RH_PERFIL_EDIT",
  ERP_GESTAO_RH_PERFIL_DELETE: "ERP_GESTAO_RH_PERFIL_DELETE",
  ERP_GESTAO_PRODUTO: "ERP_GESTAO_PRODUTO",
  ERP_GESTAO_PRODUTO_EQUIPAMENTOS: "ERP_GESTAO_PRODUTO_EQUIPAMENTOS",
  ERP_GESTAO_PRODUTO_EQUIPAMENTOS_ADD: "ERP_GESTAO_PRODUTO_EQUIPAMENTOS_ADD",
  ERP_GESTAO_PRODUTO_EQUIPAMENTOS_EDIT: "ERP_GESTAO_PRODUTO_EQUIPAMENTOS_EDIT",
  ERP_GESTAO_PRODUTO_EQUIPAMENTOS_DELETE:
    "ERP_GESTAO_PRODUTO_EQUIPAMENTOS_DELETE",
  ERP_GESTAO_PRODUTO_TIPOS_EQUIPAMENTOS:
    "ERP_GESTAO_PRODUTO_TIPOS_EQUIPAMENTOS",
  ERP_GESTAO_PRODUTO_TIPOS_EQUIPAMENTOS_ADD:
    "ERP_GESTAO_PRODUTO_TIPOS_EQUIPAMENTOS_ADD",
  ERP_GESTAO_PRODUTO_TIPOS_EQUIPAMENTOS_EDIT:
    "ERP_GESTAO_PRODUTO_TIPOS_EQUIPAMENTOS_EDIT",
  ERP_GESTAO_PRODUTO_TIPOS_EQUIPAMENTOS_DELETE:
    "ERP_GESTAO_PRODUTO_TIPOS_EQUIPAMENTOS_DELETE",
  ERP_GESTAO_CLIENTES: "ERP_GESTAO_CLIENTES",
  ERP_GESTAO_CLIENTES_CADASTRADOS: "ERP_GESTAO_CLIENTES_CADASTRADOS",
  ERP_GESTAO_CLIENTES_CADASTRADOS_ADD: "ERP_GESTAO_CLIENTES_CADASTRADOS_ADD",
  ERP_GESTAO_CLIENTES_CADASTRADOS_EDIT: "ERP_GESTAO_CLIENTES_CADASTRADOS_EDIT",
  ERP_GESTAO_CLIENTES_CADASTRADOS_DELETE:
    "ERP_GESTAO_CLIENTES_CADASTRADOS_DELETE",
  ERP_GESTAO_CLIENTES_EQUIPAMENTOS: "ERP_GESTAO_CLIENTES_EQUIPAMENTOS",
  ERP_GESTAO_CLIENTES_EQUIPAMENTOS_ADD: "ERP_GESTAO_CLIENTES_EQUIPAMENTOS_ADD",
  ERP_GESTAO_CLIENTES_EQUIPAMENTOS_EDIT:
    "ERP_GESTAO_CLIENTES_EQUIPAMENTOS_EDIT",
  ERP_GESTAO_CLIENTES_EQUIPAMENTOS_DELETE:
    "ERP_GESTAO_CLIENTES_EQUIPAMENTOS_DELETE",
  ERP_GESTAO_FINANCEIRO: "ERP_GESTAO_FINANCEIRO",
  ERP_GESTAO_FINANCEIRO_TIPO_SOLICITACOES:
    "ERP_GESTAO_FINANCEIRO_TIPO_SOLICITACOES",
  ERP_GESTAO_FINANCEIRO_TIPO_SOLICITACOES_ADD:
    "ERP_GESTAO_FINANCEIRO_TIPO_SOLICITACOES_ADD",
  ERP_GESTAO_FINANCEIRO_TIPO_SOLICITACOES_EDIT:
    "ERP_GESTAO_FINANCEIRO_TIPO_SOLICITACOES_EDIT",
  ERP_GESTAO_FINANCEIRO_TIPO_SOLICITACOES_DELETE:
    "ERP_GESTAO_FINANCEIRO_TIPO_SOLICITACOES_DELETE",
};

export const ENUM_USAGE_STATUS = {
  DEFAULT: 'DEFAULT',
  COLABORADOR: 'COLABORADOR',
  PROJETOS: 'PROJETOS',
  CLIENTES: 'CLIENTES',
  EQUIPAMENTO_PROJETO: 'EQUIPAMENTO_PROJETO',
  FINANCIAL_REQUEST: 'FINANCIAL_REQUEST',
};

export const ENUM_STATUS = {
  ATIVO: 1,
  INATIVO: 2,
  COMISSIONAMENTO_A_COMISSIONAR: 3,
  COMISSIONAMENTO_EM_COMISSIONAMENTO: 4,
  COMISSIONAMENTO_COMISSIONADO: 5,
  COMISSIONAMENTO_CANCELADO: 15,
  CHAMADO_FINANCEIRO_NOVO: 6,
  CHAMADO_FINANCEIRO_AGUARDANDO_RESPOSTA: 7,
  CHAMADO_FINANCEIRO_EM_TRATAMENTO: 8,
  CHAMADO_FINANCEIRO_CONCLUIDO: 9,
  CHAMADO_FINANCEIRO_CANCELADO: 10,
  FATURAS_EM_ABERTO: 11,
  FATURAS_COMPENSADA: 12,
  FATURAS_CANCELADAS: 13,
  FATURAS_EM_ATRASO: 14,
  COLABORADOR_EM_ADMISSAO: 16,
  COLABORADOR_EM_EXPERIENCIA: 17,
  ORCAMENTO_EM_CONTRUCAO: 18,
  ORCAMENTO_FINALIZADO: 19,
  ORCAMENTO_EM_ANALISE: 20,
  ORCAMENTO_CANCELADO: 21,
  ORCAMENTO_APROVADO: 22,
  ORCAMENTO_REPROVADO: 23,
};


export const ENUM_CURRENCY = {
  EUR: "EUR",
  BRL: "BRL",
  USD: "USD",
};

export const ENUM_MENU_APPLICATION = {
  WEB: 1,
  APP_COMMISSIONING: 2,
  APP_SELLER: 3,
};

export const ENUM_QUESTION_TYPE = {
  ATENDIMENTO: 1,
  ANALI_TEC: 2,
  COMISSIONAMENTO: 3,
};

export const ENUM_STATUS_SAC = {
  ABERTO: 100,
  CONCLUIDO: 101,
  CANCELADO: 102,

  STE_AGUARDANDO_RESPOSTA: 103,
  STE_AGUARDANDO_CLIENTE: 104,

  RMA_AGUARDANDO_ENVIO: 201,
  RMA_EM_TRANSPORTE_PARA_CENTRO_DE_REPAROS: 202,
  RMA_RECEBIDO_CENTRAL: 203,
  RMA_EQUIPAMENTO_EM_ANALISE_TECNICA: 204,
  RMA_AGUARDANDO_PROPOSTA: 205,
  RMA_PROPOSTA_ENVIADA: 206,
  RMA_PROPOSTA_RESPONDIDA: 207,
  RMA_AGUARDANDO_RESOLUCAO: 208,
  RMA_AGUARDANDO_EMISSAO_DE_NOTA_DE_ENVIO: 209,
  RMA_AGUARDANDO_DEVOLUCAO: 210,
  RMA_CONCLUIDO: 211,
  RMA_CANCELADO: 212,
};