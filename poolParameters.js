//	Enjoy!
function trimStr(str) {
  return str.replace(/^\s+|\s+$/g,'');
}
function keyValueDivs(){
	foundDivs=document.getElementsByTagName('div');
	var parentWidth;
	var widestKey=0;
	var tallestDiv=0;
	var tallestKey=0;
	var tallestValue=0;
	for(i=0;i<foundDivs.length;i++){
		if(foundDivs[i].className=='firstkey'||foundDivs[i].className=='key'||foundDivs[i].className=='lastkey'){
			keyWidth=foundDivs[i].offsetWidth;
			keyHeight=foundDivs[i].offsetHeight;
			if(keyWidth>=widestKey){
				widestKey=keyWidth;
			}
			if(keyHeight>=tallestKey){
				tallestKey=keyHeight;
			}
		}
		if(foundDivs[i].className=='firstvalue'||foundDivs[i].className=='value'||foundDivs[i].className=='lastvalue'){
			valueHeight=foundDivs[i].offsetHeight;
			if(valueHeight>=tallestValue){
				tallestValue=valueHeight;
			}
		}
		parentWidth=foundDivs[i].parentElement.offsetWidth;
	}
	if(tallestKey>=tallestValue){
		tallestDiv=tallestKey;
	}else{
		tallestDiv=tallestValue;
	}
	for(i=0;i<foundDivs.length;i++){
		if(foundDivs[i].className=='firstkey'||foundDivs[i].className=='key'||foundDivs[i].className=='lastkey'){
			foundDivs[i].style.cssText='width:'+widestKey+'px;min-height:'+tallestDiv+'px;';
		}
		if(foundDivs[i].className=='firstvalue'||foundDivs[i].className=='value'||foundDivs[i].className=='lastvalue'){
			foundDivs[i].style.cssText='width:'+(850-widestKey)+'px;min-height:'+tallestDiv+'px;';
		}
	}
}
var client;
function writeSelector(sl){
	var getXML=new ajaxGetXML('./sample.xml');
	var xmlData=getXML.responseXML;
	var clients=new Array();
	document.getElementById('infoDiv').innerHTML='';
	var serviceLines=xmlData.getElementsByTagName(sl);
	var options='<option value="none">Choose Client</option>';
	for(var i=0;i<serviceLines.length;i++){
		clients.push(serviceLines[i].getElementsByTagName('client')[0].firstChild.nodeValue);
	}
	for(var c=0;c<clients.length;c++){
		options=options+'<option value="'+clients[c]+'">'+clients[c]+'</option>';
	}
	var selector='<select id="selector'+sl+'" onchange="showParameters(\''+sl+'\');">'+
	options+
	'</select>';
	document.getElementById('radio'+sl).checked=true;
	if(sl=='reo'){
		document.getElementById('radiopp').checked=false;
	}else{
		document.getElementById('radioreo').checked=false;
	}
	var jsSelector=document.getElementById('selector');
	jsSelector.style.display='inline-block';
	jsSelector.innerHTML=selector;
}
function showParameters(sl){
	var getXML=new ajaxGetXML('./sample.xml');
	var xmlData=getXML.responseXML;
	client=document.getElementById('selector'+sl).value;
	var infoDiv=document.getElementById('infoDiv');
	var clientMatch;
	var initialtasksList=new Array();
	var allowabletasksList=new Array();
	var allowableamountList=new Array();
	var allowablestipulationsList=new Array('');
	var bidtasksList=new Array();
	var allowableAmountBuffer='';
	var divDiscern='';
	if(client=='none'){
		infoDiv.innerHTML='';
		infoDiv.style.display='none';
		return;
	}else{
		var clientTags=xmlData.getElementsByTagName('client');
		var initialtasksTags=xmlData.getElementsByTagName('initialtasks');
		var allowabletasksTags=xmlData.getElementsByTagName('allowabletasks');
		var allowableamountTags=xmlData.getElementsByTagName('allowableamount');
		var allowablestipulationsTags=xmlData.getElementsByTagName('allowablestipulations');
		var bidtasksTags=xmlData.getElementsByTagName('bidtasks');
		var infoDivOutput='';
		for(var i=0;i<clientTags.length;i++){
			if(clientTags[i].parentNode.nodeName==sl){
				if(client==clientTags[i].firstChild.nodeValue){
					clientMatch=clientTags[i].firstChild.nodeValue;
				}
			}
		}
		if(sl!=='pp'){
			for(var i=0;i<initialtasksTags.length;i++){
				if(IE==true){
					clientSample=initialtasksTags[i].parentNode.firstChild.firstChild.nodeValue;
				}else{
					clientSample=initialtasksTags[i].parentNode.firstChild.nextSibling.firstChild.nodeValue;
				}
				if(initialtasksTags[i].parentNode.nodeName==sl){
					if(client==clientSample){
						if(initialtasksTags[i].nodeType==1&&initialtasksTags[i].hasChildNodes()){
							initialtasksList.push(initialtasksTags[i].firstChild.nodeValue);
						}
					}
				}
			}
		}
		for(var i=0;i<allowabletasksTags.length;i++){
			if(IE==true){
				clientSample=allowabletasksTags[i].parentNode.firstChild.firstChild.nodeValue;
			}else{
				clientSample=allowabletasksTags[i].parentNode.firstChild.nextSibling.firstChild.nodeValue;
			}
			if(allowabletasksTags[i].parentNode.nodeName==sl){
				if(client==clientSample){
					if(allowabletasksTags[i].nodeType==1&&allowabletasksTags[i].hasChildNodes()){
						allowabletasksList.push(allowabletasksTags[i].firstChild.nodeValue);
					}
				}
			}
		}
		for(var i=0;i<allowableamountTags.length;i++){
			if(IE==true){
				clientSample=allowableamountTags[i].parentNode.firstChild.firstChild.nodeValue;
			}else{
				clientSample=allowableamountTags[i].parentNode.firstChild.nextSibling.firstChild.nodeValue;
			}
			if(allowableamountTags[i].parentNode.nodeName==sl){
				if(client==clientSample){
					if(allowableamountTags[i].nodeType==1&&allowableamountTags[i].hasChildNodes()){
						allowableamountList.push(allowableamountTags[i].firstChild.nodeValue);
					}
				}
			}
		}
		for(var i=0;i<allowablestipulationsTags.length;i++){
			if(IE==true){
				clientSample=allowablestipulationsTags[i].parentNode.firstChild.firstChild.nodeValue;
			}else{
				clientSample=allowablestipulationsTags[i].parentNode.firstChild.nextSibling.firstChild.nodeValue;
			}
			if(allowablestipulationsTags[i].parentNode.nodeName==sl){
				if(client==clientSample){
					if(allowablestipulationsTags[i].nodeType==1&&allowablestipulationsTags[i].hasChildNodes()){
						allowablestipulationsList.push(allowablestipulationsTags[i].firstChild.nodeValue);
					}
				}
			}
		}
		for(var i=0;i<bidtasksTags.length;i++){
			if(IE==true){
				clientSample=bidtasksTags[i].parentNode.firstChild.firstChild.nodeValue;
			}else{
				clientSample=bidtasksTags[i].parentNode.firstChild.nextSibling.firstChild.nodeValue;
			}
			if(bidtasksTags[i].parentNode.nodeName==sl){
				if(client==clientSample){
					if(bidtasksTags[i].nodeType==1&&bidtasksTags[i].hasChildNodes()){
						bidtasksList.push(bidtasksTags[i].firstChild.nodeValue);
					}
				}
			}
		}
	}
	if(sl!=='pp'){
		infoDivOutput=infoDivOutput+'<div class="firstkey" id="itk">Initial Tasks:</div>'+
		'<div class="firstvalue" id="itv">';
		for(var i=0;i<initialtasksList.length;i++){
			infoDivOutput=infoDivOutput+'<span class="green">&#8226;</span><span>'+initialtasksList[i]+'</span><br />';
		}
		infoDivOutput=infoDivOutput+'</div>';
		divDiscern='';
	}else{
		divDiscern='first';
	}	
	infoDivOutput=infoDivOutput+'<div class="'+divDiscern+'key" id="atk">Allowable Tasks:</div>'+
	'<div class="'+divDiscern+'value" id="atv">';
	for(var i=0;i<allowabletasksList.length;i++){
		infoDivOutput=infoDivOutput+'<span class="green">&#8226;</span><span>'+allowabletasksList[i]+'</span><br />';
	}
	infoDivOutput=infoDivOutput+'</div>';
	infoDivOutput=infoDivOutput+'<div class="key" id="aak">Allowable Amount:<br />';
	for(var i=0;i<allowablestipulationsList.length;i++){
		if(trimStr(allowablestipulationsList[i])!==''){
			infoDivOutput=infoDivOutput+' ('+trimStr(allowablestipulationsList[i])+')<br />';
			allowableAmountBuffer='<br />';
		}
	}
	infoDivOutput=infoDivOutput+'</div>'+
	'<div class="value" id="aav">'+allowableAmountBuffer;
	for(var i=0;i<allowableamountList.length;i++){
		if(isNaN(allowableamountList[i])){
				infoDivOutput=infoDivOutput+'<span class="yellow">&#8226;</span><span>'+allowableamountList[i]+'</span><br />';
		}else{
			infoDivOutput=infoDivOutput+'<span class="yellow">&#8226;</span><span>$'+parseInt(allowableamountList[i],10).toFixed(2)+'</span><br />';
		}
	}
	infoDivOutput=infoDivOutput+'</div>';
	infoDivOutput=infoDivOutput+'<div class="lastkey" id="btk">Bid Tasks:</div>'+
	'<div class="lastvalue" id="btv">';
	for(var i=0;i<bidtasksList.length;i++){
		infoDivOutput=infoDivOutput+'<span class="red">&#8226;</span><span>'+bidtasksList[i]+'</span><br />';
	}
	infoDivOutput=infoDivOutput+'</div>'+
	'<div style="width:100%; clear:both;"><a href="javascript:void(0)" onclick="window.open(\'/VCC/xml/Pool_Parameters.xml\',\'XML\',\'menubar=no,toolbar=no,location=no,scrollbars=yes,height=600,width=1024\');">Data Source</a>'+
	'<div>';
	
	infoDiv.style.display='inline-block';
	infoDiv.innerHTML=infoDivOutput;
	keyValueDivs();
}
