//	Enjoy!
var IE;
if(window.ActiveXObject){
	IE=true;
}else{
	IE=false;
}
function ajaxRequest(){
	if(window.XMLHttpRequest){
			return new XMLHttpRequest();
	}else{
		var activexmodes=["Msxml2.XMLHTTP", "Microsoft.XMLHTTP"];
		if(window.ActiveXObject){
			for (var i=0;i<activexmodes.length;i++){
				try{
					return new ActiveXObject(activexmodes[i]);
				}
				catch(e){
				}
			}
		}else{
			return false;
		}
	}
}
function ajaxToElement(url,id){
	var ajaxGrab=new ajaxRequest();
	ajaxGrab.open('GET',url,false);
	ajaxGrab.send(null);
	document.getElementById(id).innerHTML=ajaxGrab.responseText;
}
function ajaxGetXML(url){
	var ajaxGrabXML=new ajaxRequest();
	ajaxGrabXML.open('GET',url,false);
    ajaxGrabXML.setRequestHeader("Content-type", "text/xml");
	ajaxGrabXML.send(null);
	return ajaxGrabXML;
}
