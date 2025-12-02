import { pgTable, uuid, text, numeric, varchar, integer, pgEnum, timestamp } from "drizzle-orm/pg-core";

export const statusCarrosEnum = pgEnum('status_carro', ['disponivel', 'alugado', 'manutencao']);
export const statusPagamentoEnum = pgEnum('status_pagamento', ['pendente', 'confirmado', 'cancelado']);
export const statusMultaEnum = pgEnum('status_multa', ['pendente', 'pago']);
export const tipoCartaoEnum = pgEnum('tipo_cartao', ['crédito', 'debito']);

export const Cliente = pgTable('cliente', {
  id_cliente: uuid('id_cliente').defaultRandom().primaryKey(),
  nome: text('nome').notNull(),
  cpf: varchar('cpf', {length: 14}).notNull(),
  telefone: varchar('telefone', {length: 15}).notNull(),
  endereco: text('endereco').notNull(),
  email: text("email").notNull(),
  senha: text("senha").notNull(),
});

export const CategoriaCarro = pgTable('categoria_carro', {
  id_categoria: uuid('id_categoria').defaultRandom().primaryKey(),
  nome_categoria: text('nome_categoria').notNull(),
  valor_diaria: numeric('valor_diaria', {precision: 10, scale: 2}).notNull(),
});

export const Carros = pgTable('carros', {
  id_carro: uuid('id_carro').defaultRandom().primaryKey(),
  id_categoria: uuid('id_categoria').references(() => CategoriaCarro.id_categoria).notNull(),
  imagem_carro: text('imagem_carro'),
  placa: varchar('placa', {length: 8}).notNull(),
  modelo: text('modelo').notNull(),
  ano: integer('ano').notNull(),
  cor: text('cor').notNull(),
  status: statusCarrosEnum('status').notNull(),
  quilometragem_atual: integer('quilometragem_atual').default(0).notNull(),
});

export const Funcionario = pgTable('funcionario', {
  id_funcionario: uuid('id_funcionario').defaultRandom().primaryKey(),
  nome: text('nome').notNull(),
  cpf: varchar('cpf', {length: 14}).notNull(),
  cargo: text('cargo').notNull(),
  login: text("login").notNull(),
  senha: text("senha").notNull(),
});

export const FormasPagamento = pgTable('formas_pagamento', {
  id_forma_pagamento: uuid('id_forma_pagamento').defaultRandom().primaryKey(),
  tipo_pagamento: text('tipo_pagamento').notNull(),

  numero_cartao: varchar('numero_cartao', { length: 16 }),
  nome_titular: text('nome_titular'),
  validade: varchar('validade', { length: 5 }), 
  cvv: varchar('cvv', { length: 3 }),
  tipo_cartao: tipoCartaoEnum('tipo_cartao'), 

  pix_chave: text('pix_chave'),

  codigo_boleto: text('codigo_boleto'),
});

export const Locacao = pgTable('locacao', {
    id_locacao: uuid('id_locacao').defaultRandom().primaryKey(),
    id_funcionario: uuid('id_funcionario').references(() => Funcionario.id_funcionario).notNull(),
    id_carro: uuid('id_carro').references(() => Carros.id_carro).notNull(),
    id_cliente: uuid('id_cliente').references(() => Cliente.id_cliente).notNull(),
    data_retirada: timestamp('data_retirada').notNull(),
    data_devolucao_prevista: timestamp('data_devolucao_prevista').notNull(),
    data_devolucao_real: timestamp('data_devolucao_real'),
    valor_unitario: numeric('valor_unitario', {precision: 10, scale: 2}).notNull(),
    quilometragem_atual: integer('quilometragem_atual').notNull(),
    quilometragem_devolucao: integer('quilometragem_devolucao'),
    descricao: text('descricao'),
});

export const Pagamento = pgTable('pagamento', {
    id_pagamento: uuid('id_pagamento').defaultRandom().primaryKey(),
    id_locacao: uuid('id_locacao').references(() => Locacao.id_locacao).notNull(),
    id_forma_pagamento: uuid('id_forma_pagamento').references(() => FormasPagamento.id_forma_pagamento).notNull(),
    valor: numeric('valor', {precision: 10, scale: 2}).notNull(),
    status: statusPagamentoEnum('status').notNull(),
});

export const Multa = pgTable('multa', {
    id_multa: uuid('id_multa').defaultRandom().primaryKey(),
    id_locacao: uuid('id_locacao').references(() => Locacao.id_locacao).notNull(),
    descricao: text('descricao').notNull(),
    valor: numeric('valor', {precision: 10, scale: 2}).notNull(),
    status: statusMultaEnum('status').notNull(),
});