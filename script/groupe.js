var main = document.getElementById('main');
//fonction utilisé par groupe.html
function listeGroupe() {
  for (var i=1; i < 4; i++){
    var xhr = new XMLHttpRequest();
    xhr.open("GET",'../ressource/groupe'+i+'.json', false);
    xhr.send(null);
    var groupJsonData = xhr.responseText;
    var group = JSON.parse(groupJsonData);
    //mise en place des colonnes
    var col = document.createElement('div');
    col.className = 'groupe';
    main.appendChild(col);
    //mise en place du titre groupe
    var titleContainer = document.createElement('div');
    titleContainer.id = 'titleContainer';
    col.appendChild(titleContainer);
    var title = document.createElement('p');
    title.innerHTML = "Groupe " + i;
    titleContainer.appendChild(title);
    //mise en place de la liste
    var member = group.groupe.length;
    //mise en place de la photo miniature
    for (var i2=0; i2 < member; i2++) {
      var contactTile = document.createElement('div');
      contactTile.className = 'contactTileList';
      col.appendChild(contactTile);
      //mise en place de l'image
      var photo = document.createElement('img');
      if (group.groupe[i2].photo === 'none'){
        
      }
      else {
        photo.src = '../photo/'+group.groupe[i2].photo;
      }
      contactTile.appendChild(photo);
      //mise en place du nom
      var contactName = document.createElement('p');
      contactName.innerHTML = group.groupe[i2].name;
      contactTile.appendChild(contactName);
    }
  }
}
//fonction utilisé par groupe[1,2,3].html
function groupe (groupe) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", '../ressource/' + groupe + '.json', false);
  xhr.send(null);
  var groupJsonData = xhr.responseText;
  var groupData = JSON.parse(groupJsonData);
  var member = groupData.groupe.length;
  //boucle de création des fiches contact
  for (var i=0; i < member; i++) {
    //tuile contact
    var contactTile = document.createElement('div');
    contactTile.className = 'contactLayout';
    main.appendChild(contactTile);
    //mise en place de la photo
    var photoContainer = document.createElement('div');
    photoContainer.id = 'photo';
    contactTile.appendChild(photoContainer);
    var photo = document.createElement('img');
    if (groupData.groupe[i].photo == "none") {
      
    }
    else {
      photo.src = '../photo/'+groupData.groupe[i].photo;
    }
    photoContainer.appendChild(photo);
    //mise en place du boutton
    var extendButton = document.createElement('div');
    extendButton.id = 'extendButton';
    extendButton.style.backgroundColor = groupData.groupe[i].color;
    contactTile.appendChild(extendButton);
    //mise en place du nom
    var nameContainer = document.createElement('div');
    nameContainer.id = 'contactName';
    contactTile.appendChild(nameContainer);
    var name = document.createElement('p');
    name.innerHTML = groupData.groupe[i].name;
    nameContainer.appendChild(name);
  }
}