import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listaalumnos',
  templateUrl: './listaalumnos.page.html',
  styleUrls: ['./listaalumnos.page.scss'],
})
export class ListaAlumnosPage implements OnInit {
  alumnos: { nombre: string; presente: boolean }[] = [];
  nuevoAlumno: string = '';

  constructor() {}

  ngOnInit() {
    // Lista inicial de 10 alumnos
    this.alumnos = [
      { nombre: 'Juan Pérez', presente: false },
      { nombre: 'Ana López', presente: false },
      { nombre: 'Carlos García', presente: false },
      { nombre: 'María Rodríguez', presente: false },
      { nombre: 'Luis Hernández', presente: false },
      { nombre: 'Laura Gómez', presente: false },
      { nombre: 'José Sánchez', presente: false },
      { nombre: 'Claudia Díaz', presente: false },
      { nombre: 'Pedro Ramírez', presente: false },
      { nombre: 'Sofía Torres', presente: false },
    ];
  }

  agregarAlumno() {
    if (this.nuevoAlumno.trim()) {
      this.alumnos.push({ nombre: this.nuevoAlumno.trim(), presente: false });
      this.nuevoAlumno = '';
    }
  }

  eliminarAlumno(index: number) {
    this.alumnos.splice(index, 1);
  }

  // Método para calcular presentes y ausentes
  obtenerResumen() {
    const presentes = this.alumnos.filter((alumno) => alumno.presente).length;
    const ausentes = this.alumnos.length - presentes;
    return { presentes, ausentes };
  }
}
