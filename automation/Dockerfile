FROM maven:3.8.4-openjdk-17-slim
FROM maven:3.9.6-eclipse-temurin-17

WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
CMD ["mvn", "test"]