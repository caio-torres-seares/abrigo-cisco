# Usa a imagem oficial do Nginx
FROM nginx:alpine

# Remove a configuração padrão do Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copia sua configuração customizada do nginx.conf
COPY .docker/nginx/nginx.conf /etc/nginx/nginx.conf
