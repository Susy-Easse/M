class Aluno {
  constructor(name, affinity) {
  this.index=0
  this.name=name
  this.affinity=this.array_to_JSON(affinity)
  this.sprite=createSprite(0,0,0,0);this.sprite.depth=1
  this.sprite.onMousePressed=()=>{if(keyIsDown(17)){
  if(Drag==null && !writing && mouseButton=="left"){this.dragging(1)}
  if(mouseButton=="right" && this.name!="VAZIO"){this.showInfo()}}}//options
  this.sprite.onMouseOver=()=>{this.sprite.shapeColor="red"};this.sprite.onMouseOut=()=>{this.sprite.shapeColor=(this.name=="VAZIO"?"black":"#D5BA98")}
  this.sprite.onMouseMove=()=>{console.log("C")}
  if(this.name=="VAZIO"){this.sprite.shapeColor="black"}
  else{this.sprite.shapeColor="#D5BA98"
  this.input=createInput(this.name).size(0,0).position(0,0).class("customInput").attribute("placeholder","NOME");this.input.depth=2
  this.input.elt.onchange=()=>{this.name=this.input.value()}
  this.input.elt.onmouseleave=()=>{writing=false}
  this.input.elt.onmouseover=()=>{writing=true};this.input.elt.onmouseout=()=>{writing=false}
  
  this.inputInfo=undefined}
  }

  dragging(t){
    if(t==1){Drag=Students[this.index[0]][this.index[1]];this.sprite.position.x=mouseX; this.sprite.position.y=mouseY}
    
    if(t==0){var F=Math.ceil(mouseY*(Object.keys(Students).length)/height), C=Math.ceil(mouseX*(Object.keys(Students[F]).length)/width-1)
      if(Students[F]==undefined){Students[F]=[Students[this.index[0]].splice(this.index[1],1)[0]]}
      else{Students[F].splice(C,0,Students[this.index[0]].splice(this.index[1],1)[0])};this.index=[F,C];Drag=null
      Classe.relocateStudents()}
    }

  Remove(){this.sprite.remove();if(this.name!="VAZIO"){this.input.remove()}}

  Hide(){
    this.sprite.visible=false
    if(this.name!="VAZIO"){this.input.hide()}
  }
  Show(){
  this.sprite.visible=true
  if(this.name!="VAZIO"){this.input.show()}
  }  

  array_to_JSON(A){
    if(Array.isArray(A)==true){
    var J={}
for(var x=0;x<A.length/2;x+=1){
J[A[x*2]]=A[x*2+1]
}
return J}
else{return A}
}

JSON_to_array(A){var T=""
for(var E in A){if(T!=""){T+=',\n'};T+=E+":"+A[E]}
return T
}

Make_Affinity(A,o){var a={},x=0
  while(true){
    //console.log(A.slice(x,((A.indexOf(":",x)==-1||(A.indexOf(":",x)>A.indexOf(",",x) && A.indexOf(",",x)!=-1))?(A.indexOf(",",x)==-1?Object.keys(A).length:A.indexOf(",",x)):A.indexOf(":",x))))
    //x=((A.indexOf(":",x)==-1||(A.indexOf(":",x)>A.indexOf(",",x) && A.indexOf(",",x)!=-1))?(A.indexOf(",",x)==-1?Object.keys(A).length:A.indexOf(",",x)):A.indexOf(":",x))+1

  
  var Y = A.slice(x,((A.indexOf(":",x)==-1||(A.indexOf(":",x)>A.indexOf(",",x) && A.indexOf(",",x)!=-1))?(A.indexOf(",",x)==-1?Object.keys(A).length:A.indexOf(",",x)):A.indexOf(":",x)))
  x=((A.indexOf(":",x)==-1||(A.indexOf(":",x)>A.indexOf(",",x) && A.indexOf(",",x)!=-1))?(A.indexOf(",",x)==-1?Object.keys(A).length:A.indexOf(",",x)):A.indexOf(":",x))+1
  if(x==0||x==Object.keys(A).length||Y==""){return false}

  a[Y]=A.slice(x,((A.indexOf(":",x)==-1||(A.indexOf(":",x)>A.indexOf(",",x) && A.indexOf(",",x)!=-1))?(A.indexOf(",",x)==-1?Object.keys(A).length:A.indexOf(",",x)):A.indexOf(":",x)))
  x=((A.indexOf(":",x)==-1||(A.indexOf(":",x)>A.indexOf(",",x) && A.indexOf(",",x)!=-1))?(A.indexOf(",",x)==-1?Object.keys(A).length:A.indexOf(",",x)):A.indexOf(":",x))+1
  
  if(x==Object.keys(A).length+1 && o==0){return true}
  if(x==Object.keys(A).length+1 && o==1){return a}
}
}



 showInfo(){
  writing=true;for(var F in Students){for (var S in Students[F]){Students[F][S].Hide()}}
  if(this.inputInfo==undefined){//console.log(this.JSON_to_array(this.affinity))
  this.inputInfo=createInput(this.JSON_to_array(this.affinity)).size(width,height*0.75).position(0,0).class("customInput").attribute("placeholder","relações - MODELO:*NOME* : *RELAÇÃO* - Digite \"erro\" para sair")
  this.inputInfo.elt.onkeypress=(event)=>{if(event.keyCode==92){this.inputInfo.hide();for(var F in Students){for (var S in Students[F]){Students[F][S].Show()}}}}
  this.inputInfo.elt.onpointerleave=()=>{this.inputInfo.elt.value=this.inputInfo.elt.value.replace(/\s/g, "")
  setTimeout(()=>{
  if(this.Make_Affinity(this.inputInfo.elt.value,0)){this.inputInfo.hide(); this.affinity=this.Make_Affinity(this.inputInfo.elt.value,1); writing=false;for(var F in Students){for (var S in Students[F]){Students[F][S].Show()}}}
  else if(toLowwerCase(this.inputInfo.elt.value)=="erro"){this.inputInfo.hide();for(var F in Students){for (var S in Students[F]){Students[F][S].Show()}}}
  else{var B = this.inputInfo.elt.value; this.inputInfo.elt.value="Esses dados não são compativeis"; setTimeout(()=>{this.inputInfo.elt.value=B},3000)}
  },2500)}}
  else{this.inputInfo.show();this.inputInfo.elt.value=this.JSON_to_array(this.affinity)}

}

relocate(F,S,f,s){if(this.sprite.mouseIsPressed){return}
  this.sprite.position.x=(S*2+1)*width/(s*2)
  this.sprite.position.y=F*2*height/(f*2+1)
  this.sprite.width=width/(s*1.6)
  this.sprite.height=height/(f*5/3)
  this.sprite.setDefaultCollider()

  this.index=[F,S]
  if(this.name!="VAZIO"){this.input.size(this.sprite.width*7/8,this.sprite.height/2)
    this.input.position(this.sprite.position.x-this.sprite.width*7/16,this.sprite.position.y-this.sprite.height/4)}
}



}