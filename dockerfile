# Utiliser Node 18
FROM node:18-alpine

# Créer un dossier de travail
WORKDIR /app

# Copier package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm ci --only=production

# Copier le reste du projet
COPY . .

# Exposer le port si nécessaire
EXPOSE 3000

# Commande par défaut
CMD ["node", "index.js"]