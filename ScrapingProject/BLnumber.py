import DropDown as drop

class BLNumber:

    def __init__(self,driver,HearingType):
        self.HearingType=HearingType
        self.driver=driver
        self.Columns=['BLNumber','ConcerningRightsIn','HearingOfficer','DecisionDate',
                      'PersonOrCompanyInvolved','ProvisionsDiscussion','Keywords','RelatedDecisions']

    def TableListData(self):

        obj = drop.DropDownHandel(self.driver,self.HearingType)
        blnumbers = obj.GetBlNumbers()
        tableDataList = []

        for bl in blnumbers:
            dictionary = self.__GetDataByBLNumber(str(bl))
            tableDataList.append(dictionary)
        return tableDataList


    def __GetDataByBLNumber(self,blnumber):
        blnum = self.driver.find_element_by_id("blnumber")
        blnum.clear()
        blnum.send_keys(str(blnumber))
        self.driver.find_element_by_name("submit").click()
        data=self.__ScrapDataByBLNumber(blnumber)
        self.driver.back()
        blnum1 = self.driver.find_element_by_id("blnumber")
        blnum1.clear()
        return data


    def __ScrapDataByBLNumber(self,blnumber):
        rows = len(self.driver.find_elements_by_xpath("//*[@id='mainCol']/div/dl/dt"))
        data = dict()
        bl = ""
        for i in blnumber:
            if (i != '/'):
                bl = bl + i

        for i in range(1, rows + 1):
            key=self.Columns[i-1]
            #key = self.driver.find_element_by_xpath("//*[@id='mainCol']/div/dl/dt[" + str(i) + "]").text
            val = self.driver.find_element_by_xpath("//*[@id='mainCol']/div/dl/dd[" + str(i) + "]").text
            data[key] = val


        try:
            sumlen=self.driver.find_elements_by_class_name('summary')
            para=""
            for textdata in sumlen:
                para =para+textdata.text
            data["Summary"] =para
        except:
            data["Summary"]=""

        data["PdfLink"]="https://www.ipo.gov.uk/p-challenge-decision-results/"+bl+".pdf"
        data["HearingType"]=self.HearingType
        data["Status"]="Activated"
        return data

