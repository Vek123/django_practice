# Dockerfile
FROM python:alpine

# Установка зависимостей
RUN pip install --upgrade pip
COPY requirements/prod.txt requirements.txt
RUN pip install -r requirements.txt

WORKDIR /app

# Копирование проекта
COPY . .

RUN python manage.py collectstatic

# Команда для запуска Gunicorn
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "school.wsgi:application"]