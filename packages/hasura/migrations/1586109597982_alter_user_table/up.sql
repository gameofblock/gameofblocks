

ALTER TABLE "public"."user" DROP COLUMN "password" CASCADE;
ALTER TABLE "public"."user" ADD COLUMN "last_login" timestamptz NOT NULL DEFAULT now();
ALTER TABLE "public"."user" ADD COLUMN "auth_id" text NOT NULL UNIQUE;
ALTER TABLE "public"."user" ADD COLUMN "picture" text NULL;

ALTER TABLE "public"."user" ALTER COLUMN "username" DROP NOT NULL;