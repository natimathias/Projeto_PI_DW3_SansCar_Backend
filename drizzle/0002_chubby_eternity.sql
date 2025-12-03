CREATE TYPE "public"."status_locacao" AS ENUM('ativa', 'finalizada', 'cancelada');--> statement-breakpoint
ALTER TABLE "locacao" ADD COLUMN "status_locacao" "status_locacao" NOT NULL;