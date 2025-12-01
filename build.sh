#!/bin/bash
# Script de build para Render
set -e

echo "Limpando cache e build anterior..."
rm -rf build
rm -rf node_modules/.cache
rm -rf .cache

echo "Instalando dependências..."
npm install

echo "Fazendo build..."
NODE_ENV=production npm run build

echo "Build concluído!"

