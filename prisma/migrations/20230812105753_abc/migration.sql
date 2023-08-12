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
    "workspace_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" STRING NOT NULL DEFAULT 'My Workspace',
    "username" STRING NOT NULL,
    "class" INT4,
    "section" STRING,
    "group" STRING,
    "roll_start" INT4,
    "roll_end" INT4,
    "total" INT4,
    "year" INT4,
    "default" BOOL NOT NULL DEFAULT false,
    "description" STRING,

    CONSTRAINT "workspace_pkey" PRIMARY KEY ("workspace_id")
);

-- CreateTable
CREATE TABLE "pdf" (
    "form_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "workspace_id" STRING NOT NULL,
    "url" STRING NOT NULL,

    CONSTRAINT "pdf_pkey" PRIMARY KEY ("form_id")
);

-- CreateTable
CREATE TABLE "division" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" STRING NOT NULL,

    CONSTRAINT "division_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "district" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" STRING NOT NULL,
    "division_id" UUID NOT NULL,

    CONSTRAINT "district_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admin_eiin_key" ON "admin"("eiin");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- AddForeignKey
ALTER TABLE "district" ADD CONSTRAINT "district_division_id_fkey" FOREIGN KEY ("division_id") REFERENCES "division"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
