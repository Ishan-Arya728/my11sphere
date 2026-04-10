import React, { useState } from "react";
import players from "./data";

function Quiz() {
  const generateBasicQuestions = () => {
    const generated = [];
    const questionTypes = [
      { key: "runs", label: "more runs", condition: (a, b) => a > b },
      { key: "wickets", label: "more wickets", condition: (a, b) => a > b },
      { key: "matches", label: "fewer matches played", condition: (a, b) => a < b },
      { key: "strikeRate", label: "a higher batting strike rate", condition: (a, b) => a > b },
      { key: "economy", label: "a lower bowling economy", condition: (a, b) => a < b }
    ];

    for (let i = 0; i < 10; i++) {
      let p1 = players[Math.floor(Math.random() * players.length)];
      let p2 = players[Math.floor(Math.random() * players.length)];
      const type = questionTypes[i % questionTypes.length];

      while (
        p1.id === p2.id || 
        p1[type.key] === p2[type.key] || 
        (type.key === "economy" && (p1.economy === 0 || p2.economy === 0)) ||
        (type.key === "wickets" && (p1.wickets === 0 || p2.wickets === 0))
      ) {
        p1 = players[Math.floor(Math.random() * players.length)];
        p2 = players[Math.floor(Math.random() * players.length)];
      }

      const isP1Correct = type.condition(p1[type.key], p2[type.key]);
      const correctAnswer = isP1Correct ? p1.name : p2.name;

      generated.push({ id: i + 1, questionText: `Who has ${type.label} in the IPL?`, options: [p1, p2], correctAnswer: correctAnswer, statKey: type.key });
    }
    return generated;
  };

  const [questions] = useState(generateBasicQuestions);
  const [answers, setAnswers] = useState({});

  const handleAnswer = (questionId, playerName) => {
    if (answers[questionId]) return;
    setAnswers({ ...answers, [questionId]: playerName });
  };

  const headingStyle = { color: "#8b0000", fontSize: "28px", fontWeight: "bold", marginBottom: "6px", borderLeft: "4px solid #cc0000", paddingLeft: "14px" };
  const subStyle = { color: "#888888", fontSize: "15px", marginBottom: "28px", paddingLeft: "18px" };
  const questionCardStyle = { backgroundColor: "#ffffff", borderRadius: "14px", padding: "24px", marginBottom: "18px", boxShadow: "0 3px 12px rgba(204,0,0,0.08)", borderLeft: "4px solid #cc0000" };
  const qNumStyle = { backgroundColor: "#cc0000", color: "#ffffff", borderRadius: "50%", width: "28px", height: "28px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: "bold", marginRight: "10px", flexShrink: 0 };
  const questionTextStyle = { color: "#1a1a1a", fontSize: "16px", fontWeight: "600", marginBottom: "16px", display: "flex", alignItems: "center" };
  const optionsRowStyle = { display: "flex", gap: "12px", flexWrap: "wrap" };

  const getOptionStyle = (question, optionName) => {
    const isAnswered = !!answers[question.id];
    const isThisSelected = answers[question.id] === optionName;
    const isCorrectChoice = optionName === question.correctAnswer;
    let bg = "#fdf5f5", border = "#f0d0d0", color = "#444";

    if (isAnswered) {
      if (isCorrectChoice) { bg = "#f0fff4"; border = "#22aa55"; color = "#166534"; }
      else if (isThisSelected) { bg = "#fff0f0"; border = "#cc0000"; color = "#8b0000"; }
      else { bg = "#fafafa"; border = "#eeeeee"; color = "#aaaaaa"; }
    }

    return { flex: 1, padding: "14px 16px", borderRadius: "10px", border: `2px solid ${border}`, backgroundColor: bg, color: color, fontWeight: "600", fontSize: "15px", cursor: isAnswered ? "default" : "pointer", textAlign: "center", transition: "all 0.2s" };
  };

  return (
    <div>
      <h2 style={headingStyle}>Basic Quiz 🧠</h2>
      <p style={subStyle}>Instant feedback! Test your knowledge on these 10 rapid-fire questions.</p>

      {questions.map((question) => {
        const isAnswered = !!answers[question.id];
        return (
          <div key={question.id} style={questionCardStyle}>
            <div style={questionTextStyle}><div style={qNumStyle}>{question.id}</div>{question.questionText}</div>
            <div style={optionsRowStyle}>
              {question.options.map((player) => (
                <div key={player.id} style={getOptionStyle(question, player.name)} onClick={() => handleAnswer(question.id, player.name)}>
                  <div>{player.name}</div>
                  {isAnswered && (
                    <div style={{ fontSize: "12px", marginTop: "6px", opacity: 0.8 }}>
                      {question.statKey === "runs" ? `${player.runs} Runs` : question.statKey === "wickets" ? `${player.wickets} Wickets` : question.statKey === "matches" ? `${player.matches} Matches` : question.statKey === "strikeRate" ? `${player.strikeRate} SR` : `${player.economy} Econ`}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}

      <button style={{ backgroundColor: "#ffffff", color: "#cc0000", border: "2px solid #cc0000", padding: "12px 24px", borderRadius: "8px", fontWeight: "bold", cursor: "pointer", display: "block", margin: "30px auto" }} onClick={() => window.location.reload()}>
        🔄 Generate New Questions
      </button>

    </div>
  );
}

export default Quiz;