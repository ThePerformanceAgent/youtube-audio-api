FROM node:18

WORKDIR /app

COPY . .

# Instala ffmpeg e yt-dlp via binário direto (sem pip)
RUN apt-get update && \
    apt-get install -y ffmpeg curl && \
    curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o /usr/local/bin/yt-dlp && \
    chmod a+rx /usr/local/bin/yt-dlp && \
    npm install

EXPOSE 3000

CMD ["npm", "start"]
