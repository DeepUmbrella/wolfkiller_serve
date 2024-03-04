#！/bin/bash

git pull origin hh-app-mian

VERSION=$(jq -r '.version' package.json)
echo "当前版本号: $VERSION"

echo "开始构建镜像..."
docker build -t hh-app-mian:$VERSION .
echo "构建镜像完成."

echo "停止旧容器..."
docker stop hh-server
echo "旧容器已停止."

echo "删除旧容器..."
docker rm hh-server
echo "旧容器已删除."

echo "运行新容器..."
#并加入到hh-app-net网络
docker run -d --name hh-server -p 3000:3000 --network hh-app-net hh-app-mian:$VERSION
echo "新容器已运行."

echo "部署完成!"