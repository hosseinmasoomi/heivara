-- CreateEnum
CREATE TYPE "RoastLevel" AS ENUM ('LIGHT', 'MEDIUM', 'DARK');

-- CreateEnum
CREATE TYPE "ProcessType" AS ENUM ('WASHED', 'NATURAL', 'HONEY', 'ANAEROBIC', 'CARBONIC_MACERATION', 'EXPERIMENTAL');

-- CreateEnum
CREATE TYPE "BrewMethod" AS ENUM ('ESPRESSO', 'V60', 'AEROPRESS', 'FRENCH_PRESS', 'MOKAPOT', 'CHEMEX', 'COLD_BREW', 'TURKISH');

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "price" INTEGER NOT NULL,
    "imageUrl" TEXT,
    "country" TEXT,
    "region" TEXT,
    "farm" TEXT,
    "roastLevel" "RoastLevel",
    "process" "ProcessType",
    "variety" TEXT,
    "altitude" INTEGER,
    "cuppingScore" DOUBLE PRECISION,
    "flavorAcidity" INTEGER,
    "flavorSweetness" INTEGER,
    "flavorBody" INTEGER,
    "flavorAroma" INTEGER,
    "flavorBitter" INTEGER,
    "flavorComplexity" INTEGER,
    "notes" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "brewMethods" "BrewMethod"[] DEFAULT ARRAY[]::"BrewMethod"[],
    "isRecommended" BOOLEAN NOT NULL DEFAULT false,
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");
