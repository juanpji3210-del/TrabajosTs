"use strict";
// Ejercicios de tipos - TypeScript
// Cada sección es un ejercicio del PDF. Al final de cada una se imprime el resultado.
Object.defineProperty(exports, "__esModule", { value: true });
// ==============================================================
// 1. Gestor de tareas con estados
// ==============================================================
console.log("\n=== 1. Gestor de tareas con estados ===");
const tareas = [
    {
        id: 1,
        descripcion: "Sacar la basura",
        estaCompletada: false,
        estado: "en_progreso",
    },
    {
        id: 2,
        descripcion: "Lavar la loza",
        estaCompletada: false,
        estado: "pendiente",
    },
    {
        id: 3,
        descripcion: "Hacer el almuerzo",
        estaCompletada: true,
        estado: "finalizada",
    },
];
// Devuelve solo las tareas pendientes o en progreso
function filtrarTareasActivas(tareas) {
    return tareas.filter((tarea) => tarea.estado === "pendiente" || tarea.estado === "en_progreso");
}
console.log(filtrarTareasActivas(tareas)); // Tareas 1 y 2
// ==============================================================
// 2. Agrupación por tipo de transacción
// ==============================================================
console.log("\n=== 2. Agrupación por tipo de transacción ===");
const transacciones = [
    { monto: 1000, tipo: "ingreso", categoria: "salario" },
    { monto: 500, tipo: "ingreso", categoria: "freelance" },
    { monto: 300, tipo: "egreso", categoria: "comida" },
    { monto: 150, tipo: "egreso", categoria: "transporte" },
];
// Suma los montos agrupados por tipo
function totalPorTipo(transacciones) {
    return transacciones.reduce((totales, transaccion) => {
        totales[transaccion.tipo] += transaccion.monto;
        return totales;
    }, { ingreso: 0, egreso: 0 });
}
console.log(totalPorTipo(transacciones)); // { ingreso: 1500, egreso: 450 }
// ==============================================================
// 3. Sistema de notificaciones
// ==============================================================
console.log("\n=== 3. Sistema de notificaciones ===");
// Type narrowing: según el valor de "tipo", TS sabe qué propiedades existen
function enviarNotificacion(notificacion) {
    switch (notificacion.tipo) {
        case "email":
            console.log(`Email a ${notificacion.destinatario} | Asunto: ${notificacion.asunto}`);
            break;
        case "sms":
            console.log(`SMS a ${notificacion.telefono}: ${notificacion.mensaje}`);
            break;
        case "push":
            console.log(`Push al dispositivo ${notificacion.dispositivoId}: ${notificacion.titulo}`);
            break;
    }
}
// Callback: la función que envía se pasa por parámetro
function enviarNotificaciones(notificaciones, enviar) {
    notificaciones.forEach(enviar);
}
const notificaciones = [
    {
        tipo: "email",
        destinatario: "alejo@correo.com",
        asunto: "Bienvenido",
        cuerpo: "Gracias por registrarte",
    },
    { tipo: "sms", telefono: "3001234567", mensaje: "Tu código es 1234" },
    {
        tipo: "push",
        dispositivoId: "device-01",
        titulo: "Nuevo mensaje",
        mensaje: "Tienes un mensaje nuevo",
    },
];
enviarNotificaciones(notificaciones, enviarNotificacion);
// ==============================================================
// 4. Validación de formularios dinámicos
// ==============================================================
console.log("\n=== 4. Validación de formularios dinámicos ===");
// Un validador (callback) por cada tipo de campo
const validadores = {
    texto: (valor) => typeof valor === "string" && valor.trim().length > 0,
    numero: (valor) => typeof valor === "number" && Number.isFinite(valor),
    email: (valor) => typeof valor === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor),
};
// Devuelve los nombres de los campos inválidos
function obtenerCamposInvalidos(campos) {
    return campos
        .filter((campo) => !validadores[campo.tipo](campo.valor))
        .map((campo) => campo.nombre);
}
const campos = [
    { nombre: "nombre", tipo: "texto", valor: "Alejo" },
    { nombre: "edad", tipo: "numero", valor: "veinte" }, // inválido
    { nombre: "correo", tipo: "email", valor: "alejo.correo.com" }, // inválido
    { nombre: "apellido", tipo: "texto", valor: "   " }, // inválido
];
console.log(obtenerCamposInvalidos(campos)); // ["edad", "correo", "apellido"]
// ==============================================================
// 5. Historial de cambios de usuario
// ==============================================================
console.log("\n=== 5. Historial de cambios de usuario ===");
function resumirCambios(cambios) {
    return cambios.reduce((resumen, cambio) => {
        resumen[cambio.tipo] += 1;
        return resumen;
    }, { nombre: 0, correo: 0, "contraseña": 0 });
}
const historial = [
    {
        tipo: "nombre",
        valorAnterior: "Alejo",
        valorNuevo: "Alejandro",
        fecha: new Date("2025-01-10"),
    },
    {
        tipo: "correo",
        valorAnterior: "a@correo.com",
        valorNuevo: "b@correo.com",
        fecha: new Date("2025-02-01"),
    },
    { tipo: "contraseña", fecha: new Date("2025-02-15") },
    { tipo: "contraseña", fecha: new Date("2025-03-20") },
];
console.log(resumirCambios(historial)); // { nombre: 1, correo: 1, contraseña: 2 }
// ==============================================================
// 6. Sistema de calificaciones por categoría
// ==============================================================
console.log("\n=== 6. Sistema de calificaciones por categoría ===");
const categorias = ["tareas", "quices", "examen"];
function calcularPromedio(notas) {
    if (notas.length === 0) {
        return 0;
    }
    return notas.reduce((acc, nota) => acc + nota, 0) / notas.length;
}
function promedioPorCategoria(calificaciones, estudianteId) {
    const delEstudiante = calificaciones.filter((calificacion) => calificacion.estudianteId === estudianteId);
    return categorias.reduce((promedios, categoria) => {
        const notas = delEstudiante
            .filter((calificacion) => calificacion.categoria === categoria)
            .map((calificacion) => calificacion.nota);
        promedios[categoria] = calcularPromedio(notas);
        return promedios;
    }, { tareas: 0, quices: 0, examen: 0 });
}
const calificaciones = [
    { estudianteId: 1, materia: "Matemáticas", categoria: "tareas", nota: 4 },
    { estudianteId: 1, materia: "Matemáticas", categoria: "tareas", nota: 5 },
    { estudianteId: 1, materia: "Matemáticas", categoria: "quices", nota: 3 },
    { estudianteId: 1, materia: "Matemáticas", categoria: "examen", nota: 4.5 },
    { estudianteId: 2, materia: "Matemáticas", categoria: "examen", nota: 2 },
];
console.log(promedioPorCategoria(calificaciones, 1));
// { tareas: 4.5, quices: 3, examen: 4.5 }
// ==============================================================
// 7. Control de stock con reglas personalizadas
// ==============================================================
console.log("\n=== 7. Control de stock con reglas personalizadas ===");
// Si la cantidad es menor al límite de su categoría, hay bajo stock
const limitesBajoStock = {
    alimentos: 20,
    "tecnología": 5,
    "papelería": 50,
};
function tieneBajoStock(producto) {
    return producto.cantidad < limitesBajoStock[producto.categoria];
}
// Se pasa la función como callback al filter
function obtenerProductosBajoStock(productos) {
    return productos.filter(tieneBajoStock);
}
const productos = [
    { id: 1, nombre: "Arroz", cantidad: 15, categoria: "alimentos" }, // bajo
    { id: 2, nombre: "Mouse", cantidad: 10, categoria: "tecnología" },
    { id: 3, nombre: "Portátil", cantidad: 3, categoria: "tecnología" }, // bajo
    { id: 4, nombre: "Cuadernos", cantidad: 60, categoria: "papelería" },
];
console.log(obtenerProductosBajoStock(productos)); // Arroz y Portátil
// ==============================================================
// 8. Filtro avanzado de usuarios
// ==============================================================
console.log("\n=== 8. Filtro avanzado de usuarios ===");
// Mayor de edad + activo + que no sea visitante
function filtrarUsuarios(usuarios) {
    return usuarios.filter((usuario) => usuario.edad >= 18 && usuario.estaActivo && usuario.rol !== "visitante");
}
const usuarios = [
    { nombre: "Alejo", edad: 23, estaActivo: true, rol: "admin" },
    { nombre: "Pepe", edad: 17, estaActivo: true, rol: "editor" }, // menor
    { nombre: "Juan", edad: 30, estaActivo: false, rol: "editor" }, // inactivo
    { nombre: "Maria", edad: 25, estaActivo: true, rol: "visitante" }, // visitante
    { nombre: "Laura", edad: 28, estaActivo: true, rol: "editor" },
];
console.log(filtrarUsuarios(usuarios)); // Alejo y Laura
// ==============================================================
// 9. Conversor de unidades tipado
// ==============================================================
console.log("\n=== 9. Conversor de unidades tipado ===");
// Cuántos metros equivale una unidad
const metrosPorUnidad = {
    cm: 0.01,
    m: 1,
    km: 1000,
};
// Type guard: valida en tiempo de ejecución que un valor sea una unidad válida
function esUnidadLongitud(valor) {
    return (typeof valor === "string" && Object.keys(metrosPorUnidad).includes(valor));
}
// Versión tipada: TS ya garantiza que las unidades son válidas
function convertir(valor, desde, hasta) {
    if (!Number.isFinite(valor)) {
        throw new Error("El valor a convertir debe ser un número finito");
    }
    const enMetros = valor * metrosPorUnidad[desde];
    const resultado = enMetros / metrosPorUnidad[hasta];
    // Evita errores de punto flotante (ej: 0.1 + 0.2)
    return Number(resultado.toFixed(10));
}
// Versión para datos que vienen de fuera (formularios, APIs, etc.)
function convertirDesdeTexto(valor, desde, hasta) {
    if (!esUnidadLongitud(desde)) {
        throw new Error(`Unidad de entrada inválida: "${desde}"`);
    }
    if (!esUnidadLongitud(hasta)) {
        throw new Error(`Unidad de salida inválida: "${hasta}"`);
    }
    return convertir(valor, desde, hasta);
}
console.log(convertir(150, "cm", "m")); // 1.5
console.log(convertir(2, "km", "m")); // 2000
console.log(convertir(1, "km", "cm")); // 100000
console.log(convertirDesdeTexto(500, "m", "km")); // 0.5
try {
    convertirDesdeTexto(10, "mm", "m");
}
catch (error) {
    console.log(error.message); // Unidad de entrada inválida: "mm"
}
// ==============================================================
// 10. Sistema de pagos con métodos variados
// ==============================================================
console.log("\n=== 10. Sistema de pagos con métodos variados ===");
// Devuelve los nombres de los campos que vienen vacíos
function obtenerCamposVacios(campos) {
    return Object.entries(campos)
        .filter(([, valor]) => valor.trim() === "")
        .map(([nombre]) => nombre);
}
function validarPago(pago) {
    let camposFaltantes = [];
    switch (pago.metodo) {
        case "tarjeta":
            camposFaltantes = obtenerCamposVacios({
                numeroTarjeta: pago.numeroTarjeta,
                cvv: pago.cvv,
            });
            break;
        case "transferencia":
            camposFaltantes = obtenerCamposVacios({
                banco: pago.banco,
                numeroCuenta: pago.numeroCuenta,
            });
            break;
        case "efectivo":
            // No requiere datos adicionales
            break;
    }
    return { esValido: camposFaltantes.length === 0, camposFaltantes };
}
console.log(validarPago({ metodo: "tarjeta", numeroTarjeta: "4111111111111111", cvv: "123" })); // { esValido: true, camposFaltantes: [] }
console.log(validarPago({ metodo: "tarjeta", numeroTarjeta: "4111111111111111", cvv: "" })); // { esValido: false, camposFaltantes: ["cvv"] }
console.log(validarPago({ metodo: "transferencia", banco: "", numeroCuenta: "" })); // { esValido: false, camposFaltantes: ["banco", "numeroCuenta"] }
console.log(validarPago({ metodo: "efectivo" })); // { esValido: true, camposFaltantes: [] }
