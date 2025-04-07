FROM node:18

WORKDIR /app

COPY . .

RUN apt-get update && \
    apt-get install -y ffmpeg python3-pip && \
    pip3 install yt-dlp && \
    npm install

EXPOSE 3000

CMD ["npm", "start"]
