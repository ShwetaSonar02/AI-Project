# 🧠 Answer Evaluation Engine (v2 — Decomposed Scoring)

## 📌 Project Overview

This project implements an AI-based Answer Evaluation Engine using FastAPI.

The system evaluates interview answers by:
- Extracting important concepts
- Scoring each concept separately
- Generating structured feedback
- Returning JSON-based evaluation results

The project follows a modular architecture using separate files for:
- API routes
- Concept extraction
- Evaluation logic

---

# 🚀 Features

✅ FastAPI backend API  
✅ Concept-wise answer evaluation  
✅ Total score calculation  
✅ Structured JSON output  
✅ Feedback generation  
✅ Partial answer handling  
✅ Swagger API testing  

---

# 🛠️ Technologies Used

- Python
- FastAPI
- Pydantic
- Uvicorn
- JSON
- Swagger UI
- Git & GitHub

---

# 📂 Project Structure

```bash
Task4-answer-evaluation-engine/
│
├── __pycache__/
├── concepts.py
├── evaluator.py
├── main.py
├── README.md

⚙️ Installation
1️⃣ Clone Repository
git clone https://github.com/ShwetaSonar02/AI-Project.git

2️⃣ Navigate to Project
cd Task4-answer-evaluation-engine

3️⃣ Install Dependencies
pip install fastapi uvicorn

4️⃣ Run Server
python -m uvicorn main:app --reload

🌐 API Endpoint
POST /evaluate
Request Body
{  "question": "Explain React Lifecycle",  "answer": "React has mounting and updating"}

📤 Example Response
{  "total_score": 8,  "concept_scores": [    {      "concept": "mounting",      "score": 3    },    {      "concept": "updating",      "score": 5    }  ],  "feedback": "Excellent Answer"}

🧪 API Testing
Open Swagger UI:
http://127.0.0.1:8000/docs
Test the API using:

Valid answers

Partial answers

Missing concepts

Invalid inputs


📌 Deliverables

Modular scoring logic
API + structured output
Concept extraction method
Partial answer evaluation


⚠️ Constraints & Edge Cases

Missing concepts
Partial answers
Overlapping concepts


👩‍💻 Author
Shweta Sonar
GitHub:
https://github.com/ShwetaSonar02


