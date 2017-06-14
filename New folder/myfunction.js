var cur = null;
var SOLVED = 0;
var TRIALS = 0;
var values = new Array('A','B','C','D','E','F','G','H');
var data = new Array(16);
var position = new Array(16);
var i = 0;

function my_game()
{
	var ids = new Array();
	var i = 0;
	for(i = 0; i < 16;i++)
	{
		ids.push(Math.floor(i/4) + '' + Math.floor(i%4));
		position[i] = Math.floor(i/4) + '' + Math.floor(i%4);
	}
	var placed = new Array();
	var id_1 = null;
	var id_2 = null;
	var index_1 = 0;
	var index_2 = 0;
	
	for(i = 0; i < 8;i++)
	{
		index_1 = Math.floor(Math.random()*ids.length);
		index_2 = Math.floor(Math.random()*ids.length);
		
		if(index_1 != index_2 )
		{
			id_1 = ids[index_1];
			id_2 = ids[index_2];
		}
		else
		{
			i--;
			placed.pop();
			continue;
		}
		
		data[position.indexOf(id_1 + '')] = values[i];
		data[position.indexOf(id_2 + '')] = values[i];
	
		
		
		ids.splice(ids.indexOf(id_1),1);
		ids.splice(ids.indexOf(id_2),1);
		
	}
	i = 16;
}


function show(ele)
{
	if(cur == null)
	{
		$('#' + ele.id).css('transform','rotateY(180deg)');
		$('#' + ele.id + '> #back').html(data[position.indexOf(ele.id)] + '');
		cur = new Array(data[position.indexOf(ele.id)] + '', ele.id + '');
		TRIALS +=1;
	}
	else
	{
		if(cur[1] != ele.id)
		{
			document.getElementById(ele.id + '').style = '';
			$('#' + ele.id).css('transform','rotateY(180deg)');
			$('#' + ele.id + '> #back').html(data[position.indexOf(ele.id)] + '');
			for(i = 0;i < position.length;i++)
			{
				$('#' + position[i]).attr("onclick","");
			}
			if(cur[0] == data[position.indexOf(ele.id)])
			{
				SOLVED +=1;
				setTimeout(function()  {
					document.getElementById('SOLVED').innerHTML = 'SOLVED: ' + SOLVED;
					document.getElementById('TRIALS').innerHTML = 'TRIALS: ' + TRIALS;
					document.getElementById(ele.id).className = 'done';
					document.getElementById(cur[1]).className = 'done';
					var temp = new Array(ele.id + '',cur[1] + '');
				for(i = 0;i < position.length;i++)
				{
					if(jQuery.inArray(position[i] + '',temp) < 0)
						$('#' + position[i]).attr("onclick","show(this)");
				}
				cur = null;
	
				},1300);
				
				data.splice(position.indexOf(ele.id),1);
				position.splice(position.indexOf(ele.id),1);
				data.splice(position.indexOf(cur[1]),1);
				position.splice(position.indexOf(cur[1]),1);
			}
		
			else
			{
				
				for(i = 0;i < position.length;i++)
				{
					document.getElementById(position[i]).onclick = function(){	};
				}
				setTimeout(function() {
				swap(cur[1],ele.id)
				},1300);
			}	
		}		
	}
	
	if(SOLVED == 8)
	{
		
		document.getElementById('SOLVED').innerHTML = 'SOLVED: ALL';
		document.getElementById('TRIALS').innerHTML = 'TRIALS: ' + TRIALS;
		var score = Math.floor((SOLVED/TRIALS)*100);
		document.getElementById('score').innerHTML = score;
		alert('CONGRATULATIONS... Your score is: ' + score);
	}
}

function swap(id_1,id_2)
{
	
	$('#' + id_1).css('transform','');
	$('#' + id_2).css('transform','');
	
	document.getElementById('SOLVED').innerHTML = 'SOLVED: ' + SOLVED;
	document.getElementById('TRIALS').innerHTML = 'TRIALS: ' + TRIALS;
	cur = null;
	
	for(i = 0;i < position.length;i++)
	{
		$('#' + position[i]).attr("onclick","show(this)");
	}
	
	setTimeout(function() {
	$('#' + id_1 + '> #back').html("");
	$('#' + id_2 + '> #back').html("");
	},1500);
}