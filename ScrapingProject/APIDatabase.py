import requests
import json

class SaveInDatabase:
    url = "https://localhost:44384/api/Data"

    @staticmethod
    def Save(mylistdata):
        lis = json.dumps(mylistdata)
        res1 = requests.post(SaveInDatabase.url + '/postarray', lis, headers={"content-type": "application/json"}, verify=False)
        res=json.loads(res1.text)
        print(res['msg'])
        datalist=res['List']
        SaveInDatabase.MakeJsonFile(datalist)


    @staticmethod
    def MakeJsonFile(datalist):
        jsonlist=json.dumps(datalist)
        with open('ChallangeDesionsList.json','w') as f:
            f.write(jsonlist)
