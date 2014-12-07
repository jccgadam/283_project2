var conn=require('./conn');
var vms=[];
var h=new Object();
var h2=new Object();
function getAllMem(req,res){
	var vmSQL="select DISTINCT (vmName) from vmlogs where vmType='HostSystem'ORDER BY vmName;";
	
	
	conn.fetchData(vmSQL,function(error,rows){
		
		//console.log(rows.length);
		for (var i=0;i<rows.length;i++)
		{
		vms[i]=rows[i].vmName;
					}
		

		
	for(var  i=0;i<vms.length;i++){
		
		name=vms[i];
	    
	
		var memSQL="select value ,vmName from vmlogs where groupInfo='mem' and vmName='"+name+"'ORDER BY timestamp";
			  
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
	res.render('vhMem',{
		 h:h,
		 vms:vms
	});
	
	});
}
function getAllMemH(req,res){
	var vmSQL="select DISTINCT (vmName) from vmlogshourly where vmType='HostSystem'ORDER BY vmName;";
	
	
	conn.fetchData(vmSQL,function(error,rows){
		
		//console.log(rows.length);
		for (var i=0;i<rows.length;i++)
		{
		vms[i]=rows[i].vmName;
					}
		

		
	for(var  i=0;i<vms.length;i++){
		
		name=vms[i];
	    
	
		var memSQL="select value ,vmName from vmlogshourly where groupInfo='mem' and vmName='"+name+"'ORDER BY timestamp";
			  
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
	res.render('vhMemh',{
		 h2:h2,
		 vms:vms
	});
	
	});
}
exports.getAllMemH=getAllMemH;
exports.getAllMem=getAllMem;