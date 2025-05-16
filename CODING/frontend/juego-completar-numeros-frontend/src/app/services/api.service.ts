import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  // --- Métodos relacionados con Terapeutas ---
  addTherapist(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/therapists`, data);
  }

  getTherapistByCedula(cedula: string): Observable<{ nombre: string; cedula: string }> {
    return this.http.get<{ nombre: string; cedula: string }>(`${this.apiUrl}/therapist/cedula/${cedula}`);
  }

  getTherapists(): Observable<{ _id: string; nombre: string; cedula: string }[]> {
    return this.http.get<{  _id: string; nombre: string; cedula: string }[]>(`${this.apiUrl}/therapists`);
  }
  // --- Métodos relacionados con Pacientes ---
  addPatient(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/patients`, data);
  }
  
  getPatientByCedula(cedula: string): Observable<{ nombre: string; cedula: string }> {
    return this.http.get<{ nombre: string; cedula: string }>(`${this.apiUrl}/patient/cedula/${cedula}`);
  }

  getPatients(): Observable<{ _id: string; nombre: string; cedula: string }[]> {
    return this.http.get<{ _id: string; nombre: string; cedula: string }[]>(`${this.apiUrl}/patients`);
  }

  // Obtener historial de un paciente por ID o nombre
  getPatientHistory(patientId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/patients/${patientId}/history`);
  }

  getPatientHistoryByName(nombre: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/patient/history/nombre/${nombre}`);
  }

  // --- Métodos relacionados con Juegos ---
  saveGameHistory(historyData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/gamehistories`, historyData,{
    headers: { 'Content-Type': 'application/json' }
   });
  }

  addGameHistory(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/gamehistories`, data);
  }

  getAllGameHistories(): Observable<any> {
    return this.http.get(`${this.apiUrl}/gamehistories`);
  }

  // --- Métodos generales ---
  getAllPatientsHistory(): Observable<any> {
    return this.http.get(`${this.apiUrl}/all-patients-history`);
  }

  verifyCedulas(therapistCedula: string, patientCedula: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/verifyCedulas`, {
      therapistCedula,
      patientCedula
    });
  }
  getPatientsByTherapist(therapistCedula: string): Observable<{ nombre: string; cedula: string }[]> {
    return this.http.get<{ nombre: string; cedula: string }[]>(`${this.apiUrl}/therapist/${therapistCedula}/patients`);
  }
}
