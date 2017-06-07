mongo --host mongodb:27017 <<EOF
use hexenverfolgung;
db.verfolgung.insert([{
  "Name" : "Mustermann",
  "Vorname" : "Max",
  "Geburtsjahr":"310",
  "Sterbejahr":"321",
  "Ort":"Berlin",
  "Todesart":"Mensaessen",
  "Biographie":"Nur ein Testsatz"
},{
  "Name" : "Mustermann",
  "Vorname" : "karl",
  "Sterbejahr":"321",
  "Ort":"Berlin",
  "Biographie":"Nur ein Testsatz",
  "Geschlecht":"männlich",
  "verurteilt": false
}])
EOF
