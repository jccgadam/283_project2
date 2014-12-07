var conn=require('./conn');
var vms=[];
var h=new Object();
var h2=new Object();
function getAllIw(req,res){
	var vmSQL="select DISTINCT (vmName) from vmlogs where vmType='HostSystem'ORDER BY vmName;";
	
	
	conn.fetchData(vmSQL,function(error,rows){
		
		//console.log(rows.length);
		for (var i=0;i<rows.length;i++)
		{
		vms[i]=rows[i].vmName;
					}
		

		
	for(var  i=0;i<vms.length;i++){
		
		name=vms[i];
	    
	
		var memSQL="select value ,vmName from vmlogs where groupInfo='datastore' and nameInfo='write' and vmName='"+name+"'ORDER BY timestamp";
			  
	conn.fetchData(memSQL,function(error,mems){
		var tmp=[];
		var name="";
		name=mems[0].vmName;	
		
		for(var j=0;j<mems.length;j++)
		{
			tmp[j]=mems[j].value;
		    
		}
		
		
		
		h[''+name+'']=tmp;
		
		//console.log(h['T06_VM01_Ubn01']);	
		//console.log(h[''+name+'']);
	    	
		
	});
	
} 
	res.render('vhiw',{
		 h:h,
		 vms:vms
	});
	
	});
}
function getAllIwH(req,res){
	var vmSQL="select DISTINCT (vmName) from vmlogshourly where vmType='HostSystem'ORDER BY vmName;";
	
	
	conn.fetchData(vmSQL,function(error,rows){
		
		//console.log(rows.length);
		for (var i=0;i<rows.length;i++)
		{
		vms[i]=rows[i].vmName;
					}
		

		
	for(var  i=0;i<vms.length;i++){
		
		name=vms[i];
	    
	
		var memSQL="select value ,vmName from vmlogshourly where groupInfo='datastore' and nameInfo='write' and vmName='"+name+"'ORDER BY timestamp";
			  
	conn.fetchData(memSQL,function(error,mems){
		var tmp=[];
		var name="";
		name=mems[0].vmName;	
		
		for(var j=0;j<mems.length;j++)
		{
			tmp[j]=mems[j].value;
		    
		}
		
		
		
		h2[''+name+'']=tmp;
		
		//console.log(h['T06_VM01_Ubn01']);	
		//console.log(h[''+name+'']);
	    	
		
	});
	
} 
	res.render('vhiwh',{
		 h2:h2,
		 vms:vms
	});
	
	});
}
exports.getAllIwH=getAllIwH;
exports.getAllIw=getAllIw;