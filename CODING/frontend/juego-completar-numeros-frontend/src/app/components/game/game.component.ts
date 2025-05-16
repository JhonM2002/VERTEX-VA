import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  patientName: string = '';
  sequence: any[] = [];
  missingNumbers: number[] = [];
  userInputs: { value: number | null; correct: boolean; disabled: boolean }[] = [];
  errors: number = 0; // Contador de errores totales
  correctCount: number = 0; // Contador de aciertos
  feedbackMessage: string = '';
  feedbackClass: string = '';
  rangeStart: number = 0;
  rangeEnd: number = 0;
  totalNumbers: number = 0;
  missingCount: number = 0;
  startTime: Date = new Date();
  actualRangeStart: number = 0;
  actualRangeEnd: number = 0;
  motivationalMessage: string = '¡Tú puedes hacerlo! Sigue adelante.';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.patientName = localStorage.getItem('patientName') || 'Paciente'; // Obtener el nombre del paciente
    this.setupGame();
  }

  setupGame(): void {
    this.rangeStart = parseInt(localStorage.getItem('rangeStart') || '0', 10);
    this.rangeEnd = parseInt(localStorage.getItem('rangeEnd') || '0', 10);
    this.totalNumbers = parseInt(localStorage.getItem('totalNumbers') || '0', 10);
    this.missingCount = parseInt(localStorage.getItem('missingCount') || '0', 10);

    const startNumber = Math.floor(Math.random() * (this.rangeEnd - this.rangeStart - this.totalNumbers + 1)) + this.rangeStart;
    this.sequence = Array.from({ length: this.totalNumbers }, (_, i) => startNumber + i);

    this.actualRangeStart = this.sequence[0];
    this.actualRangeEnd = this.sequence[this.sequence.length - 1];

    const missingIndices: number[] = [];
    while (missingIndices.length < this.missingCount) {
      const randomIndex = Math.floor(Math.random() * this.sequence.length);
      if (!missingIndices.includes(randomIndex)) {
        missingIndices.push(randomIndex);
      }
    }

    this.missingNumbers = missingIndices.map(index => this.sequence[index]);
    missingIndices.forEach(index => {
      this.sequence[index] = '';
    });

    // Mezclar la secuencia desordenada
    this.shuffleArray(this.sequence);

    this.userInputs = Array.from({ length: this.missingCount }, () => ({
      value: null,
      correct: false,
      disabled: false
    }));

    this.startTime = new Date();
  }

  shuffleArray(array: any[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  validateInputs(): void {
    let errorCount = 0; // Contador de errores en esta validación

    this.userInputs.forEach((input, index) => {
      if (!input.correct) { // Solo evaluar los que no han sido marcados como correctos
        if (this.missingNumbers.includes(input.value!)) {
          input.correct = true;
          input.disabled = true;
          this.correctCount++; // Incrementar solo la primera vez que se valida correctamente
        } else {
          input.correct = false;
          errorCount++;
        }
      }
    });

    this.errors += errorCount; // Actualizar el contador de errores global

    const allCorrect = this.userInputs.every(input => input.correct);

    if (allCorrect) {
      this.feedbackMessage = '¡Correcto! Todos los números son válidos.';
      this.feedbackClass = 'success';
      this.saveHistoryAndProceed();
    } else {
      this.feedbackMessage = '¡Algunos números son incorrectos o están vacíos! Intenta corregirlos.';
      this.feedbackClass = 'error';
      this.updateMotivationalMessage();
    }

    setTimeout(() => {
      this.feedbackMessage = '';
      this.feedbackClass = '';
    }, 3000);
  }

  endAttempt(): void {
    const timeTaken = (new Date().getTime() - this.startTime.getTime()) / 1000;
    localStorage.setItem('timeTaken', timeTaken.toString());
    localStorage.setItem('totalErrors', this.errors.toString());
    localStorage.setItem('correctCount', this.correctCount.toString());
    localStorage.setItem('gameStatus', 'incomplete'); // Marcar como incompleto
    localStorage.setItem('attemptMessage', 'Oh no! No has terminado la secuencia de números.');
    this.router.navigate(['/result']);
  }

  saveHistoryAndProceed(): void {
    const timeTaken = (new Date().getTime() - this.startTime.getTime()) / 1000;
    localStorage.setItem('timeTaken', timeTaken.toString());
    localStorage.setItem('totalErrors', this.errors.toString());
    localStorage.setItem('correctCount', this.correctCount.toString());
    localStorage.setItem('attemptMessage', 'Felicidades por completar la secuencia de números!');
    localStorage.setItem('gameStatus', 'complete'); // Marcar como completo
    this.router.navigate(['/result']);
  }

  updateMotivationalMessage(): void {
    const messages = [
      '¡Sigue adelante, estás muy cerca!',
      '¡Tú puedes lograrlo, confía en ti!',
      '¡Un error no define el éxito!',
      '¡La práctica te hace mejor!',
      '¡No te rindas, casi lo tienes!'
    ];
    this.motivationalMessage = messages[Math.floor(Math.random() * messages.length)];
  }
}
