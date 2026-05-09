def evaluate_answer(question, user_answer):
    question = question.lower()
    user_answer = user_answer.lower()

    concepts = []
    
    for key in concepts_db:
        if key in question:
            concepts = concepts_db[key]
            break

    concept_scores = []
    total_score = 0

    for concept in concepts:
        if concept in user_answer:
            score = 3
        else:
            score = 0

        concept_scores.append({
            "concept": concept,
            "score": score
        })

        total_score += score

    # feedback
    missing = [c for c in concepts if c not in user_answer]

    feedback = "Good answer" if not missing else f"Missing: {', '.join(missing)}"

    return {
        "total_score": total_score,
        "concept_scores": concept_scores,
        "feedback": feedback
    }