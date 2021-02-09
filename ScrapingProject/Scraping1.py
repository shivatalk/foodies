from selenium import webdriver
import BLnumber as bl
import APIDatabase as api

#driver.close()

class Configuration:#type of hearing
    HearingType="All" #All ,Inter ,Ex
    MonthFrom = "January"
    YearFrom = 2019
    MonthTo = "January"
    YearTo = 2019

    @staticmethod
    def GetDriver():
        driver = webdriver.Chrome(executable_path="C:\chromeDriver\chromedriver.exe")
        url = "https://www.ipo.gov.uk/p-challenge-decision-results.htm"
        driver.get(url)
        driver.maximize_window()
        return driver



if __name__=="__main__":
    obj=bl.BLNumber(Configuration.GetDriver())
    data=obj.TableListData()
    api.SaveInDatabase.Save(data)




    print("*****************************Ending***************************")

