import smtplib
def send_email(recipient, subject, body):

    FROM = "woha.project@gmail.com"
    TO = recipient if type(recipient) is list else [recipient]
    SUBJECT = subject
    TEXT = body

    # Prepare actual message
    message = """\From: %s\nTo: %s\nSubject: %s\n\n%s
    """ % (FROM, ", ".join(TO), SUBJECT, TEXT)
    try:
        server = smtplib.SMTP("smtp.gmail.com", 587)
        server.ehlo()
        server.starttls()
        server.login("woha.project@gmail.com", "proiecttw")
        server.sendmail(FROM, TO, message)
        server.close()
        print 'successfully sent the mail-----------------------------------------------------------------'
    except Exception as e:
        print ("failed " + str(e))