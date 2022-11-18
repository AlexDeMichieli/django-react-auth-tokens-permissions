# pull official base image
FROM python:3.9.6-alpine 

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# create directory for the app user
RUN mkdir -p /home/app

RUN addgroup -S app && adduser -S app -G app

# set work directory
ENV HOME=/home/app
ENV APP_HOME=/home/app/backend
RUN mkdir $APP_HOME
RUN mkdir $APP_HOME/staticfiles
WORKDIR $APP_HOME


# install psycopg2 dependencies
RUN apk update \
    && apk add postgresql-dev gcc python3-dev musl-dev

# install dependencies
COPY ./requirements.txt .
RUN pip install -r requirements.txt

# copy entrypoint.sh
COPY ./entrypoint.prod.sh .
RUN sed -i 's/\r$//g'  $APP_HOME/entrypoint.prod.sh 
RUN chmod +x  $APP_HOME/entrypoint.prod.sh

# chown all the files to the app user
RUN chown -R app:app $APP_HOME
# change to the app user
USER app

# # copy project
COPY . .

# # run entrypoint.sh
ENTRYPOINT ["/home/app/backend/entrypoint.prod.sh"]
