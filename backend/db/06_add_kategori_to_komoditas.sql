-- Add kategori column to komoditas table
--
-- This migration adds a kategori (category) column to the komoditas table
-- to support frontend filtering by product category.
--
-- Valid categories: Sayuran, Buah, Biji-bijian & Serealia, Umbi-umbian, Rempah, Kacang-kacangan, Kopi/Teh/Kakao
-- This aligns with the categories used in the frontend marketplace UI.

ALTER TABLE komoditas
ADD COLUMN IF NOT EXISTS kategori VARCHAR(50);

-- Add comment for documentation
COMMENT ON COLUMN komoditas.kategori IS 'Kategori produk untuk filter marketplace (Sayuran, Buah, Biji-bijian & Serealia, Umbi-umbian, Rempah, Kacang-kacangan, Kopi/Teh/Kakao)';
