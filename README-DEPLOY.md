# 🚀 Deploy no Render.com - GM Cozil PCM

## Passo a Passo para Deploy Gratuito

### 1. Preparar o Repositório

1. Crie uma conta no GitHub (se ainda não tiver)
2. Crie um novo repositório
3. Faça commit e push do código:

```bash
git init
git add .
git commit -m "Initial commit - GM Cozil PCM"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
git push -u origin main
```

### 2. Deploy no Render.com

1. Acesse: https://render.com
2. Faça login (pode usar conta GitHub)
3. Clique em "New +" → "Web Service"
4. Conecte seu repositório GitHub
5. Configure:
   - **Name**: `gm-cozil-pcm` (ou o nome que preferir)
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Free (gratuito)

6. Clique em "Create Web Service"

### 3. Variáveis de Ambiente (Opcional)

Se precisar de variáveis de ambiente, adicione em:
- Settings → Environment Variables

### 4. Aguardar Deploy

- O Render vai:
  1. Instalar dependências (`npm install`)
  2. Fazer build do projeto (`npm run build`)
  3. Iniciar o servidor (`npm start`)

### 5. Acessar

Após o deploy, você receberá uma URL como:
- `https://gm-cozil-pcm.onrender.com`

## 📝 Notas Importantes

- **Plano Gratuito**: 
  - O serviço "dorme" após 15 minutos de inatividade
  - Primeira requisição após dormir pode levar ~30 segundos
  - Ideal para apresentações e testes

- **Build Time**: 
  - Primeiro build pode levar 5-10 minutos
  - Builds subsequentes são mais rápidos

- **Limites Gratuitos**:
  - 750 horas/mês de runtime
  - 100GB de bandwidth/mês

## 🔧 Troubleshooting

### Erro no Build
- Verifique os logs no Render Dashboard
- Certifique-se que todas as dependências estão no `package.json`

### Erro 404 nas Rotas
- O servidor está configurado para SPA (Single Page Application)
- Todas as rotas redirecionam para `index.html`

### Porta
- O Render define automaticamente a porta via `process.env.PORT`
- O código já está configurado para isso

## 🎯 Próximos Passos

Após o deploy bem-sucedido:
1. Teste todas as funcionalidades
2. Verifique se os gráficos carregam corretamente
3. Teste o sistema de login
4. Compartilhe a URL para apresentação!

