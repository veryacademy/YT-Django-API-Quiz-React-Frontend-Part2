from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Question, Quizzes, Answer
from rest_framework import generics
from .serializers import QuizSerializer, RandomQuestionSerializer, AnswerSerializer


class StartQuiz(APIView):

    def get(self, request, **kwargs):
        quiz = Quizzes.objects.filter(category__name=kwargs['title'])
        serializer = QuizSerializer(quiz, many=True)
        return Response(serializer.data)


class Quiz(generics.ListAPIView):

    serializer_class = QuizSerializer
    queryset = Quizzes.objects.all()


class RandomQuestionTopic(APIView):

    def get(self, request, format=None, **kwargs):
        question = Question.objects.filter(quiz__title=kwargs['topic']).order_by('?')[:1]
        serializer = RandomQuestionSerializer(question, many=True)
        return Response(serializer.data)