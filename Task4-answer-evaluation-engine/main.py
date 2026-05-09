from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

# Request Model
class AnswerRequest(BaseModel):
    question: str
    answer: str


@app.post("/evaluate")
def evaluate_answer(data: AnswerRequest):

    answer = data.answer.lower()

    concept_scores = []

    total_score = 0

    # Example concepts
    concepts = {
        "mounting": 3,
        "updating": 5
    }

    # Score concepts
    for concept, marks in concepts.items():

        if concept in answer:
            score = marks
        else:
            score = 0

        concept_scores.append({
            "concept": concept,
            "score": score
        })

        total_score += score

    # Feedback
    if total_score == 8:
        feedback = "Excellent Answer"
    elif total_score >= 5:
        feedback = "Good Answer"
    else:
        feedback = "Missing Important Concepts"

    return {
        "total_score": total_score,
        "concept_scores": concept_scores,
        "feedback": feedback
    }