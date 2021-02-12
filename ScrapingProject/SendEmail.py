import smtplib, ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

class Emails:
    def __init__(self):
        self.port=465
        self.smtp_server = "smtp.gmail.com"
        self.sender_email = "autotestingemail123@gmail.com"
        self.receiver_email = "shivam0809singh@gmail.com"
        self.password = "Autotesting*123"

    def SendEmail(self,subject,emailbody,receiver="shivam0809singh@gmail.com"):

        self.receiver_email=receiver
        message = MIMEMultipart("alternative")
        message["Subject"] = subject
        message["From"] = self.sender_email
        message["To"] = self.receiver_email
        html = """\
        <html>
          <body>
            <p>Hi Team,<br><br>
               {0}<br><br>
               Form More Updates<br> Visit Website :
               <a href="https://www.maxval.com/">maxval.com</a> 
            </p>
            <br><br><br><br><br><br>
            Thanks and Regards 
            <br>Maxval Group ,Inc 
            <br> Bangalore (Karnataka) India.
          </body>
        </html>
        """.format(emailbody)

        part2 = MIMEText(html, "html")
        message.attach(part2)

        try:
            context = ssl.create_default_context()
            with smtplib.SMTP_SSL(self.smtp_server, self.port, context=context) as server:
                server.login(self.sender_email, self.password)
                server.sendmail(self.sender_email, self.receiver_email, message.as_string())
                print("Email Sent Successfully...")
        except:
            print("Some Problem Occur While Sending Email....")


#
# if __name__=='__main__':
#     print("Starting....")
#     subject = "PTO Monthly Updates"
#     msg = "{0} Records Of Inter Party and {1} Records of Ex Party Has Added Successfully in Database.".format(5,9)
#
#     Emails().SendEmail(subject,msg)
#
#     print("done.....")

