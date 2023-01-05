# FROM --platform=linux/amd64 python:3.8.3-alpine
FROM python:3.8.3-alpine

WORKDIR /app
ADD ./backend/requirements.txt /app/backend/


RUN pip install --upgrade pip
RUN pip install gunicorn
RUN apk update \
    && apk add postgresql-dev gcc python3-dev musl-dev
RUN pip install -r backend/requirements.txt

ADD ./backend /app/backend
ADD ./docker /app/docker