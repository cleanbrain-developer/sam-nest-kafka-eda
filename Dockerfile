# NestJS 빌드용 Node 이미지
FROM node:20-alpine

# 앱 디렉토리 설정
WORKDIR /app

# 패키지 복사 및 설치
COPY package*.json ./
COPY prisma ./prisma
RUN yarn config set strict-ssl false
RUN yarn install
RUN yarn prisma generate

# 소스 복사
COPY . .
RUN yarn prisma generate

# 앱 빌드
RUN yarn build

# 포트 노출
EXPOSE 3000

# 앱 실행
CMD ["node", "dist/main"]
