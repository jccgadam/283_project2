var conn=require('./conn');
var vms=[];
var h=new Object();
function getAllIO(req,res){
	var vmSQL="select DISTINCT (vmName) from vmlogs where vmType='HostSystem'ORDER BY vmName;";
	
	
	conn.fetchData(vmSQL,function(error,rows){
		
		//console.log(rows.length);
		for (var i=0;i<rows.length;i++)
		{
		vms[i]=rows[i].vmName;
					}
		

		
	for(var  i=0;i<vms.length;i++){
		
		var name=vms[i];
	    
	
		var memSQL="select value ,vmName from vmlogs where groupInfo='IO' and vmName='"+name+"'ORDER BY timestamp";
			  
	conn.fetchData(memSQL,function(error,mems){
		console.log(mems);
		var tmp=[];
		var name="";
		name=mems[0].vmName;	
		
		for(var j=0;j<mems.length;j++)
		{
			tmp[j]=mems[j].value;
		    
		}
		
		console.log(name);
		
		h[''+name+'']=tmp;
		console.log(h[''+name+'']);
		//console.log(h['T06_VM01_Ubn01']);	
		//console.log(h[''+name+'']);
	    	
		
	});
	
} 
	res.render('vhCpu',{
		 h:h,
		 vms:vms
	});
	
	});
}


exports.getAllIO=getAllIO;