import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx'; 
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'app-listaalumnos',
  templateUrl: './listaalumnos.page.html',
  styleUrls: ['./listaalumnos.page.scss'],  
})
export class ListaAlumnosPage implements OnInit {
  alumnos: any[] = [];  // Usar cualquier tipo para los alumnos
  nuevoAlumno: string = '';
  imagenGrande: string | null = null;  // Variable para la imagen ampliada

  constructor(private firestore: AngularFirestore, private storage: AngularFireStorage, private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>('https://us-central1-lista-alumnos-18f61.cloudfunctions.net/getAlumnos')
      .subscribe((alumnos) => {
        this.alumnos = alumnos;
      }, error => {
        console.error('Error al obtener alumnos:', error);
      });
  }
  
  agregarAlumno() {
    if (this.nuevoAlumno.trim()) {
      console.log('Agregando alumno:', this.nuevoAlumno);
      
      this.http.post('https://us-central1-lista-alumnos-18f61.cloudfunctions.net/addAlumno', {
        nombre: this.nuevoAlumno.trim(),
      }).subscribe((response: any) => {
        console.log('Alumno agregado correctamente', response);
        this.obtenerAlumnos();
      }, error => {
        console.error('Error al agregar alumno:', error);
      });
  
      this.nuevoAlumno = '';
    }
  }
  
  eliminarAlumno(id: string) {
    this.http.request('delete', 'https://us-central1-lista-alumnos-18f61.cloudfunctions.net/deleteAlumno', {
      body: { id: id }
    }).subscribe(() => {
      console.log("Alumno eliminado correctamente");
      this.obtenerAlumnos();
    }, error => {
      console.error("Error al eliminar alumno:", error);
    });
  }
  
  obtenerAlumnos() {
    this.http.get<any[]>('https://us-central1-lista-alumnos-18f61.cloudfunctions.net/getAlumnos')
      .subscribe((alumnos) => {
        this.alumnos = alumnos;
      }, error => {
        console.error('Error al obtener alumnos:', error);
      });
  }
    
  
  cambiarAsistencia(alumno: any) {
    if (!alumno.id) return; // Asegurar que tenga un ID válido antes de actualizar
  
    this.http.put('https://us-central1-lista-alumnos-18f61.cloudfunctions.net/updateAsistencia', {
      id: alumno.id,
      presente: alumno.presente
    }).subscribe(() => {
      console.log("Estado de asistencia actualizado");
    }, error => {
      console.error("Error al actualizar asistencia:", error);
    });
  }
  subirJustificante(event: any, alumno: any) {
    console.log("Evento recibido:", event);
    console.log("Alumno recibido:", alumno);
  
    if (typeof alumno === 'number') {
      alumno = this.alumnos.find(a => a.id === alumno);
    }
  
    if (!alumno || !alumno.id) {
      console.error("❌ El objeto alumno es inválido o no tiene ID:", alumno);
      return;
    }
  
    const file = event.target.files?.[0];
  
    if (!file) {
      console.error("❌ No se seleccionó ningún archivo");
      return;
    }
  
    console.log("📂 Archivo seleccionado:", file.name);
  
    const filePath = `justificantes/${alumno.id}_${new Date().getTime()}`;
    const fileRef = this.storage.ref(filePath);
  
    const uploadTask = this.storage.upload(filePath, file);
  
    console.log("✅ Tarea de subida iniciada:", uploadTask);
  
    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        console.log("✅ Subida finalizada, obteniendo URL..."); 
        fileRef.getDownloadURL().subscribe(
          (url) => {
            console.log("🔗 URL obtenida:", url);
            if (!url) {
              console.error("❌ No se pudo obtener la URL del justificante.");
              return;
            }
            // Actualizar en Firestore con la URL
            this.actualizarJustificanteEnFirestore(alumno.id, url);
  
            // También enviamos la URL a tu endpoint
            this.actualizarJustificanteEnEndpoint(alumno.id, url);
          },
          (error) => {
            console.error("❌ Error al obtener la URL:", error);
          }
        );
      })
    ).subscribe({
      next: (snapshot: any) => console.log("📊 Progreso:", snapshot.bytesTransferred, "/", snapshot.totalBytes),
      error: (error) => console.error("❌ Error en snapshotChanges:", error),
      complete: () => console.log("🎉 Subida completada (en teoría)"),
    });
  }
  
  actualizarJustificanteEnEndpoint(alumnoId: string, url: string) {
    console.log("📤 Enviando URL al endpoint...");
    const body = { id: alumnoId, justificante: url };
  
    this.http.put('https://us-central1-lista-alumnos-18f61.cloudfunctions.net/updateJustificante', body)
      .subscribe({
        next: () => {
          console.log("✅ Justificante actualizado en el endpoint con URL:", url);
          this.alumnos = this.alumnos.map(a =>
            a.id === alumnoId ? { ...a, justificante: url } : a
          );
        },
        error: error => console.error("❌ Error al actualizar en el endpoint:", error)
      });
  }
  
  
  obtenerResumen() {
    const presentes = this.alumnos.filter((alumno) => alumno.presente).length;
    const ausentes = this.alumnos.length - presentes;
    return { presentes, ausentes };
  }

  // Función para ver la imagen ampliada
  verImagenGrande(imagen: string) {
    this.imagenGrande = imagen;
  }

  // Función para cerrar la imagen ampliada
  cerrarImagenGrande() {
    this.imagenGrande = null;
  }

  // Función para exportar a Excel
  exportarExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.alumnos);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Alumnos');
    console.log("Generando archivo Excel...");
    XLSX.writeFile(wb, 'Lista_Alumnos.xlsx');
  }

  exportarPDF() {
    const doc = new jsPDF();
    doc.text('Reporte de Asistencia', 10, 10);

    const data = this.alumnos.map(alumno => [
      alumno.nombre,
      alumno.presente ? 'Presente' : 'Ausente',
      alumno.justificante ? 'Sí subió justificante' : 'No subió justificante',
    ]);

    autoTable(doc, {
      head: [['Nombre', 'Asistencia', 'Justificante']],
      body: data,
    });

    // Si la imagen está en base64, agregarla al PDF
    this.alumnos.forEach((alumno, index) => {
      if (alumno.justificante) {
        const img = alumno.justificante; 
        doc.addImage(img, 'JPEG', 10, 50 + index * 30, 40, 40); // Ajusta las coordenadas y tamaño de la imagen
      }
    });

    doc.save('Asistencia.pdf');
  }

  actualizarJustificanteEnFirestore(alumnoId: string, url: string) {
    console.log("📤 Enviando URL a Firestore...");
    const body = { id: alumnoId, justificante: url };
  
    this.http.put('https://us-central1-lista-alumnos-18f61.cloudfunctions.net/updateJustificante', body)
      .subscribe({
        next: () => {
          console.log("✅ Justificante actualizado en Firestore con URL:", url);
          this.alumnos = this.alumnos.map(a =>
            a.id === alumnoId ? { ...a, justificante: url } : a
          );
        },
        error: error => console.error("❌ Error al actualizar en Firestore:", error)
      });
  }
  
  
}



