//const map = L.map('map-template').setView([-23.991082, -46.245781], 12);

const map = L.map('map-template', {
  zoomControl:false,
  minZoom: 12,
  maxZoom: 18,
  maxBounds:[[-35.287522, -60.375261],[-4.488519, -42.216003]],
  maxBoundsViscosity:1.0
//}).setView([-24.007480,-46.440910],15);
}).setView([-23.995202, -46.253279],14);


const socket = io();

const titleURL = 'http://c.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png';

const titleURL2 = 'https://b.tile.openstreetmap.de/{z}/{x}/{y}.png';

L.tileLayer(titleURL).addTo(map);


//Minha localização pelo socket
map.locate({enableHighAccuracy: true});
map.on('locationfound', e => {
  const coords = [e.latlng.lat, e.latlng.lng];
 const marker = L.marker(coords);
 marker.bindPopup('<p class="pulse" style="font-size:10px;background:green;border-radius:20px;">Local</p>');
 map.addLayer(marker);
socket.emit('userCoordinates', e.latlng);
});


//Localização dos outros usuário com as coodernadas
socket.on('newUserCoordinates', (coords) => {
console.log('Outro usuário conectado');
const marker = L.marker([coords.lat + 500, coords.lng + 500]);
marker.bindPopup('<p>+ Conectados</p>');
map.addLayer(marker);
});


//Border radius da localizaçã box-shadow: 0 3px 14px rgba(0,0,0,0.2);border-radius:100%;background:#182338;
//https://stackoverflow.com/questions/41590102/change-leaflet-marker-icon
function onLocationFound(e) {
  var radius = e.accuracy / 0;
  var locationMarker = L.marker(e.latlng, {icon: century21icon}).addTo(map)
  .bindPopup('<p><span style="font-size:30px;">&#128664;</span></p>').openPopup();
          //.bindPopup('<p style="width:50%;padding:3px;border-radius:50%;font-size:19px;z-index:1;">&#129489;</p>' + radius + '').openPopup();
  var locationCircle = L.circle(e.latlng, radius).addTo(map);
}
function onLocationError(e) {
  alert(e.message);
}
  function onLocationError(e) {
  //alert(e.message);
   alert("Ative o serviço de localização do seu dispositivo e, acompanhe sua localização!");
          return false;
}
map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);
  map.locate({setView: true, maxZoom: 16});
//End


/*
//TAMBÉM OUTRO MARCADOR DE LOCALIZAÇÃO DO USUARIOS GEOLOCALIZAÇÃO ACIMA
var century21icon = L.icon({iconUrl: 'img/marker-icon2.png',iconSize: [25, 41]});
var maker = L.marker([-23.464559, -46.660153],{icon: century21icon}).addTo(map);
//INCLUI COORDENADAS ALEATORIAS
L.marker([-23.997062,-46.256699],{title: 'Janeiro 25, 2019 Desastre de Brumadinho'}).bindPopup('<p><span style="font-size:30px;">&#128664;</span></p>').addTo(map);
//L.marker([-23.997767, -46.258066]).bindPopup('<p><span style="font-size:30px;"></span></p>').addTo(map);
//END
*/


//3 geolocalização do usuário
document.addEventListener('DOMContentLoaded', function(){
  var target = document.querySelector('#map');
  navigator.geolocation.getCurrentPosition(function(position) {
  var latitude   = position.coords.latitude;
  var longitude  = position.coords.longitude;
  var coordinate = new L.marker([latitude, longitude], {icon: century21icon}).addTo(map).bindPopup('<span style="font-size:30px;>&#128663;</span>').openPopup();
   window.alert('Ative o serviço de localizaão do seu dispositivo!');
           
  });           
  });

// 2 - GEOLOC E ERRO
if('geolocation' in navigator){
/*Localizar e erro*/
navigator.geolocation.getCurrentPosition(function(position){
  console.log(position)
}, function(error){
  console.log(error)
    })

    const watcher = navigator.geolocation.watchPosition(function(position){
        console.log(position)
    }, function(error){
        console.log(error)
    }, {enableHighAccuracy: true, maximumAge: 30000, timeout: 30000},)
    navigator.geolocation.clearWatch(watcher)
}else{
   alert('Não foi possível pegar sua localização!')
};





//INICIO DO NOVO CODIGO EM JSON LINK CONEXÃO COM BANCO DE DADOS
//var url = 'Points1.json';
const url = 'https://www.tenvagas.com.br/app/gfguserdetails.json';
  ///   For reading a JSON file   
  const myPts = L.layerGroup();
  $.getJSON(url, function (data) {
    for (i = 0; i < data.length; i++) {
      var coords = data[i].latlng;
      var a = coords.split(",");
      var lat = parseFloat(a[0]);
      var lng = parseFloat(a[1]);
      var Line1 = data[i].numero;
      var Line7 = data[i].nome_id;
      var Line4 = data[i].foto;
      var Line9 = data[i].endereco;
      //var Line8 = data[i].usuarios;
      var x = L.marker([lat, lng]).bindPopup('<p><span>'+Line9+'</span><img src=' + Line4 + ' class="close - vert-move"  width="40"/><span class="circle">' + Line1 + '</span><br><b class="pulse">' + Line7 + '</b>');
      myPts.addLayer(x);

    }
  });
  myPts.addTo(map);

//  End reading a JSON file

// Read the HTML Textboxes and plots the data as points
function goBtn() {
var theLatValue = document.getElementById("Ypt").value;
var theLonValue = document.getElementById("Xpt").value;
var theNameValue = document.getElementById("Name").value;
L.marker([parseFloat(theLatValue ),parseFloat(theLonValue)]).bindPopup("<b>Name: </b>" + theNameValue ).addTo(map);
}
//EMD


//SELECTOR DOS LOCAIS E ZOOM
document.getElementById('select-location').addEventListener('change', function(e){
  let coords = e.target.value.split(",");
  map.flyTo(coords, 13);
})

