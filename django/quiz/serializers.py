from rest_framework import serializers
from .models import Quizzes, Question, Answer

# List Quizzes
class QuizSerializer(serializers.ModelSerializer):

    #question = serializers.StringRelatedField(many=True)

    class Meta:

        model = Quizzes
        fields = [
            'title',
        ]


class AnswerSerializer(serializers.ModelSerializer):

    class Meta:
        
        model = Answer
        fields = [
            'id',
            'answer_text',
            'is_right',
        ]


class RandomQuestionSerializer(serializers.ModelSerializer):

    # answer = serializers.StringRelatedField(many=True)
    answer = AnswerSerializer(many=True, read_only=True)
    
    class Meta:
        
        model = Question
        fields = [
            'title','answer',
        ]


