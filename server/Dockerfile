FROM python:3
ENV PYTHONUNBUFFERED 1
RUN mkdir /code
WORKDIR /code
ADD requirements.txt /code/
RUN pip install -r requirements.txt
ADD . /code/
EXPOSE 9000

CMD ["python", "manage.py", "runserver", "0.0.0.0:9000"]

