from rest_framework import serializers

class ContactSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=100)
    email = serializers.EmailField()
    message = serializers.CharField()
    recaptcha_token = serializers.CharField(write_only=True)
