/*
  Warnings:

  - You are about to drop the column `precoAvista` on the `Anuncio` table. All the data in the column will be lost.
  - You are about to drop the column `precoPrazo` on the `Anuncio` table. All the data in the column will be lost.
  - Added the required column `avista` to the `Anuncio` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Anuncio" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "modelo" TEXT NOT NULL,
    "ano" TEXT NOT NULL,
    "km" TEXT NOT NULL,
    "cor" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "combustivel" TEXT NOT NULL,
    "motor" TEXT NOT NULL,
    "avista" TEXT NOT NULL,
    "aprazo" TEXT,
    "parcelas" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pendente',
    "likes" INTEGER NOT NULL DEFAULT 0,
    "views" INTEGER NOT NULL DEFAULT 0,
    "mensagens" INTEGER NOT NULL DEFAULT 0,
    "dataCriacao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuarioId" INTEGER NOT NULL,
    CONSTRAINT "Anuncio_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Anuncio" ("ano", "cidade", "combustivel", "cor", "dataCriacao", "id", "km", "modelo", "motor", "parcelas", "status", "usuarioId") SELECT "ano", "cidade", "combustivel", "cor", "dataCriacao", "id", "km", "modelo", "motor", "parcelas", "status", "usuarioId" FROM "Anuncio";
DROP TABLE "Anuncio";
ALTER TABLE "new_Anuncio" RENAME TO "Anuncio";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
