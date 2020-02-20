function calculate(){
			//recuperer les valeurs des input
			var A1=document.getElementById('A1').value;
			var A2=document.getElementById('A2').value;
			var A3=document.getElementById('A3').value;
			var A4=document.getElementById('A4').value;
			var A5=document.getElementById('A5').value;
			var A6=document.getElementById('A6').value;
			var A7=document.getElementById('A7').value;
			var A8=document.getElementById('A8').value;

			//Verifier si les entrer sont valide
			if(
				1
			){

				//Masque 4 input
			var masque = [];
			masque = A5 + "." + A6 + "." + A7 + "." + A8;
			masque = masque.split('.');
			masque[0] = parseInt(masque[0]).toString(2);
			masque[1] = parseInt(masque[1]).toString(2);
			masque[2] = parseInt(masque[2]).toString(2);
			masque[3] = parseInt(masque[3]).toString(2);

			var masque2 = masque[0] + masque[1] + masque[2] + masque[3];
			var masque1 = 0;

			for(i=0; i<32; i++)
			{
				if(masque2[i] == 1)
					{
						masque1 += 1;
					}
			}
			

			//Afficher adresse IP
			document.getElementById('resultatIP').innerHTML=A1 + "." + A2 + "." + A3 + "." + A4;

			//@IP en Binaire pour deduire la classe
			var ipBin={};
			ipBin[1]=String("00000000"+parseInt(A1,10).toString(2)).slice(-8);
			ipBin[2]=String("00000000"+parseInt(A2,10).toString(2)).slice(-8);
			ipBin[3]=String("00000000"+parseInt(A3,10).toString(2)).slice(-8);
			ipBin[4]=String("00000000"+parseInt(A4,10).toString(2)).slice(-8);

			//deduire La class Adresse
			var classeStandard="";
			if(A1<=126) {
				classeStandard="A";
			}else if (A1==127) {
				classeStandard="boucle ip";
			}else if (A1>=128 && A1<=191) {
				classeStandard="B";
			}else if (A1>=192 && A1<=223) {
				classeStandard="C";
			}else if (A1>=224 && A1<=239) {
				classeStandard="D (Multicast adresseess)";
			}else if (A1>=240 && A1<=225) {
				classeStandard="E (Experimental)";
			}else {
				classeStandard="depassement";
			}

			//masque
			var mask=masque1;
			var BlockImportant=Math.ceil(mask/8);
			var BlockImportantBinary=ipBin[BlockImportant];
			var MasqueBinaire=mask%8;
			if(MasqueBinaire==0)BlockImportant++;
			var maskBinaryBlock="";
			var maskBlock="";
			for(var i=1;i<=8;i++){
			if(MasqueBinaire>=i){
				maskBinaryBlock+="1";
			}else{
				maskBinaryBlock+="0";
			}
			}
			//convertir masque en binaire
			maskBlock=parseInt(maskBinaryBlock,2);

			//id reseau et diffusion
			var netBlockBinary="";
			var bcBlockBinary="";
			for(var i=1;i<=8;i++){
			if(maskBinaryBlock.substr(i-1,1)=="1"){
				netBlockBinary+=BlockImportantBinary.substr(i-1,1);
				bcBlockBinary+=BlockImportantBinary.substr(i-1,1);
			}else{
				netBlockBinary+="0";
				bcBlockBinary+="1";
			}
			}

			//tout mettre ensemble, creations des variables
			var mask="";
			var maskBinary="";
			var net="";
			var bc="";
			var netBinary="";
			var bcBinary="";
			var rangeA="";
			var rangeB="";
			//mettre les chaine emsemble
			for(var i=1;i<=4;i++){
			if(BlockImportant>i) {
			
			mask+="255";
			maskBinary+="11111111";
			netBinary+=ipBin[i];
			bcBinary+=ipBin[i];
			net+=parseInt(ipBin[i],2);
			bc+=parseInt(ipBin[i],2);
			rangeA+=parseInt(ipBin[i],2);
			rangeB+=parseInt(ipBin[i],2);
			}else if (BlockImportant==i) {
				//le bloc important
				mask+=maskBlock;
				maskBinary+=maskBinaryBlock;
				netBinary+=netBlockBinary;
				bcBinary+=bcBlockBinary;
				net+=parseInt(netBlockBinary,2);
				bc+=parseInt(bcBlockBinary,2);
				rangeA+=(parseInt(netBlockBinary,2)+1);
				rangeB+=(parseInt(bcBlockBinary,2)-1);
			}else {
				
				mask+=0;
				maskBinary+="00000000";
				netBinary+="00000000";
				bcBinary+="11111111";
				net+="0";
				bc+="255";
				rangeA+=0;
				rangeB+=255;
			}
			//ajouter un point pour separer les blocs
			if(i<4){
				mask+=".";
				maskBinary+=".";
				netBinary+=".";
				bcBinary+=".";
				net+=".";
				bc+=".";
				rangeA+=".";
				rangeB+=".";
			}
			}
			//afficher les resultat sur la page
			document.getElementById('resultatMasque').innerHTML=mask;
			document.getElementById('resultatReseau').innerHTML=net;
			document.getElementById('resultatDiffusion').innerHTML=bc;
			document.getElementById('PlageAdresse').innerHTML=rangeA + " - " + rangeB;
			document.getElementById('ClasseIP').innerHTML=classeStandard;
			}else{
				alert("entrée invalide");
			}
			}

document.oncontextmenu = new Function("return false");

function suivant(enCours, suivant, limite)
  {
  if (enCours.value.length == limite)
    document.code[suivant].focus();
  }

function verifierCaracteres(event) {
	 		
	var keyCode = event.which ? event.which : event.keyCode;
	var touche = String.fromCharCode(keyCode);
			
	var champ = document.getElementById('mon_input');
			
	var caracteres = '0123456789';
			
	if(caracteres.indexOf(touche) >= 0) {
		champ.value += touche;
	}
			
}