FROM nginx:1.15-alpine

COPY ./docker/nginx.conf.template /etc/nginx/conf.d/default.conf.template

ADD html/ /usr/share/nginx/html/

COPY ./run.sh /docker-entrypoint.sh

RUN chmod a+x /docker-entrypoint.sh

ENTRYPOINT ["/docker-entrypoint.sh"]

# 每次容器启动时执行
CMD ["nginx", "-g", "daemon off;"]

# 容器应用端口
EXPOSE 8002