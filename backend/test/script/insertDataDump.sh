mongo --host mongodb:27017 <<EOF
use hexenverfolgung;
db.verfolgung.insert({
  "Name" : "Mustermann",
  "Vorname" : "Max",
  "Geburtsjahr":"310",
  "Sterbejahr":"321",
  "Ort":"Berlin",
  "Todesart":"Mensaessen",
  "Biographie":"Nur ein Testsatz"
})
EOF
