FROM python:3.11.9-alpine3.19
WORKDIR /app
EXPOSE 5000

COPY Pipfile Pipfile.lock ./
RUN pip install pipenv 
RUN pipenv requirements > requirements.txt
RUN pip install -r requirements.txt
COPY . ./
CMD ["python", "main.py"]