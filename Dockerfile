FROM node:latest

# 在容器中创建一个工作目录
WORKDIR /usr/src/app

# 将 package.json 和 package-lock.json 复制到工作目录
COPY package*.json ./


RUN npm config set registry https://registry.npmmirror.com/
# 安装项目依赖
RUN npm install

# 将 Nest.js 项目的所有文件复制到工作目录
COPY . .

# 编译 TypeScript 代码
RUN npm run build

# 暴露 Nest.js 服务器端口（假设 Nest.js 应用程序监听的是 3000 端口）
EXPOSE 3000

# 在容器内部运行 Nest.js 服务器
CMD ["npm", "run", "start:prod"]