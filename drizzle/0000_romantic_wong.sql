CREATE TYPE "public"."status_carro" AS ENUM('disponivel', 'alugado', 'manutencao');--> statement-breakpoint
CREATE TYPE "public"."status_multa" AS ENUM('pendente', 'pago');--> statement-breakpoint
CREATE TYPE "public"."status_pagamento" AS ENUM('pendente', 'confirmado', 'cancelado');--> statement-breakpoint
CREATE TABLE "carros" (
	"id_carro" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"id_categoria" uuid NOT NULL,
	"imagem_carro" text,
	"placa" varchar(8) NOT NULL,
	"modelo" text NOT NULL,
	"ano" integer NOT NULL,
	"cor" text NOT NULL,
	"status" "status_carro" NOT NULL,
	"quilometragem_atual" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "categoria_carro" (
	"id_categoria" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nome_categoria" text NOT NULL,
	"valor_diaria" numeric(10, 2) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "cliente" (
	"id_cliente" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nome" text NOT NULL,
	"cpf" varchar(14) NOT NULL,
	"telefone" varchar(15) NOT NULL,
	"endereco" text NOT NULL,
	"email" text NOT NULL,
	"senha" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "formas_pagamento" (
	"id_forma_pagamento" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"cartao" varchar(16),
	"pix" varchar(50),
	"boleto" varchar(50)
);
--> statement-breakpoint
CREATE TABLE "funcionario" (
	"id_funcionario" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nome" text NOT NULL,
	"cpf" varchar(14) NOT NULL,
	"cargo" text NOT NULL,
	"login" text NOT NULL,
	"senha" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "locacao" (
	"id_locacao" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"id_funcionario" uuid NOT NULL,
	"id_carro" uuid NOT NULL,
	"id_cliente" uuid NOT NULL,
	"data_retirada" timestamp NOT NULL,
	"data_devolucao_prevista" timestamp NOT NULL,
	"data_devolucao_real" timestamp,
	"valor_unitario" numeric(10, 2) NOT NULL,
	"quilometragem_atual" integer NOT NULL,
	"quilometragem_devolucao" integer,
	"descricao" text
);
--> statement-breakpoint
CREATE TABLE "multa" (
	"id_multa" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"id_locacao" uuid NOT NULL,
	"descricao" text NOT NULL,
	"valor" numeric(10, 2) NOT NULL,
	"status" "status_multa" NOT NULL
);
--> statement-breakpoint
CREATE TABLE "pagamento" (
	"id_pagamento" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"id_locacao" uuid NOT NULL,
	"id_forma_pagamento" uuid NOT NULL,
	"valor" numeric(10, 2) NOT NULL,
	"status" "status_pagamento" NOT NULL
);
--> statement-breakpoint
ALTER TABLE "carros" ADD CONSTRAINT "carros_id_categoria_categoria_carro_id_categoria_fk" FOREIGN KEY ("id_categoria") REFERENCES "public"."categoria_carro"("id_categoria") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "locacao" ADD CONSTRAINT "locacao_id_funcionario_funcionario_id_funcionario_fk" FOREIGN KEY ("id_funcionario") REFERENCES "public"."funcionario"("id_funcionario") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "locacao" ADD CONSTRAINT "locacao_id_carro_carros_id_carro_fk" FOREIGN KEY ("id_carro") REFERENCES "public"."carros"("id_carro") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "locacao" ADD CONSTRAINT "locacao_id_cliente_cliente_id_cliente_fk" FOREIGN KEY ("id_cliente") REFERENCES "public"."cliente"("id_cliente") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "multa" ADD CONSTRAINT "multa_id_locacao_locacao_id_locacao_fk" FOREIGN KEY ("id_locacao") REFERENCES "public"."locacao"("id_locacao") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pagamento" ADD CONSTRAINT "pagamento_id_locacao_locacao_id_locacao_fk" FOREIGN KEY ("id_locacao") REFERENCES "public"."locacao"("id_locacao") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pagamento" ADD CONSTRAINT "pagamento_id_forma_pagamento_formas_pagamento_id_forma_pagamento_fk" FOREIGN KEY ("id_forma_pagamento") REFERENCES "public"."formas_pagamento"("id_forma_pagamento") ON DELETE no action ON UPDATE no action;