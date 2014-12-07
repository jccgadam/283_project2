var conn=require('./conn');

function getStatus(req,res){
var name=req.query.name;
var type=req.query.type;
console.log(name);
var cpusql="select value from vmlogs where groupInfo='cpu' and vmName='"+name+"'ORDER BY timestamp";
var memsql="select value from vmlogs where groupInfo='mem' and vmName='"+name+"'ORDER BY timestamp";
var netsql="select value from vmlogs where groupInfo='net' and vmName='"+name+"'ORDER BY timestamp";
var vmsql ="select DISTINCT (vmName),vmType from vmlogs ORDER BY vmName;";
var readql="select value from vmlogs where groupInfo='datastore' and nameInfo='read' and vmName='"+name+"'Order by timestamp";
var writesql="select value from vmlogs where groupInfo='datastore' and nameInfo='write' and vmName='"+name+"'Order by timestamp";

console.log(cpusql);
conn.fetchData(vmsql,function(error,rows){
	var vms=[];
	var vhost=[];
	var vmNo=0;
	var vhostNo=0;
	for (var i=0;i<rows.length;i++)
		{if(rows[i].vmType=='VirtualMachine')
		{
		 vms[vmNo]=rows[i].vmName;
		 vmNo++;          
		 }
		else
			{
			vhost[vhostNo]=rows[i].vmName;
			vhostNo++;
			}
		}
	console.log(vms);
	console.log(vhost);
conn.fetchData(cpusql,function(error,cpus){
	var cpu=[];
	for (var i=0;i<cpus.length;i++)
		{
		cpu[i]=cpus[i].value;
		
		}
	conn.fetchData(memsql,function(error,mems){
		var mem=[];
		for (var i=0;i<mems.length;i++)
		{
		mem.push(mems[i].value);
		
		}
		console.log(mem);
		conn.fetchData(netsql,function(error,nets){
			var net=[];
			for (var i=0;i<nets.length;i++)
			{
			net[i]=nets[i].value;
			
			}
			conn.fetchData(writesql,function(error,data){
				var write=[];
				for (var i=0;i<data.length;i++)
					{
					write[i]=data[i].value;
					}
				conn.fetchData(readql,function(error,data){
					var read=[];
					for (var i=0;i<data.length;i++)
					{
					read[i]=data[i].value;
					}
					
					
					res.render('status',{
						vms:vms,
						cpu:cpu,
						mem:mem,
						net:net,
						vmName:name,
						vhost:vhost,
						type:type,
						read:read,
						write:write
					});		
				})
				
				
				
			})
	
		});
	});
});
	
});
}
function getStatusH(req,res){
	var name=req.query.name;
	var type=req.query.type;
	console.log(name);
	var cpusql="select value from vmlogshourly where groupInfo='cpu' and vmName='"+name+"'ORDER BY timestamp";
	var memsql="select value from vmlogshourly where groupInfo='mem' and vmName='"+name+"'ORDER BY timestamp";
	var netsql="select value from vmlogshourly where groupInfo='net' and vmName='"+name+"'ORDER BY timestamp";
	var vmsql ="select DISTINCT (vmName),vmType from vmlogshourly ORDER BY vmName;";
	var readql="select value from vmlogshourly where groupInfo='datastore' and nameInfo='read' and vmName='"+name+"'Order by timestamp";
	var writesql="select value from vmlogshourly where groupInfo='datastore' and nameInfo='write' and vmName='"+name+"'Order by timestamp";

	console.log(cpusql);
	conn.fetchData(vmsql,function(error,rows){
		var vms=[];
		var vhost=[];
		var vmNo=0;
		var vhostNo=0;
		for (var i=0;i<rows.length;i++)
			{if(rows[i].vmType=='VirtualMachine')
			{
			 vms[vmNo]=rows[i].vmName;
			 vmNo++;          
			 }
			else
				{
				vhost[vhostNo]=rows[i].vmName;
				vhostNo++;
				}
			}
		console.log(vms);
		console.log(vhost);
	conn.fetchData(cpusql,function(error,cpus){
		var cpu=[];
		for (var i=0;i<cpus.length;i++)
			{
			cpu[i]=cpus[i].value;
			
			}
		conn.fetchData(memsql,function(error,mems){
			var mem=[];
			for (var i=0;i<mems.length;i++)
			{
			mem.push(mems[i].value);
			
			}
			console.log(mem);
			conn.fetchData(netsql,function(error,nets){
				var net=[];
				for (var i=0;i<nets.length;i++)
				{
				net[i]=nets[i].value;
				
				}
				conn.fetchData(writesql,function(error,data){
					var write=[];
					for (var i=0;i<data.length;i++)
						{
						write[i]=data[i].value;
						}
					conn.fetchData(readql,function(error,data){
						var read=[];
						for (var i=0;i<data.length;i++)
						{
						read[i]=data[i].value;
						}
						
						
						res.render('statusH',{
							vms:vms,
							cpu:cpu,
							mem:mem,
							net:net,
							vmName:name,
							vhost:vhost,
							type:type,
							read:read,
							write:write
						});		
					})
					
					
					
				})
		
			});
		});
	});
		
	});
	}



exports.getStatusH=getStatusH;
exports.getStatus=getStatus;