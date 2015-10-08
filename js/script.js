window.onload = function () 
{
	
	var listadoActividades = [];
	var elementos = [ "actividades"];
	var resultadoBusca = []; //Gurda los usuarios que cumplen con el criterio de búsqueda...
	//Constructor Persona...
	//Expresada...
	listadoActividades = [];
	var indEdita = -1; //El índice de Edición...
	function actividad(na)
	{
		this.nombreactividad = na;
		
		//Para devolver los datos del usuario a ser impresos...
		this.imprime = function()
		{
			return [
						
						this.nombreactividad
						
					];
		}
	}

	//Para cargar la información de localStorage...
	if(localStorage.getItem("listado"))
	{
		var objTMP = eval(localStorage.getItem("listado"));
		var  na ="";
		for(var i in objTMP)
		{
			var na = objTMP[i].nombreactividad;
			var nuevaActividad = new actividad(na);
			listadoActividades.push(nuevaActividad);
		}
	}

	imprimeActividades();
	//Impreme las actividades en la pantalla
		function imprimeActividades()
	{
		var muestra = true;
		var txt = "<table class = 'table-fill'>";
			txt += "<thead><tr><th>Nombre de la actividad</th>";
			txt += "<th>Eliminar</th></tr></thead>";
			txt += "<tbody class = 'table-hover'>";
		for(var i = 0; i < listadoActividades.length; i++)
		{
			muestra = true;
			for(var c in resultadoBusca)
			{
				if(resultadoBusca[c] === i)
				{
					muestra = false;
				}
			}
			if(muestra)
			{
				txt += "<tr>";
				var datosActividad = listadoActividades[i].imprime();
				for(var c = 0; c < datosActividad.length; c++)
				{
					txt += "<td><center>"+(datosActividad[c])+"</center></td>";
				}
				//Eliminar...
				txt += "<td><center>";
				txt += "<img src = 'img/eliminar.png' border = '0' id = 'd_"+i+"'/>";
				txt += "</center</td>";
				txt += "</tr>";
			}
		}
		txt += "</tbody></table>";
		nom_div("imprime").innerHTML = txt;

		//Poner las acciones de editar y eliminar...
		for(var i = 0; i < listadoActividades.length; i++)
		{
			muestra = true;
			for(var c in resultadoBusca)
			{
				if(resultadoBusca[c] === i)
				{
					muestra = false;
				}
			}
			if(muestra)
			{
				//Eliminar...
				nom_div("d_" + i).addEventListener('click', function(event)
				{
					var ind = event.target.id.split("_");
					
					if(confirm("¿Está segur@ de realizar está acción?"))
					{
						
						listadoActividades.splice(ind,1);
						imprimeActividades(listadoActividades);
						localStorage.setItem("listado", JSON.stringify(listadoActividades));
					}
				});
			}
		}
	}
	//Dada la identificación, buscar la posición donde se encuentra almacenado...
	var buscaIndice = function(id)
	{
		var indice = -1;
		for(var i in listadoActividades)
		{
			if(listadoActividades[i].identificacion === id)
			{
				indice = i;
				break;
			}
		}
		return indice;
	}

	//Limpia los campos del formulario...
	var limpiarCampos = function()
	{
		for(var i = 0; i < elementos.length; i++)
		{
			nom_div(elementos[i]).value = "";	
		}
	}
	//Acciones sobre el botón guardar...
	nom_div("guarda").addEventListener('click', function(event)
	{
		var correcto = true;
		var valores = [];
		for(var i = 0; i < elementos.length; i++)
		{
			if(nom_div(elementos[i]).value === "")
			{
				alert("Digite todos los campos");
				nom_div(elementos[i]).focus();
				correcto = false;
				break;
			}
			else
			{
				valores[i] = nom_div(elementos[i]).value;
			}
		}
	
	if(correcto)
	{
		
			
				if(valores[0])
				{	
					
					var nuevaActividad = new actividad(valores[0], valores[1]);
					listadoActividades.push(nuevaActividad);
					
				}
					else
				{
					listadoActividades[indEdita].identificacion = valores[0];
					listadoActividades[indEdita].nombreactividad = valores[1];
				}
					localStorage.setItem("listado", JSON.stringify(listadoActividades));
					imprimeActividades();
					limpiarCampos();
			
			
	}
	});
	//Para la acción de buscar...
	
	//Accedera los elementos de HTML...
	function nom_div(div)
	{
		return document.getElementById(div);
	}

}