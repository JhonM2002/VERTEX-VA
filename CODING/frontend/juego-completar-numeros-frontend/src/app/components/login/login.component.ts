import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  therapists: { _id: string; nombre: string; cedula: string }[] = [];
  patients: { _id: string; nombre: string; cedula: string }[] = [];
  selectedTherapistCedula: string = '';
  selectedPatientCedula: string = '';

  constructor(private router: Router, private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadTherapists();
    this.loadPatients();
  }

  // Carga los terapeutas
  loadTherapists(): void {
    this.apiService.getTherapists().subscribe(
      (therapists) => {
        console.log('Terapeutas cargados:', therapists)
        this.therapists = therapists;
      },
      (error) => {
        alert('Error al cargar los terapeutas');
      }
    );
  }

  // Carga los pacientes
  loadPatients(): void {
    this.apiService.getPatients().subscribe(
      (patients) => {
        this.patients = patients;
        console.log('Pacientes cargados:', patients); // Depuración
      },
      (error) => {
        alert('Error al cargar los pacientes');
      }
    );
  }

  // Navega a la página de configuración
  goToConfiguration(): void {
    // Validar campos faltantes
    if (!this.selectedTherapistCedula && !this.selectedPatientCedula) {
      alert('Por favor, seleccione un terapeuta y un paciente.');
      return;
    }
    if (!this.selectedTherapistCedula) {
      alert('Por favor, seleccione un terapeuta.');
      return;
    }
    if (!this.selectedPatientCedula) {
      alert('Por favor, seleccione un paciente.');
      return;
    }

    // Encuentra los nombres y IDs de terapeuta y paciente seleccionados
    const selectedTherapist = this.therapists.find(
      (t) => t.cedula === this.selectedTherapistCedula
    );
    const selectedPatient = this.patients.find(
      (p) => p.cedula === this.selectedPatientCedula
    );

    // Validar que existan los datos seleccionados
    if (!selectedTherapist || !selectedTherapist._id) {
      alert('No se pudo encontrar el terapeuta seleccionado.');
      return;
    }
    if (!selectedPatient || !selectedPatient._id) {
      alert('No se pudo encontrar el paciente seleccionado.');
      return;
    }
  
      // Validación adicional para garantizar que existan los objetos seleccionados
  if (!selectedTherapist || !selectedTherapist._id) {
    alert('No se pudo encontrar el terapeuta seleccionado. Verifica la configuración.');
    console.error('Error: Terapeuta no encontrado o sin _id:', selectedTherapist);
    
    return;
  }

  if (!selectedPatient || !selectedPatient._id) {
    alert('No se pudo encontrar el paciente seleccionado. Verifica la configuración.');
    console.error('Error: Paciente no encontrado o sin _id:', selectedPatient);
    return;
  }
    // Guarda los datos seleccionados en el localStorage
    localStorage.setItem('therapistName', selectedTherapist.nombre);
    localStorage.setItem('patientName', selectedPatient.nombre);
    localStorage.setItem('therapistCedula', this.selectedTherapistCedula);
    localStorage.setItem('patientCedula', this.selectedPatientCedula);
    localStorage.setItem('therapistId', selectedTherapist._id);
    localStorage.setItem('patientId', selectedPatient._id);

    console.log('Datos guardados en localStorage:', {
      therapistName: selectedTherapist.nombre,
      patientName: selectedPatient.nombre,
      therapistCedula: this.selectedTherapistCedula,
      patientCedula: this.selectedPatientCedula,
      therapistId: selectedTherapist._id,
      patientId: selectedPatient._id,
    });
    
    // Navega a la página de configuración
    this.router.navigate(['/config']);
  }

  // Navega a la página de historial
  goToHistory(): void {
    this.router.navigate(['/history']);
  }
}
