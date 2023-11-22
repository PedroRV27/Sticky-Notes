// Vista
class Vista {
    constructor(modelo, elemento) {
        this.modelo = modelo;
        this.elemento = elemento;

        document.addEventListener('mousedown', (e) => this.enMouseDownNota(e));
        document.addEventListener('mouseup', () => this.enMouseUpNota());
    }

    renderizar() {
        this.elemento.innerHTML = '';

        this.modelo.notas.forEach(nota => {
            const elementoNota = document.createElement('div');
            elementoNota.className = 'nota';
            elementoNota.innerHTML = `
                <h3>${nota.titulo}</h3>
                <p>${nota.texto}</p>
                <p>${this.calcularTiempoTranscurrido(nota.creadaEn)}</p>
                <button onclick="controlador.eliminarNota('${nota.titulo}')">Eliminar</button>
            `;
            elementoNota.draggable = true;
            elementoNota.addEventListener('mousedown', (e) => this.enMouseDownNota(e, elementoNota, nota));
            this.elemento.appendChild(elementoNota);
o
            if (nota.x && nota.y) {
                elementoNota.style.transform = `translate(${nota.x}px, ${nota.y}px)`;
            }
        });
    }

    calcularTiempoTranscurrido(creadaEn) {
        const tiempoTranscurrido = Math.floor((Date.now() - creadaEn) / (60 * 1000));
        return `Creada hace ${tiempoTranscurrido} minutos`;
    }

    enMouseDownNota(evento, elementoNota, nota) {
        const offsetX = evento.clientX - elementoNota.getBoundingClientRect().left;
        const offsetY = evento.clientY - elementoNota.getBoundingClientRect().top;

        const enMouseMoveNota = (e) => {
            elementoNota.style.transform = `translate(${e.clientX - offsetX}px, ${e.clientY - offsetY}px)`;
        };

        const enMouseUpNota = () => {
            document.removeEventListener('mousemove', enMouseMoveNota);
            document.removeEventListener('mouseup', enMouseUpNota);

            const transform = elementoNota.style.transform;
            const [x, y] = this.extraerCoordenadas(transform);

            nota.x = x;
            nota.y = y;
            this.guardarEnLocalStorage();
        };

        document.addEventListener('mousemove', enMouseMoveNota);
        document.addEventListener('mouseup', enMouseUpNota);
    }

    enMouseUpNota() {
        this.guardarEnLocalStorage();
    }

    extraerCoordenadas(transform) {
        const matches = transform.match(/translate\((\S+)px, (\S+)px\)/);
        return matches ? [parseInt(matches[1]), parseInt(matches[2])] : [0, 0];
    }

    guardarEnLocalStorage() {
        this.modelo.guardarNotas();
    }
}
