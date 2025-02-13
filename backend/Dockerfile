
FROM maven:3.9.8-amazoncorretto-22 AS build
FROM amazoncorretto:22

# Bước 2: Cài đặt thông tin về file JAR sẽ được chạy
ARG JAR_FILE=target/backend-0.0.1-SNAPSHOT.jar

# Bước 3: Sao chép file JAR vào container
COPY ${JAR_FILE} app.jar

# Bước 4: Mở port mà ứng dụng sẽ lắng nghe
EXPOSE 8080

# Bước 5: Chạy ứng dụng khi container được khởi động
ENTRYPOINT ["java", "-jar", "/app.jar"]
