var canvas
var Students
var Change1="";
var Drag=null
var relationColor={
"amigos":"rgba(64,96,196,1)",
"namorados":"rgba(255,32,196,1)",
"rivais":"purple",
"colegas":"gray",
"engraçados":"yellow",
}
var noise
var writing=false
var Classe
var groups={

}

function preload(){ 

}
function setup() {
canvas = createCanvas(windowWidth, windowHeight)
Classe=new Class_Map()
if(Students==undefined){Students={
1:[new Aluno("TESTE1",[]),new Aluno("TESTE2",[])],
2:[new Aluno("TESTE3",[]),new Aluno("TESTE4",[])]
}
}



var d = groups
for(var D in d){for(var DD in d[D]){for(var a in d[D][DD]){
for(var b in d[D][DD]){
if(a!=b){addFriends(d[D][DD][a],d[D][DD][b],D)}
}}}}

Classe.relocateStudents()
noise=createElement("h2").size(width/2,height/16).position(width/4, -height/32).class("greeting").html("Suposição de Barulho:0")
    }

function draw() {
background("white")
rect(0,0,width,-height/32+height/16*1.5)
//var S = createSprite(windowWidth/2, windowHeight/2, windowWidth/2, windowHeight/2)
if(Object.keys(Students).length>0){for(var F in Students){line(0,(F*2+1)*height/(Object.keys(Students).length*2+1),width,(F*2+1)*height/(Object.keys(Students).length*2+1))}

if(keyWentDown("D") && !writing){Classe.createClassfromData()}
if(keyWentDown("L")){console.log("LISTA DE ALUNOS: ");console.log(giveList())}
if(Drag!=null){Drag.dragging((Drag.sprite.mouseIsPressed?1:0))}
//if(Drag!=null && !writing && mouseIsPressed){drag(Drag)}else{if(Drag!=null && !writing){changeSeats(Drag, [Math.ceil(mouseY*(Object.keys(Students).length)/height),Math.ceil(mouseX*(Object.keys(Students[Math.ceil(mouseY*(Object.keys(Students).length)/height)]).length)/width)])};Drag=null}
//console.log(Students[1][0].sprite.mouseIsOver)
relations()

drawSprites()}
}

function keyPressed() {
if(!writing){Classe.changes_Student(keyCode)}
}

function drag(target){Drag=target
target[0].position.x=mouseX
target[0].position.y=mouseY


}

function changeSeats(oldInfo, newInfo){
var old=Students[oldInfo[1][0]][oldInfo[1][1]]
Students[oldInfo[1][0]].splice(oldInfo[1][1],1)

if(Students[newInfo[0]]==undefined){Students[newInfo[0]]=[old]}
else{Students[newInfo[0]].splice(newInfo[1],0,old)}

Classe.relocateStudents()
}

function AES(){
AllegedExchangeOfStudents=(()=>{

},7500)
    
}

function relations(){strokeWeight(5)
var relations={
    "amigos":0,
    "namorados":0,
    "rivais":0,
    "colegas":0,
    "engraçados":0,
}
for(var F=1;F<Object.keys(Students).length+1;F+=1){for(var S=0;S<Object.keys(Students[F]).length;S+=1){if(Students[F][S]==undefined){break}if(Students[F][S].name=="VAZIO"){continue}
var S1=Students[F][S].sprite.position

stroke("white")
/*LATERAL*/ if(Students[F][S+1]!=undefined && Students[F][S+1].name!="VAZIO"){var S2=Students[F][S+1].sprite.position;
if(Students[F][S].affinity[Students[F][S+1].name]!=undefined){stroke(relationColor[Students[F][S].affinity[Students[F][S+1].name]]); relations[Students[F][S].affinity[Students[F][S+1].name]]+=1; line(S1.x,S1.y,S2.x,S2.y)}}

if(Students[F+1]!=undefined){for(var Ss=0;Ss<Object.keys(Students[F+1]).length;Ss+=1){if(Students[F+1][Ss]==undefined){break};if(Students[F+1][Ss].name=="VAZIO"){continue};var Ss2=Students[F+1][Ss].sprite.position;
if(S==Ss+1||S==Ss-1||S==Ss){
if(Students[F][S].affinity[Students[F+1][Ss].name]!=undefined){stroke(relationColor[Students[F][S].affinity[Students[F+1][Ss].name]]) ;relations[Students[F][S].affinity[Students[F+1][Ss].name]]+=1; line(S1.x,S1.y,Ss2.x,Ss2.y)}}}}

}}
StudentsNoise(relations)
}

function StudentsNoise(x){
var Noise=0, TotalStudents=0
for(var F in Students){for (var S in Students[F]){if(Students[F][S].name!="VAZIO"){TotalStudents+=1;continue}}}

Noise+=x["amigos"]*1.5
Noise+=x["engraçados"]*1.75
Noise+=x["namorados"]*2



Noise/=TotalStudents
noise.html("Suposição de Barulho: "+Noise)
}

function giveList(){
var text='['

for(var F=1;F<Object.keys(Students).length+1;F+=1){text+=(F+',[')
    
    for(var S=0;S<Object.keys(Students[F]).length;S+=1){
    text+=('new Aluno("'+(Students[F][S].name)+'",[')
       for(var R in Students[F][S].affinity){if(Object.keys(Students[F][S].affinity).length==0){break};var r=0
          text+='"'+(R)+'","'+(Students[F][S].affinity[R])+'"'
          if(!(r+1==Object.keys(Students[F][S].affinity).length)){text+=', '};r+=1
       }
       text+='])'
    if(S+1==Object.keys(Students[F]).length){text+=']'}else{text+=','}
    }
    
if(F<Object.keys(Students).length){text+=', '}
}
text+=']'

return text
}

function array_to_JSON(A){
    if(Array.isArray(A)==true){
    var J={}
for(var x=0;x<A.length/2;x+=1){

J[A[x*2]]=A[x*2+1]
}

return J}
else{return A}
}


function addFriends(A,B,C){
A.affinity[B.name]=C
B.affinity[A.name]=C
}