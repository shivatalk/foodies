from selenium.webdriver.support.ui import Select
import Scraping1 as conf

class DropDownHandel:

    def __init__(self,driver,HearingType):
        self.driver = driver
        self.HearingType=HearingType
        self.MonthFrom = conf.Configuration.GetMonthFrom()
        self.YearFrom = conf.Configuration.GetYearFrom()
        self.MonthTo = conf.Configuration.GetMonthTo()
        self.YearTo = conf.Configuration.GetYearTo()



    def GetBlNumbers(self):
        self.__SetHearingTyepe(self.HearingType)
        self.__SetStartingMonthYear(self.MonthFrom,self.YearFrom)
        self.__SetEndingMonthYear(self.MonthTo,self.YearTo)
        self.__Search()
        datalist = self.__GetListOfBlNumer()
        self.driver.back()
        return  datalist

    def __Search(self):
        gobtn = self.driver.find_element_by_xpath("//*[@id='find_Decision']/fieldset/div[13]/input")
        gobtn.click()

    def __SetHearingTyepe(self,selected='All'):
        heartype=Select(self.driver.find_element_by_id('hearingtype'))
        heartype.select_by_value(selected)


    def __SetStartingMonthYear(self,MonthFrom,YearFrom):
        monFrom = Select(self.driver.find_element_by_id("MonthFrom"))
        monFrom.select_by_value(str(MonthFrom))  # January ,Febuary...
        yeFrom = Select(self.driver.find_element_by_id("YearFrom"))
        yeFrom.select_by_value(str(YearFrom))  # 1999,...2001....2019


    def __SetEndingMonthYear(self,MonthTo,YearTo):
        monTo = Select(self.driver.find_element_by_id("MonthTo"))
        monTo.select_by_value(str(MonthTo))  # January ,Febuary...
        yeTo = Select(self.driver.find_element_by_id("YearTo"))
        yeTo.select_by_value(str(YearTo))  # 1999,...2001....2019


    def __GetListOfBlNumer(self):
        rows = len(self.driver.find_elements_by_xpath("//*[@id='mainCol']/div/table/tbody"))
        BLNumbers=[]
        for i in range(1,rows+1):
            val = self.driver.find_element_by_xpath("//*[@id='mainCol']/div/table/tbody[" + str(i) + "]/tr/td[1]").text
            BLNumbers.append(val)
        return BLNumbers


    def __ScrapTableData(self):
        rows=len(self.driver.find_elements_by_xpath("//*[@id='mainCol']/div/table/tbody"))
        column=len(self.driver.find_elements_by_xpath("//*[@id='mainCol']/div/table/tbody[1]/tr/td"))
        colNames=[]
        #//*[@id="mainCol"]/div/table/thead/tr/th[1]

        for i in range(1,column+1):
            colname=self.driver.find_element_by_xpath("//*[@id='mainCol']/div/table/thead/tr/th["+str(i)+"]").text
            colNames.append(colname)
        recordList=[]

        for i in range(1,rows+1):
            rowobj=dict()
            for j in range(1,column+1):
                key=colNames[j-1]
                val=self.driver.find_element_by_xpath("//*[@id='mainCol']/div/table/tbody["+str(i)+"]/tr/td["+str(j)+"]").text
                rowobj[key]=val
            recordList.append(rowobj)
        return recordList


#rows==//*[@id="mainCol"]/div/table/tbody[1]
#//*[@id="mainCol"]/div/table/tbody[1]/tr
#//*[@id="mainCol"]/div/table/tbody[1]/tr/td[2]