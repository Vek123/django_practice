#FROM nginx:alpine
#
#RUN apk add --no-cache python3 py3-pip
#
#COPY nginx.conf /etc/nginx/conf.d/default.conf
#
#WORKDIR /app
#
#COPY . .
#
#RUN rm /usr/lib/python*/EXTERNALLY-MANAGED && \
#    python3 -m ensurepip && \
#    pip3 install -r requirements.txt
#
#CMD ["nginx", "-g", "daemon off;"]
# Dockerfile
FROM python:alpine

# Установка зависимостей
RUN pip install --upgrade pip
COPY requirements.txt .
RUN pip install -r requirements.txt

WORKDIR /app

# Копирование проекта
COPY . .

RUN python manage.py collectstatic

# Команда для запуска Gunicorn
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "school.wsgi:application"]