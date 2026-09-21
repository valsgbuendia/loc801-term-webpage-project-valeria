function submitAnswers() {
  const questions = {
      q1: {
          correct: "False",
          correctFeedback: "¡Correcto! “Es importante recordar que el hecho de que las personas de una misma comunidad utilicen un idioma en común no significa que compartan exactamente la misma conceptualización de cada objeto al que se hace referencia mediante una designación. Si se les pidiera representar su conceptualización de una mesa, no habría dos personas que hablaran un mismo idioma que dibujaran exactamente la misma mesa a partir del inventario mental de aquellas con las que se han encontrado o que han imaginado a lo largo de sus vidas. Esto es importante porque quienes no se dedican a los servicios lingüísticos ni a la localización asumen que el significado se encuentra en la designación, pero las palabras en sí mismas son arbitrarias y carecen de significado. En realidad, el significado está en el ojo o en el cerebro de quien lo percibe.” (Alaina Brandt, Getting Started with Terminology Management, The ATA Chronicle)",
          incorrectFeedback: {
              "Verdadero": "Incorrecto. “Es importante recordar que el hecho de que las personas de una misma comunidad utilicen un idioma en común no significa que compartan exactamente la misma conceptualización de cada objeto al que se hace referencia mediante una designación. Si se les pidiera representar su conceptualización de una mesa, no habría dos personas que hablaran un mismo idioma que dibujaran exactamente la misma mesa a partir del inventario mental de aquellas con las que se han encontrado o que han imaginado a lo largo de sus vidas. Esto es importante porque quienes no se dedican a los servicios lingüísticos ni a la localización asumen que el significado se encuentra en la designación, pero las palabras en sí mismas son arbitrarias y carecen de significado. En realidad, el significado está en el ojo o en el cerebro de quien lo percibe.” (Alaina Brandt, Getting Started with Terminology Management, The ATA Chronicle)",
          }
      },
      q2: {
          correct: "use in a specific subject field",
          correctFeedback: "¡Correcto! El lenguaje especializado es una lengua natural propia de un campo temático que utiliza recursos lingüísticos específicos. (ISO 1087)",
          incorrectFeedback: {
              "independent of any specific subject field": "Incorrecto. El lenguaje especializado es una lengua natural propia de un campo temático que utiliza recursos lingüísticos específicos. (ISO 1087)",
          }
      },
      q3: {
          correct: "rendering of ideas",
          correctFeedback: "¡Correcto!",
          incorrectFeedback: {
              "written content": "Incorrecto. Una característica que comparten la traducción y la interpretación es que ambas consisten en transmitir ideas expresadas en un idioma a otro idioma.",
              "verbal content": "Incorreco. Una característica que comparten la traducción y la interpretación es que ambas consisten en transmitir ideas expresadas en un idioma a otro idioma.."
          }
      }
  };

  try {
    const form = document.forms["quizForm"];
    if (!form) {
        throw new Error("No se encontró el formulario del cuestionario");
    }

    let unansweredQuestions = [];
    let totalCorrect = 0;

    // Loop through each question
    for (const question in questions) {
        const radioButtons = form[question];
        const feedbackElement = document.getElementById("feedback_" + question);
        
        if (!feedbackElement) {
            throw new Error(`No se encontró el elemento de retroalimentación de la pregunta ${question}`);
        }

        if (!radioButtons) {
            throw new Error(`No se encontraron los botones de opción de la pregunta ${question}`);
        }

        // Check if question is answered
        const selectedValue = radioButtons.value;
        if (selectedValue === "") {
            unansweredQuestions.push(question.replace('q', ''));
            continue;
        }

        // Process answer
        const isCorrect = selectedValue === questions[question].correct;
        if (isCorrect) {
            totalCorrect++;
            feedbackElement.innerHTML = questions[question].correctFeedback;
            feedbackElement.style.color = "green";
        } else {
            feedbackElement.innerHTML = questions[question].incorrectFeedback[selectedValue] || "Incorrecto. Inténtalo de nuevo, por favor.";
            feedbackElement.style.color = "red";
        }

        // Make feedback accessible to screen readers
        feedbackElement.setAttribute('role', 'alert');
    }

    // Handle unanswered questions
    if (unansweredQuestions.length > 0) {
        const errorMsg = `Responde, por favor ${unansweredQuestions.length === 1 ? 'question' : ''} ${unansweredQuestions.join(', ')}`;
        const errorElement = document.getElementById('quiz-error') || createErrorElement();
        errorElement.textContent = errorMsg;
        errorElement.style.display = 'block';
        return false;
    }

    // Announce final score to screen readers
    const scoreAnnouncement = document.createElement('div');
    scoreAnnouncement.setAttribute('role', 'status');
    scoreAnnouncement.setAttribute('aria-live', 'polite');
    scoreAnnouncement.className = 'sr-only';
    scoreAnnouncement.textContent = `Respondiste correctamente ${totalCorrect} de ${Object.keys(questions).length} respuestas`;
    document.querySelector('.quiz-container').appendChild(scoreAnnouncement);

} catch (error) {
    console.error('Quiz error:', error);
    const errorElement = document.getElementById('quiz-error') || createErrorElement();
    errorElement.textContent = 'Ocurrió un error al procesar tus respuestas. Actualiza la página e inténtalo de nuevo.';
    errorElement.style.display = 'block';
}

return false;
}

function createErrorElement() {
const errorElement = document.createElement('div');
errorElement.id = 'quiz-error';
errorElement.className = 'error-message';
errorElement.setAttribute('role', 'alert');
errorElement.style.color = 'red';
document.querySelector('.quiz-container').insertBefore(errorElement, document.querySelector('#quizForm'));
return errorElement;
}