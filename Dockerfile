FROM python:3-slim
WORKDIR /app
COPY server.py .
COPY static ./static
RUN useradd --system demo
USER demo
ENV BIND=0.0.0.0 PYTHONUNBUFFERED=1
EXPOSE 8081
CMD ["python", "server.py"]