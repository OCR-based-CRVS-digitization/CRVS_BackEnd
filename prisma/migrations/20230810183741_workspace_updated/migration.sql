/*
  Warnings:

  - You are about to drop the column `id` on the `workspace` table. All the data in the column will be lost.
  - Added the required column `username` to the `workspace` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
CREATE TABLE "_prisma_new_workspace" (
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
INSERT INTO "_prisma_new_workspace" ("class","default","description","group","name","roll_end","roll_start","section","total","year") SELECT "class","default","description","group","name","roll_end","roll_start","section","total","year" FROM "workspace";
DROP TABLE "workspace" CASCADE;
ALTER TABLE "_prisma_new_workspace" RENAME TO "workspace";
