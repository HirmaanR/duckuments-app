from django.core.mail import send_mail


def sendEmail(from_email, to_email, subject, message):
    try:
        send_mail(
            subject="active your account",
            message=f"Hello {saved_user.username} welcome to Dukcuments,\n\nplease active you account with this link:{saved_user.active_code}",
            from_email="duckuments@gmail.com",
            recipient_list=[saved_user.email],
            fail_silently=False,
        )
        return True
    except:
        return False
