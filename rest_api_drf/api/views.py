from django.shortcuts import render

# Create your views here.
from rest_framework.response import Response
from rest_framework.decorators import api_view
from api.serializers import formSerializer
from api.algoritym import simulate_fire

@api_view(['POST'])
def fireSim(request):
    serializer = formSerializer(data=request.data)
    if serializer.is_valid():
        gridSize = serializer.validated_data['gridSize']
        moisture = serializer.validated_data['moisture']
        step = serializer.validated_data['step']
        windDirection = serializer.validated_data['windDirection']
        windStrength = serializer.validated_data['windStrength']
        airTemperature = serializer.validated_data['airTemperature']
        fireStarts = serializer.validated_data.get('fireStarts', None)

        results, unburned_list, burning_list, ash_list = simulate_fire(
            gridSize, moisture, step, windDirection, windStrength, airTemperature, fireStarts
        )

        return Response({'result': results.tolist()})  # แปลง numpy array เป็น list
    return Response(serializer.errors, status=400)