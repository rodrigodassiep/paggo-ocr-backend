/*
  Warnings:

  - You are about to drop the column `imageId` on the `Result` table. All the data in the column will be lost.
  - You are about to drop the column `imageSource` on the `Result` table. All the data in the column will be lost.
  - Added the required column `content` to the `Result` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Result` table without a default value. This is not possible if the table is not empty.
  - Added the required column `summary` to the `Result` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Result" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "image" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "authorId" INTEGER,
    CONSTRAINT "Result_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Result" ("id") SELECT "id" FROM "Result";
DROP TABLE "Result";
ALTER TABLE "new_Result" RENAME TO "Result";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
