class Class_Map{
constructor(){
this.enviar=createButton("ENVIAR").size(width/8, height/16).position(0, height*7/16).class("customButton").mousePressed((input=this.input,button=this.enviar)=>{Students=array_to_JSON(eval(input.value()));input.hide();input.visible=false;button.hide();writing=false;setup()})
this.input=createInput("MODELO:\n[*FILEIRA*, [new Aluno(*NOME*,[]), new Aluno(*NOME*,[])]]").size(width,height/4).position(0,height/2).class("customInput").attribute("placeholder","DADOS")
this.input.elt.onmouseover=()=>{writing=true};this.input.elt.onmouseout=()=>{writing=false}

this.input.hide();this.enviar.hide();this.input.visible=false
}

testStudentss(){

}
changes_Student(T){
var F=Math.ceil((mouseY-height/64)/((height*378)/(Object.keys(Students).length*320)-height/32))

/*BAIXO*/if(T==38){for(var S in Students[Object.keys(Students).length]){Students[Object.keys(Students).length][S].Remove()}; delete Students[Object.keys(Students).length]}
/*CIMA*/if(T==40){Students[Object.keys(Students).length+1]=[]}
/*A*/if(T==65){Students[F].push(new Aluno("TESTE",[]))}
/*V*/if(T==86){Students[F].push(new Aluno("VAZIO",[]))}
/*X*/if(T==88){this.removeStudent(F,Math.ceil(mouseX*(Object.keys(Students[1]).length)/width-1));}
this.relocateStudents()
}
removeStudent(F,C){
if(!(mouseY>0&&mouseY<height&&mouseX>0&&mouseX<width)){return}
if(Object.keys(Students).length<=0){return}if(Students[F]==undefined){return}if(Students[F][C]==undefined){return}
Students[F][C].Remove(); Students[F].splice(C,1)
//relocateStudents()

}

async createClassfromData(){writing=true
for(var F in Students){for (var S in Students[F]){Students[F][S].Remove()}; delete Students[F]}
this.input.size(width,height/4).position(0,height/2);this.input.show();this.input.visible=true;this.enviar.show()
}

classList(){
var text='['

for(var F=1;F<Object.keys(Students).length+1;F+=1){text+=(F+',[')
    
    for(var S=0;S<Object.keys(Students[F]).length;S+=1){
    text+=('new Aluno("'+(Students[F][S].name)+'",[')
       for(var R in Students[F][S].affinity){if(Object.keys(Students[F][S].affinity).length==0){break};var r=0
          text+='"'+(R)+'","'+(Students[F][S].affinity[R])+'"'
          if(!(r+1==Object.keys(Students[F][S].affinity).length)){text+=', '};r+=1
       }
       text+='])'
    if(S+1<=Object.keys(Students[F]).length){text+=','}
    }text+=']'
    
if(F<Object.keys(Students).length){text+=', '}
}
text+=']'

return text
}

relocateStudents(){for(var F in Students){for(var S in Students[F]){Students[F][S].relocate(F,S,Object.keys(Students).length,Object.keys(Students[F]).length)}}}

}