var calculadora= {
  //mi objeto calculadoraFondo
  //

  init: function(){
    //inicializamos todo

    this.oPerandos=[];
    this.operacion="";
    this.ultimaOperacion="";
    this.contDigitos=0;
    this.nuMero=0;
    this.ultimoNumero=0;
    this.punto=false;
    this.signo=false;
    this.pantalla =  document.getElementById("display");


    this.agregarEvento();
  },
  agregarEvento: function(){
    var self=this;
    var tecla=document.querySelectorAll("[src^='image']");
    for(var i=0;i< tecla.length;i++){
        tecla[i].onmousedown = this.oprimirTecla;
        tecla[i].onmouseup = this.soltarTecla;
        tecla[i].addEventListener("click", function(id){


              if(Number(id.target.id)>0 && Number(id.target.id)<=9){
                var temp=0;
                  if(self.contDigitos<8){
                    self.nuMero=Number(id.target.id);
                    if(self.pantalla.innerHTML=="0"){

                      temp=self.nuMero;
                    }else{
                      temp=self.pantalla.innerHTML+self.nuMero;
                    }
                    self.imprimirOchodigitos(temp);
                  }else{
                    //si es mas de 7 no imprimir
                  }
                  self.nuMero=0;
                  self.contDigitos++;
              }else if(Number(id.target.id)==0){
                var temp=0;
                if(self.contDigitos<8){
                   if(self.pantalla.innerHTML!="0"){
                     temp=self.pantalla.innerHTML+self.nuMero;
                     self.imprimirOchodigitos(temp);
                   }

                }
                self.nuMero=0;
                self.contDigitos++;

              }else if(id.target.id=="punto") {
                if(self.contDigitos<8){
                  self.checarPunto();
                }
              }else if(id.target.id=="igual") {
                var result=0;
                var valor=0;
                var temp=0;
                  if(self.operacion=="suma"){
                    if(self.oPerandos.length>0){
                      for(var i=0;i<self.oPerandos.length;i++){
                           result=result + Number(self.oPerandos[i]);
                      }
                      self.nuMero=result;
                      valor=Number(self.pantalla.innerHTML);
                      self.ultimoNumero=valor;
                      self.ultimaOperacion=self.operacion;
                      self.operacion=""
                      temp=self.nuMero+valor;
                      self.imprimirOchodigitos(temp);
                    }
                  }else   if(self.operacion=="resta"){
                    if(self.oPerandos.length>0){
                      result=Number(self.oPerandos[0]);
                      for(var i=1;i<self.oPerandos.length;i++){
                           result=result - Number(self.oPerandos[i]);
                      }
                      self.nuMero=result;
                      valor=Number(self.pantalla.innerHTML);
                      self.ultimoNumero=valor;
                      self.ultimaOperacion=self.operacion;
                      self.operacion=""
                      temp=self.nuMero-valor;
                      self.imprimirOchodigitos(temp);
                    }

                  }else   if(self.operacion=="multiplicacion"){
                    if(self.oPerandos.length>0){
                      result=Number(self.oPerandos[0]);
                      for(var i=1;i<self.oPerandos.length;i++){
                           result=result * Number(self.oPerandos[i]);
                      }
                      self.nuMero=result;
                      valor=Number(self.pantalla.innerHTML);
                      self.ultimoNumero=valor;
                      self.ultimaOperacion=self.operacion;
                      self.operacion=""
                      temp=self.nuMero*valor;
                      self.imprimirOchodigitos(temp);
                    }

                  }else   if(self.operacion=="division"){
                    if(self.oPerandos.length>0){
                      result=Number(self.oPerandos[0]);
                      for(var i=1;i<self.oPerandos.length;i++){
                           result=result / Number(self.oPerandos[i]);
                      }
                      self.nuMero=result;
                      valor=Number(self.pantalla.innerHTML);
                      self.ultimoNumero=valor;
                      self.ultimaOperacion=self.operacion;
                      self.operacion=""
                      temp=self.nuMero/valor;
                      self.imprimirOchodigitos(temp);
                    }

                  }else if(self.operacion==""){
                    var valor=0;
                    var temp=0;
                    valor=Number(self.pantalla.innerHTML);
                    if(self.ultimaOperacion=="suma"){

                          temp= valor + self.ultimoNumero;
                    }else if(self.ultimaOperacion=="resta"){
                          temp=valor - self.ultimoNumero;
                    }else if(self.ultimaOperacion=="multiplicacion"){
                          temp= valor * self.ultimoNumero;
                    }else if(self.ultimaOperacion=="division"){
                          temp=valor / self.ultimoNumero;
                    }

                     self.imprimirOchodigitos(temp);
                  }
                  self.oPerandos=[];
              }else if(id.target.id=="mas") {
                  self.oPerandos.push(self.pantalla.innerHTML);
                  self.operacion="suma";
                  self.borrarPantalla();
              }else if(id.target.id=="menos") {
                self.oPerandos.push(self.pantalla.innerHTML);
                self.operacion="resta";
                self.borrarPantalla();
              }else if(id.target.id=="por") {
                self.oPerandos.push(self.pantalla.innerHTML);
                self.operacion="multiplicacion";
                self.borrarPantalla();
              }else if(id.target.id=="dividido") {
                self.oPerandos.push(self.pantalla.innerHTML);
                self.operacion="division";
                self.borrarPantalla();
              }else if(id.target.id=="raiz") {
                alert("Aun no esta implementada la raiz")
              }else if(id.target.id=="sign") {
                self.checarSigno();
              }else if(id.target.id=="on") {
                self.borrarPantalla();
              }


        });
    }
  },
  imprimirOchodigitos: function(numero){
    var texto="";
    texto=numero.toString();
    if(texto.length>8){
      texto=texto.substring(0,8);
    }
    this.pantalla.innerHTML=texto;

  },
  checarPunto: function(){
     var cadPantalla=this.pantalla.innerHTML;
     var signoEnc=false;
     for(var i=0;i<cadPantalla.length;i++){
       if(cadPantalla.charAt(i)=="."){
         signoEnc=true;
         break;
       }

     }
     if(signoEnc){
       //si tiene no hacemos nada
     }else{
       var temp= this.pantalla.innerHTML + ".";
     }
     this.imprimirOchodigitos(temp);
  },
  checarSigno: function(){
    var cadPantalla=this.pantalla.innerHTML;
    var signoEnc=false;
    for(var i=0;i<cadPantalla.length;i++){
      if(cadPantalla.charAt(i)=="-"){
        signoEnc=true;
        break;
      }

    }
    if(signoEnc){
      //si tiene el signo lo borramos
      var temp=this.pantalla.innerHTML.replace('-', '') ;
      signoEnc=false;
    }else{
      var temp="-" + this.pantalla.innerHTML ;
    }
    this.imprimirOchodigitos(temp);
  },
  borrarPantalla: function(){
     this.pantalla.innerHTML =  "0";
     this.nuMero=0;
     this.contDigitos=0;
     this.punto=false;
     this.signo=false;
     this.ultimaOperacion="";
     this.ultimoNumero=0;
  },
  asignarEventoOprimir: function(id){
    alert(self.operacion + "el contador tiene " + self.contDigitos);


  },
  imprimirTecla: function(){
     if((this.operacion="numeros") || (this.operacion="suma")) {
       if(this.contDigitos==0){
         this.pantalla.innerHTML =  this.nuMero;
       }else{
         this.pantalla.innerHTML = this.pantalla.innerHTML +  this.nuMero;
       }
     }else if(this.operacion="igual"){
       this.pantalla.innerHTML =  this.nuMero;
     }

    this.nuMero=0;
    this.contDigitos++;
  },
  oprimirTecla: function(id){

      if(id.target.id=="1" || id.target.id=="2" || id.target.id=="3" || id.target.id=="0" || id.target.id=="punto" || id.target.id=="igual" ){
          id.target.style.width= "27%";
          id.target.style.paddingRight="1px";
          id.target.style.paddingLeft="5px";
          id.target.style.paddingTop="2px";
          id.target.style.height="60.9px";
          id.target.style.marginRight="6px";
      }else if(id.target.id=="mas"){
          id.target.style.width= "88%";
          id.target.style.paddingRight="1px";
          id.target.style.paddingLeft="5px";
          id.target.style.paddingTop="2px";
          id.target.style.height="98%";
          id.target.style.marginRight="6px";
      }else{
      id.target.style.width= "20%";
      id.target.style.paddingRight="1px";
      id.target.style.paddingLeft="5px";
      id.target.style.paddingTop="2px";
      id.target.style.height="60.9px";
      id.target.style.marginRight="6px";
      }

    },
  soltarTecla: function(id){
      if(id.target.id=="1" || id.target.id=="2" || id.target.id=="3" || id.target.id=="0" || id.target.id=="punto" || id.target.id=="igual" ){
          id.target.style.width= "29%";
          id.target.style.paddingRight="0px";
          id.target.style.paddingLeft="0px";
          id.target.style.paddingTop="0px";
          id.target.style.height="62.91px";
          id.target.style.marginRight="0px";
      }else if(id.target.id=="mas"){
        id.target.style.width= "90%";
        id.target.style.paddingRight="0px";
        id.target.style.paddingLeft="0px";
        id.target.style.paddingTop="0px";
        id.target.style.height="100%";
        id.target.style.marginRight="0px";
      }else{
      id.target.style.width= "22%";
      id.target.style.paddingRight="0px";
      id.target.style.paddingLeft="0px";
      id.target.style.paddingTop="0px";
      id.target.style.height="62.91px";
      id.target.style.marginRight="0px";
      }
    }
}

calculadora.init();
