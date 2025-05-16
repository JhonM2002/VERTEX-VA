import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  showHeaderFooter: boolean = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Monitorea cambios en la ruta
    this.router.events.subscribe(() => {
      const currentRoute = this.router.url;

      // Oculta el header y footer si la ruta es '/game'
      this.showHeaderFooter = currentRoute !== '/game';
    });
  }
}
