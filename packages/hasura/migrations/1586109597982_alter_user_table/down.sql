

ALTER TABLE "public"."user" ALTER COLUMN "username" SET NOT NULL;

ALTER TABLE "public"."user" DROP COLUMN "picture";
ALTER TABLE "public"."user" DROP COLUMN "auth_id";
ALTER TABLE "public"."user" DROP COLUMN "last_login";
ALTER TABLE "public"."user" ADD COLUMN "password" text;
ALTER TABLE "public"."user" ALTER COLUMN "password" DROP NOT NULL;