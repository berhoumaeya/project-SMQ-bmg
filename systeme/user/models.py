from django.db import models
from django.contrib.auth.models import User

class Notification(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sender_notifications',null=True)
    recipient = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_notifications')
    message = models.TextField()
    created_at = models.DateTimeField(null=True, default=None)

    def __str__(self):
        return self.message
    

# Envoi d'une notification
def send_notification(sender, recipient, message,created_at):
    notification = Notification(sender=sender, recipient=recipient, message=message,created_at=created_at)

# Récupération des notifications non lues pour un utilisateur
def get_unread_notifications(user):
    return Notification.objects.filter(recipient=user, is_read=False)
