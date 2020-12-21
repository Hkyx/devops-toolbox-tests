from fastapi import FastAPI
import requests
import json 


app = FastAPI()

def decoreJson(protocol, domainName):
    r_path = "{}://{}".format(protocol, domainName)
    r = requests.get(r_path, stream=True)
    r_dict = r.body()   
    for line in r_dict.iter_lines():
        r_dict = line.decode('utf-8')
        print(json.loads(r_dict))
        return json.loads(r_dict)
    pass

@app.get("/")
async def root():
    return {"message": "paths are /http or https + /domainName.y"}

@app.get("/{protocol}/{domain}")
async def vf_http(domain: str, protocol: str):
    print(protocol)
    print(domain)
    return decoreJson(protocol, domain)