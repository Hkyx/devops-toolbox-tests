from fastapi import FastAPI
import requests
import json 


app = FastAPI()

def decore_json(domain_name):
    r = requests.get(domain_name, stream=True)
    return(r.json())

@app.get("/")
async def root():
    return {"message": "paths are /http or https + /domainName.y"}

@app.get("/testquery/{uri:path}")
def read_unit(uri: str):
    """[test a url to get a json return (serve to test service mesh) don't forget to
    add testquery/-/myhttpUri://uri.com]

    Args:
        uri (str): [http://uri.com]

    Returns:
        [json]: [return a json from the requested uri]
    """    
    return decore_json(uri)    