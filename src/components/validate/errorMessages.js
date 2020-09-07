const moment = require('moment');

exports.joiMsgError = (err) => {
	console.log({ ERROR_TYPE: err.type });
	switch (err.type) {
		//Error de String
		case "string.base":
			err.message = `${err.context.label}: Debe ser una cadena de texto!`;
			break;
		case "any.base":
			err.message = `${err.context.label}: Debe ser una cadena de texto!`;
			break;
		case "any.empty":
			err.message = `${err.context.label}: No puede estar vacío!`;
			break;
		case "string.empty":
			err.message = `${err.context.label}: No puede estar vacío!`;
			break;
		case "string.min":
			err.message = `${err.context.label}: Debe tener un mínimo de ${err.context.limit} caracteres!`;
			break;
		case "string.max":
			err.message = `${err.context.label}: Debe tener un máximo de ${err.context.limit} caracteres!`;
			break;
		case "string.required":
			err.message = `${err.context.label}: Es requerido!`;
			break;
		case "string.alphanum":
			err.message = `${err.context.label}: Requiere que el valor de la cadena solo contenga az, AZ y 0-9!`;
			break;
		case "string.base64":
			err.message = `${err.context.label}: Requiere que el valor de la cadena sea una cadena base64 válida!`;
			break;
		case "string.creditCard":
			err.message = `${err.context.label}: No corresponde con una numero de tarjeta de crédito`;
			break;
		case "string.dataUri":
			err.message = `${err.context.label}: Requiere que el valor sea una cadena de URI!`;
			break;
		case "string.domain":
			err.message = `${err.context.label}: Requiere que el valor sea un domminio válido!`;
			break;
		case "string.email":
			err.message = `${err.context.label}: No es un email válido!`;
			break;
		case "string.guid":
			err.message = `${err.context.label}: No es un guid válido!`;
			break;
		case "string.hex":
			err.message = `${err.context.label}: No es una cadena hexadecimal válida!`;
			break;
		case "string.insensitive":
			err.message = `${err.context.label}: Debe ser una cadena de texto!`;
			break;
		case "string.ip":
			err.message = `${err.context.label}: No es una IP válida!`;
			break;
		case "string.hostname":
			err.message = `${err.context.label}: No es un nombre de host válido!`;
			break;
		case "string.isoDate":
			err.message = `${err.context.label}: No es una fecha válida (ISO 8601)!`;
			break;
		case "string.isoDuration":
			err.message = `${err.context.label}: No tiene un formato de duración válido (ISO 8601)!`;
			break;
		case "string.length":
			err.message = `${err.context.label}: Debe tener una logitud menor a ${err.context.limit}`;
			break;
		case "string.lowercase":
			err.message = `${err.context.label}: La cadena debe estar en minúsculas`;
			break;
		case "string.token":
			err.message = `${err.context.label}: Solo puede contener ('a-z', 'A-Z', 0-9, '_' ) !`;
			break;
		case "string.trim":
			err.message = `${err.context.label}: No puede poser espacios en blanco al inicio ni al final!`;
			break;
		case "string.uppercase":
			err.message = `${err.context.label}: Debe estar en mayúsculas!`;
			break;
		case "string.uri":
			err.message = `${err.context.label}: No es una URI válida!`;
			break;
		case "string.pattern.base":
			err.message = `${err.context.label}: Contiene valores invalidos!`;
			break;

		//Errores de Números
		case "number.base":
			err.message = `${err.context.label}: Debe ser del tipo numérico!`;
			break;
		case "number.min":
			err.message = `${err.context.label}: Debe ser como mínimo ${err.context.limit}!`;
			break;
		case "number.max":
			err.message = `${err.context.label}: Debe ser como máximo ${err.context.limit}!`;
			break;
		case "number.required":
			err.message = `${err.context.label}: Es requerido!`;
			break;
		case "number.positive":
			err.message = `${err.context.label}: Solo acepta números positivos!`;
			break;
		case "number.precision":
			err.message = `${err.context.label}: Solo acepta ${err.context.limit} decimales!`;
			break;
		case "number.less":
			err.message = `${err.context.label}: Debe ser menor al número ${err.context.limit}!`;
			break;
		case "number.negative":
			err.message = `${err.context.label}: Solo acepta número negativos!`;
			break;
		case "number.port":
			err.message = `${err.context.label}: Debe ser un puerto TCP y debe estar dentro del rango [0 , 65535]!`;
			break;
		case "number.greater":
			err.message = `${err.context.label}: El número debe ser mayor al número ${err.context.limit}!`;
			break;
		case "number.integer":
			err.message = `${err.context.label}: El número debe ser entero sin decimales!`;
			break;
		case "number.unsafe":
			err.message = `${err.context.label} no es un numero seguro`;
			break;

		//Errores de Objetos (Jsonb)
		case "object.and":
			err.message = `contiene [${err.context.present.join(', ')}] pero falta [${err.context.missingWithLabels.join(', ')}]!`;
			break;
		case "object.child":
			err.message = `${err.context.label}: La referencia ${err.path[2]} es requerida!!`;
			break;
		case "object.instance":
			err.message = `${err.context.label}: No es de la instancia correcta!`;
			break;
		case "object.keys":
			err.message = `${err.context.label}: ${err.path[2]} es requerido!`;
			break;
		case "object.length":
			err.message = `${err.context.label}: Debe tener una longitud menor o igual a ${err.context.limit}`;
			break;
		case "object.max":
			err.message = `${err.context.label}: Debe tener máximo ${err.context.limit} elemento`;
			break;
		case "object.min":
			err.message = `${err.context.label}: Debe ser un puerto TCP y debe estar dentro del rango [0 , 65535]!`;
			break;
		case "object.nand":
			err.message = `${err.context.label}:  No permite la existencia de ['${err.context.peers}'] cuando está presente ['${err.context.main}']`;
			break;
		case "object.base":
			err.message = `${err.context.label}: Debe ser un objeto!`;
			break;
		case "object.allowUnknown":
			err.message = `${err.context.label}: No está permitido`;
			break;
		case "object.unknown":
			err.message = `${err.context.label}: No está permitido`;
			break;
		/*case "object.or":
			err.message = `${err.path[0]}: El número debe ser entero sin decimales!`;
			break;
		case "object.oxor":
			err.message = `${err.path[0]}: Debe tener un mínimo de ${err.context.limit} números!`;
			break;
		case "object.pattern":
			err.message = `${err.path[0]}: Debe tener un máximo de ${err.context.limit} números!`;
			break;
		case "object.ref":
			err.message = `${err.path[0]}: Es requerido!`;
			break;
		case "object.rename":
			err.message = `${err.path[0]}: Debe ser menor al número ${err.context.limit}!`;
			break;
		case "object.schema":
			err.message = `${err.path[0]}: Solo acepta número negativos!`;
			break;
		case "object.with":
			err.message = `${err.path[0]}: El número debe ser mayor al número ${err.context.limit}!`;
			break;
		case "object.without":
			err.message = `${err.path[0]}: El número debe ser entero sin decimales!`;
			break;
		case "object.xor":
			err.message = `${err.path[0]}: Debe tener un mínimo de ${err.context.limit} números!`;
			break;
		case "object.assert":
			err.message = `${err.path[0]}: Debe tener un mínimo de ${err.context.limit} números!`;
			break;*/

		//Errores de Fecha
		case "date.greater":
			err.message = `${err.context.label}: Debe ser mayor a ${moment(err.context.limit).format('YYYY-MM-DD')}!`;
			break;
		case "date.isoDate":
			err.message = `${err.context.label}: ${moment(err.context.value)} no corresponde al formato ISO 8601!`;
			break;
		case "date.less":
			err.message = `${err.context.label}: No puede ser menor que ${moment(err.context.limit).format("YYYY-MM-DD")}`;
			break;
		case "date.max":
			err.message = `${err.context.label}: No puede ser mayor que ${moment(err.context.limit).format("YYYY-MM-DD")}`;
			break;
		case "date.min":
			err.message = `${err.context.label}: No puede ser menor que ${moment(err.context.limit).format("YYYY-MM-DD")}`;
			break;
		case "date.format":
			err.message = `${err.context.label}: Formato debe ser timestamp o estar expresada en milisegundos`;
			break;
		case "date.base":
			err.message = `${err.context.label}: Debe ser una fecha!`;
			break;
		/*case "date.timestamp":
			err.message = `${err.path[0]}: Es requerido!`;
			break;*/

		//Errores de array
		case "array.has":
			err.message = `${err.context.label}: Uno de los valores de la matriz no es válido!`;
			break;
		case "array.length":
			err.message = `${err.context.label}: El tamaño de la matriz debe ser menor que ${err.context.limit}!`;
			break;
		case "array.max":
			err.message = `${err.context.label}: Debe tener un máximo de ${err.context.limit} elemento(s)!`;
			break;
		case "array.min":
			err.message = `${err.context.label}: Debe tener un mínimo de ${err.context.limit} elemento(s)!`;
			break;
		case "array.ordered":
			err.message = `${err.context.label}: Error en el orden de la matríz!`;
			break;
		case "array.single":
			err.message = `${err.context.label}: Solo acepta números positivos!`;
			break;
		case "array.sort":
			err.message = `${err.context.label}: No cumple con el orden especificado!`;
			break;
		case "array.unique":
			err.message = `${err.context.label}: contiene valores repetidos!`;
			break;
		case "array.base":
			err.message = `${err.context.label}: Debe contener por lo menos un elemento!`;
			break;

		// Errors de any
		case "any.base":
			err.message = `${err.context.label}: Debe ser del tipo ${error.type}!`;
			break;
		case "any.required":
			err.message = `${err.context.label}: Es requerido!`;
			break;
		case "any.allowOnly":
			err.message = `${err.context.label}: Solo son permitidos los siguientes valores/tipos: [${err.context.valids.join(', ')}]!`;
			break;
		case "any.empty":
			err.message = `${err.context.label}: No se permite vacio!`;
			break;
		case "any.invalid":
			err.message = `${err.context.label} contiene un valor invalido`;
			break;
		case "any.only":
			console.log(err);
			err.message = `${err.context.label} contiene un valor invalido [${err.context.value}]`;
			break;
		default:
			err.message = "Error de Validación, verifique los datos ingresados"
			break;

	}
	return err.message;
}