CREATE TYPE "public"."tipo_cartao" AS ENUM('crédito', 'debito');--> statement-breakpoint
ALTER TABLE "formas_pagamento" ADD COLUMN "tipo_pagamento" text NOT NULL;--> statement-breakpoint
ALTER TABLE "formas_pagamento" ADD COLUMN "numero_cartao" varchar(16);--> statement-breakpoint
ALTER TABLE "formas_pagamento" ADD COLUMN "nome_titular" text;--> statement-breakpoint
ALTER TABLE "formas_pagamento" ADD COLUMN "validade" varchar(5);--> statement-breakpoint
ALTER TABLE "formas_pagamento" ADD COLUMN "cvv" varchar(3);--> statement-breakpoint
ALTER TABLE "formas_pagamento" ADD COLUMN "tipo_cartao" "tipo_cartao";--> statement-breakpoint
ALTER TABLE "formas_pagamento" ADD COLUMN "pix_chave" text;--> statement-breakpoint
ALTER TABLE "formas_pagamento" ADD COLUMN "codigo_boleto" text;--> statement-breakpoint
ALTER TABLE "formas_pagamento" DROP COLUMN "cartao";--> statement-breakpoint
ALTER TABLE "formas_pagamento" DROP COLUMN "pix";--> statement-breakpoint
ALTER TABLE "formas_pagamento" DROP COLUMN "boleto";