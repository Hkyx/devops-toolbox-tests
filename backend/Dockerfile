FROM python:3.9

RUN pip install fastapi requests uvicorn

EXPOSE 8000

WORKDIR app

COPY ./main.py /app

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
