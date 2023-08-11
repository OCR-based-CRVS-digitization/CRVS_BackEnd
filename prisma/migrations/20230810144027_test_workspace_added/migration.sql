-- CreateTable
CREATE TABLE "admin" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "eiin" INT8 NOT NULL,
    "password" STRING NOT NULL,

    CONSTRAINT "admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "eiin" INT8 NOT NULL,
    "username" STRING NOT NULL,
    "password" STRING NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workspace" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "class" INT4 NOT NULL,
    "section" STRING NOT NULL,
    "group" STRING,
    "roll_start" INT4 NOT NULL,
    "roll_end" INT4 NOT NULL,
    "total" INT4 NOT NULL,
    "year" INT4 NOT NULL,
    "default" BOOL NOT NULL DEFAULT false,
    "description" STRING,

    CONSTRAINT "workspace_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admin_eiin_key" ON "admin"("eiin");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");
