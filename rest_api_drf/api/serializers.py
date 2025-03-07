from rest_framework import serializers

class formSerializer(serializers.Serializer):
    gridSize = serializers.IntegerField()
    moisture = serializers.FloatField()
    step = serializers.IntegerField()
    windDirection = serializers.CharField()
    windStrength = serializers.FloatField()
    airTemperature = serializers.FloatField()
    fireStarts = serializers.ListField(
        child=serializers.ListField(child=serializers.IntegerField()), required=False
    )