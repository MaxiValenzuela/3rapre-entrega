class Funciones {
    constructor(movies) {
        this.movies = movies;
        this.cargarPeliculasDesdeStorage();
    }

    filtrarCategoria(categoriaSeleccionada) {
        let movieFilter = [];
        let alerta = '';

        switch (categoriaSeleccionada) {
            case '1':
                movieFilter = this.movies.filter(movie => movie.categoria === 'Accion');
                alerta = 'Acción - Películas encontradas:';
                break;
            case '2':
                movieFilter = this.movies.filter(movie => movie.categoria === 'Anime');
                alerta = 'Anime - Películas encontradas:';
                break;
            case '3':
                movieFilter = this.movies.filter(movie => movie.categoria === 'Romantica');
                alerta = 'Romántica - Películas encontradas:';
                break;
            case '4':
                movieFilter = this.movies.filter(movie => movie.categoria === 'Terror');
                alerta = 'Terror - Películas encontradas:';
                break;
            default:
                alert('Por favor ingrese una opción numérica correcta');
                return;
        }

        this.mostrarPeliculas(movieFilter, alerta);
    }

    filtrarPrecio(rangoDePrecio) {
        if (isNaN(rangoDePrecio) || rangoDePrecio <= 0) {
            alert('Por favor ingresa un monto válido');
            return;
        }

        const precioDeFiltrado = this.movies.filter(movie => movie.precio <= rangoDePrecio);
        const alerta = `Películas encontradas de hasta ${rangoDePrecio} USD:`;
        this.mostrarPeliculas(precioDeFiltrado, alerta);
    }

    mostrarPeliculas(peliculas, titulo) {
        const resultados = document.getElementById('resultados');
        resultados.innerHTML = `<h2>${titulo}</h2>`;
        peliculas.forEach((movie, index) => {
            resultados.innerHTML += `<p>${index + 1}. ${movie.nombre} - Precio: ${movie.precio} USD - Duración: ${movie.duracion}</p>`;
        });
    }

    guardarPeliculasEnStorage() {
        localStorage.setItem('movies', JSON.stringify(this.movies));
    }

    cargarPeliculasDesdeStorage() {
        const moviesFromStorage = JSON.parse(localStorage.getItem('movies'));
        if (moviesFromStorage) {
            this.movies = moviesFromStorage;
        }
    }
}

let setId = 1;

class Movie {
    constructor(nombre, precio, duracion, categoria) {
        let tipoDePelicula = [
            'Accion',
            'Anime',
            'Romantica',
            'Terror'
        ];

        this.id = setId++;
        this.nombre = nombre;
        this.precio = precio;
        this.duracion = duracion;
        this.categoria = tipoDePelicula[categoria];
    }
}

let movies = [
    new Movie('Duro de matar', 3500, '2 horas', 0),
    new Movie('Rapidos y Furiosos', 2500, '1 hora 50 min', 0),
    new Movie('My Hero Academia : You are next', 7000, '2 horas 20 min', 1),
    new Movie('Como si fuera la primera vez', 1500, '3 horas', 2),
    new Movie('Marry me', 1000, '1 hora  30 min', 2),
    new Movie('Dragon Ball Super: Broly', 5000, '2 horas 20 min', 1),
    new Movie('La llamada', 2500, '2 horas', 3),
    new Movie('Insidius', 3000, '1 hora', 3),
    new Movie('Transformers', 1550, '2 horas', 0),
    new Movie('Demon Slayer: Arco del tren infinito', 8000, '2 horas 45 minutos', 1),
    new Movie('Anabel', 800, '1 hora 10 min', 3),
    new Movie('Gurren Laggan', 10000, '3 horas', 1),
];

const datos = new Funciones(movies);
datos.guardarPeliculasEnStorage();

document.getElementById('seleccionar-btn').addEventListener('click', () => {
    const opcion = document.getElementById('opcion').value;
    const categoriaDiv = document.getElementById('categoria');
    const precioDiv = document.getElementById('precio');

    if (opcion === '1') {
        categoriaDiv.classList.remove('oculto');
        precioDiv.classList.add('oculto');
    } else if (opcion === '2') {
        categoriaDiv.classList.add('oculto');
        precioDiv.classList.remove('oculto');
    }
});

document.getElementById('categoria-btn').addEventListener('click', () => {
    const categoria = document.getElementById('categoria-select').value;
    datos.filtrarCategoria(categoria);
});

document.getElementById('precio-btn').addEventListener('click', () => {
    const precio = parseInt(document.getElementById('precio-input').value);
    datos.filtrarPrecio(precio);
});
