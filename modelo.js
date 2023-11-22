// Modelo
class Modelo {
    constructor() {
        this.notas = this.cargarNotas();
    }

    agregarNota(titulo, texto, x, y) {
        const nota = {
            titulo,
            texto,
            creadaEn: Date.now(),
            x: x || 0,
            y: y || 0,
        };
        this.notas.push(nota);
        this.guardarNotas();
    }

    eliminarNota(titulo) {
        this.notas = this.notas.filter(nota => nota.titulo !== titulo);
        this.guardarNotas();
    }

    cargarNotas() {
        const notasGuardadas = localStorage.getItem('notas');
        return notasGuardadas ? JSON.parse(notasGuardadas) : [];
    }

    guardarNotas() {
        localStorage.setItem('notas', JSON.stringify(this.notas));
    }
}
