from selenium import webdriver
from  datetime import datetime
import BLnumber as bl
import APIDatabase as api
import SendEmail as mail
import calendar

#driver.close()
class Configuration:
    SearchCurrentMonth=True
    HearingType="All" #All ,Inter ,Ex
    MonthFrom = 3
    YearFrom = 2005
    MonthTo = 5
    YearTo = 2005

    @staticmethod
    def GetDriver():
        driver = webdriver.Chrome(executable_path="C:\chromeDriver\chromedriver.exe")
        url = "https://www.ipo.gov.uk/p-challenge-decision-results.htm"
        driver.get(url)
        driver.maximize_window()
        if Configuration.SearchCurrentMonth:
            Configuration.SetMonthYear()

        return driver

    @staticmethod
    def SetMonthYear():
        currentMonth = datetime.now().month
        currentYear = datetime.now().year
        if currentMonth-1==0:
            Configuration.MonthFrom=12
            Configuration.MonthTo=12
            Configuration.YearFrom=currentYear-1
            Configuration.YearTo=currentYear-1
        else:
            Configuration.MonthFrom = currentMonth-1
            Configuration.MonthTo = currentMonth-1
            Configuration.YearFrom = currentYear
            Configuration.YearTo = currentYear

        print("Setting Year "+ str(Configuration.YearFrom))

    @staticmethod
    def GetMonthFrom():
        return Configuration.MonthFrom

    @staticmethod
    def GetMonthTo():
        return Configuration.MonthTo

    @staticmethod
    def GetYearFrom():
        return Configuration.YearFrom

    @staticmethod
    def GetYearTo():
        return Configuration.YearTo


    @staticmethod
    def RunScript():

        if Configuration.SearchCurrentMonth:
            inter="Inter"
            exparty="Ex"
            driver = Configuration.GetDriver()

            obj = bl.BLNumber(driver,inter)
            data = obj.TableListData()
            if len(data)>0:
                api.SaveInDatabase.Save(data)

            obj1 = bl.BLNumber(driver,exparty)
            data1 = obj1.TableListData()
            if len(data1) > 0:
                api.SaveInDatabase.Save(data1)

            mon=calendar.month_name[Configuration.GetMonthFrom()]
            year=Configuration.GetYearFrom()
            subject="PTO Monthly Updates ||"+str(mon)+" "+str(year)
            msg="{0} Records Of Inter Party and {1} Records of Ex Party Has Added Successfully in Database\n".format(len(data),len(data1))
            mail.Emails().SendEmail(subject,msg)

        else:

            if Configuration.HearingType=='All':
                inter = "Inter"
                exparty = "Ex"
                driver = Configuration.GetDriver()

                obj = bl.BLNumber(driver, inter)
                data = obj.TableListData()
                if len(data) > 0:
                    api.SaveInDatabase.Save(data)

                obj1 = bl.BLNumber(driver, exparty)
                data1 = obj1.TableListData()
                if len(data1) > 0:
                    api.SaveInDatabase.Save(data1)

                monfrom = calendar.month_name[Configuration.GetMonthFrom()]
                monto = calendar.month_name[Configuration.GetMonthTo()]
                yearfrom = Configuration.GetYearFrom()
                yearto = Configuration.GetYearTo()
                subject = "PTO Tool Updates"
                msg = "PTO Challanged Decisions from {0} {1} to {2} {3} in which {4} Records Of Inter Party and {5} Records of Ex Party Has Added Successfully in Database\n".format(
                    monfrom,yearfrom,monto,yearto,len(data), len(data1))
                mail.Emails().SendEmail(subject, msg)

            elif Configuration.HearingType=='Ex':
                exparty = "Ex"
                driver = Configuration.GetDriver()
                obj1 = bl.BLNumber(driver, exparty)
                data1 = obj1.TableListData()
                if len(data1) > 0:
                    api.SaveInDatabase.Save(data1)

                monfrom = calendar.month_name[Configuration.GetMonthFrom()]
                monto = calendar.month_name[Configuration.GetMonthTo()]
                yearfrom = Configuration.GetYearFrom()
                yearto = Configuration.GetYearTo()
                subject = "PTO Tool Updates"
                msg = "PTO Challanged Decisions from {0} {1} to {2} {3} in which {4} Records of Ex Party Has Added Successfully in Database\n".format(
                    monfrom, yearfrom, monto, yearto,len(data1))
                mail.Emails().SendEmail(subject, msg)
            else:
                inter = "Inter"
                driver = Configuration.GetDriver()
                obj1 = bl.BLNumber(driver, inter)
                data1 = obj1.TableListData()
                if len(data1) > 0:
                    api.SaveInDatabase.Save(data1)

                monfrom = calendar.month_name[Configuration.GetMonthFrom()]
                monto = calendar.month_name[Configuration.GetMonthTo()]
                yearfrom = Configuration.GetYearFrom()
                yearto = Configuration.GetYearTo()
                subject = "PTO Tool Updates"
                msg = "PTO Challanged Decisions from {0} {1} to {2} {3} in which {4} Records of Inter Party Has Added Successfully in Database\n".format(
                    monfrom, yearfrom, monto, yearto, len(data1))
                mail.Emails().SendEmail(subject, msg)


        print("****************************Ending***********************************")


