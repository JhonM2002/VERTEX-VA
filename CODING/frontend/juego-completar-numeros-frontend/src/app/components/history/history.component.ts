import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  searchName: string = ''; // Variable para la búsqueda por nombre
  historyLog: any[] = []; // Array para almacenar el historial de juegos
  filteredHistoryLog: any[] = []; // Array para almacenar el historial filtrado
  message: string = ''; // Mensaje de estado

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.loadHistory(); // Cargar el historial al iniciar el componente
  }

  // Cargar todos los historiales de juegos
  loadHistory(): void {
    this.apiService.getAllGameHistories().subscribe(
      (data) => {
        // Suponiendo que cada elemento del array tiene objetos 'patient' y 'therapist' con una propiedad 'nombre'
        this.historyLog = data.map((gameHistory: any) => ({
          observacion: gameHistory.observacion,
          tiempo: gameHistory.tiempo,
          errores: gameHistory.errores,
          aciertos: gameHistory.aciertos,
          nombrePaciente: gameHistory.patient.nombre, // Asegúrate de que 'patient' tenga una propiedad 'nombre'
          nombreTerapeuta: gameHistory.therapist.nombre // Asegúrate de que 'therapist' tenga una propiedad 'nombre'
        }));
        this.filteredHistoryLog = this.historyLog; // Inicializa el array filtrado con todos los datos
      },
      (error) => {
        console.error('Error al cargar el historial:', error);
      }
    );
  }  
//Busca el paciente por el nombre ingresado en el campo de búsqueda y filtra el historial
  onSearchChange(): void {
    if (!this.searchName.trim()) {
      // Si el campo está vacío, muestra todos los registros
      this.filteredHistoryLog = this.historyLog;
      this.message = '';
      return;
    }
  
    // Filtrar historial de manera local por nombre del paciente
    this.filteredHistoryLog = this.historyLog.filter((history) =>
      history.nombrePaciente.toLowerCase().includes(this.searchName.toLowerCase())
    );
  
    // Si no se encuentran coincidencias, muestra un mensaje
    if (this.filteredHistoryLog.length === 0) {
      this.message = 'No se encontraron resultados.';
    } else {
      this.message = '';
    }
  }
  

  // Navegar a la página de inicio de sesión
  goToLogin(): void {
    this.router.navigate(['/login']);
  } 
}