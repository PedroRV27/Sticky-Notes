const controlador = {
    cambiarVista: function() {

        console.log('Cambiar vista');
    },

    crearNota: function(titulo, texto) {
        modelo.agregarNota(titulo, texto);
        vista.renderizar();
    },

    eliminarNota: function(titulo) {
        modelo.eliminarNota(titulo);
        vista.renderizar();
    }
};


const modelo = new Modelo();
const vista = new Vista(modelo, document.getElementById('app'));

vista.renderizar();


document.getElementById('crear-nota').addEventListener('click', () => {
    abrirModal('modal-crear-nota');
});

function abrirModal(idModal) {
    const modal = document.getElementById(idModal);
    modal.style.display = 'block';
}

function cerrarModal() {
    const modales = document.getElementsByClassName('modal');
    Array.from(modales).forEach(modal => modal.style.display = 'none');
}

function crearNota() {
    const titulo = document.getElementById('titulo').value;
    const texto = document.getElementById('texto').value;

    if (titulo && texto) {
        controlador.crearNota(titulo, texto);
        cerrarModal();
    }
}