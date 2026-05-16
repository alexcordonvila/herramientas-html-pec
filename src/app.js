import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

function inicializarMapa() {
    const map = L.map('map').setView([43.2592, -2.9234], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    const iconoRojo = L.icon({
        iconUrl: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
        iconSize: [32, 32],       
        iconAnchor: [16, 32],     
        popupAnchor: [0, -32]     
    });

    const restaurantes = [
        { nombre: "Sorginzulo", coords: [43.25917199000633, -2.922241508123606] },   
        { nombre: "Gure Toki", coords: [43.259408168013366, -2.9222869155195283] },     
        { nombre: "Bar Café Bilbao", coords: [43.258800353147464, -2.9223752052448053] },
        { nombre: "La Olla", coords: [43.25926025853342, -2.923020637480803] },        
        { nombre: "Motrikes", coords: [43.25716966321141, -2.92252020386315] },       
        { nombre: "El Globo", coords: [43.262020331052945, -2.932698551237728] }         
    ];

    restaurantes.forEach(res => {
        L.marker(res.coords, { icon: iconoRojo }) 
         .addTo(map)
         .bindPopup(`<b>${res.nombre}</b>`);
    });
}

const mapElement = document.getElementById('map');

if (mapElement) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                inicializarMapa();  
                observer.disconnect();
            }
        });
    }, {
        rootMargin: '200px' 
    });

    observer.observe(mapElement);
}