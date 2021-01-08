from fastapi import FastAPI
import requests
import json


app = FastAPI()

@app.get("/")
async def root():
    return {"message": "paths are /testquery/http://domain_name.y"}

@app.get("/testquery/{uri:path}")
def read_unit(uri: str):
    """[test a url to get a json return (serve to test service mesh) don't forget to
    add testquery/-/myhttpUri://uri.com]

    Args:
        uri (str): [http://uri.com]
    Returns:
        [json]: [return a json from the requested uri]
    """
    r = requests.get(uri, stream=True)
    return(r.json())
