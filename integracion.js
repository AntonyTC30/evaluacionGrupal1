let cuentas = [
    { numeroCuenta: "02234567", cedula: "1714616123", nombre: "Juan", apellido: "Perez", saldo: 0.0 },
    { numeroCuenta: "02345211", cedula: "1281238233", nombre: "Felipe", apellido: "Caicedo", saldo: 0.0 }
]

let movimientos = [
    { numeroCuenta: "02234567", monto: 10.24, tipo: "D" },
    { numeroCuenta: "02345211", monto: 45.90, tipo: "D" },
    { numeroCuenta: "02234567", monto: 65.23, tipo: "C" },
    { numeroCuenta: "02345211", monto: 65.23, tipo: "C" },
    { numeroCuenta: "02345211", monto: 12.0, tipo: "D" },
]

let cuentaValidad = [
]

let esNuevo = false;

cargar = function () {
    mostrarComponente("divCuentas");
    ocultarComponente("divMovimientos");
    ocultarComponente("divTransacciones");
    mostrarCuentas();
    deshabilitarComponente("btnDepositar");
    deshabilitarComponente("btnRetirar");
    deshabilitarComponente("txtMonto");
    mostrarMovimientos();
}

menuCuentas = function () {
    mostrarComponente("divCuentas");
    ocultarComponente("divMovimientos");
    ocultarComponente("divTransacciones");
};

menuMovimientos = function () {
    mostrarComponente("divMovimientos");
    ocultarComponente("divCuentas");
    ocultarComponente("divTransacciones");
}
menuTransaciones = function () {
    mostrarComponente("divTransacciones");
    ocultarComponente("divCuentas");
    ocultarComponente("divMovimientos");
}

mostrarCuentas = function () {
    let cmpTabla = document.getElementById("tablaCuentas");
    let contenidoTabla = "<table><tr>" +
        "<th>NUMERO DE CUENTA</th>" +
        "<th>NOMBRE</th>" +
        "<th>SALDO</th>" +
        "</tr>";
    let elementoCuentas;
    for (let i = 0; i < cuentas.length; i++) {
        elementoCuentas = cuentas[i];
        contenidoTabla +=
            "<tr><td>" + elementoCuentas.numeroCuenta + "</td>"
            + "<td>" + elementoCuentas.nombre + " " + elementoCuentas.apellido + "</td>"
            + "<td>" + elementoCuentas.saldo + "</td>"
            + "</tr>"
    }
    contenidoTabla += "</table>"
    cmpTabla.innerHTML = contenidoTabla;
}

buscarCuenta = function (numeroCuenta) {
    let elementoCuenta;
    let cuentaoEncontrado = null;
    for (let i = 0; i < cuentas.length; i++) {
        elementoCuenta = cuentas[i];
        if (elementoCuenta.numeroCuenta == numeroCuenta) {
            cuentaoEncontrado = elementoCuenta;
            break;
        }
    }
    return cuentaoEncontrado;
}

agregarCuenta = function (cuenta) {
    let resultado;
    resultado = buscarCuenta(cuenta.numeroCuenta);
    if (resultado == null) {
        cuentas.push(cuenta);
        alert("CUENTA AGREGADA")
    } else {
        alert("CUENTA EXISTENTE");
    }
}

agregar = function () {
    let valorCuenta = recuperarTexto("txtCuenta");
    let valorCedula = recuperarInt("txtCedula");
    let valorNombre = recuperarTexto("txtNombre");
    let valorApellido = recuperarTexto("txtApellido");

    let nuevaCuenta = {};
    nuevaCuenta.numeroCuenta = valorCuenta;
    nuevaCuenta.cedula = valorCedula;
    nuevaCuenta.nombre = valorNombre;
    nuevaCuenta.apellido = valorApellido;
    nuevaCuenta.saldo = 0.0;
    agregarCuenta(nuevaCuenta);
    mostrarCuentas();
}

ejecutarBusqueda = function () {
    let cuentaBusqueda = recuperarTexto("txtBusquedaCuentaTransacion");
    let cuentaResul = buscarCuenta(cuentaBusqueda);
    if (cuentaResul == null) {
        alert("CUENTA INEXISTENTE");
    } else {
        habilitarComponente("btnDepositar");
        habilitarComponente("btnRetirar");
        habilitarComponente("txtMonto");
        return cuentaResul;
    }
}

depositar = function (numeroCuenta, monto) {
    let cuentaAfectada;
    let saldo;
    cuentaAfectada = buscarCuenta(numeroCuenta);
    cuentaAfectada.saldo += monto;
    alert("TRANSACCION EXITOSA");
    mostrarTexto("nuevoSaldo", cuentaAfectada.saldo);
}

ejecutarDeposito = function () {
    let monto = recuperarFloat("txtMonto");
    let cuenta = recuperarTexto("txtBusquedaCuentaTransacion")
    depositar(cuenta, monto);
}

retirar = function (numeroCuenta, monto) {
    let cuentaAfectada;
    cuentaAfectada = buscarCuenta(numeroCuenta);
    if (cuentaAfectada.saldo < monto) {
        alert("SALDO INSUFICIENTE");
    } else {
        cuentaAfectada.saldo -= monto;
        alert("TRANSACCION EXITOSA");
        mostrarTexto("nuevoSaldo", cuentaAfectada.saldo);
    }
};

ejecutarRetiro = function () {
    let monto = recuperarFloat("txtMonto");
    let cuenta = recuperarTexto("txtBusquedaCuentaTransacion")
    retirar(cuenta, monto);
}

ejecutarBusquedaMovimiento = function () {
    let numeroCuenta = recuperarTexto("txtbusqueda");
    filtrarMovimientos(numeroCuenta);
}

filtrarMovimientos = function (numeroCuenta) {
    let movimientosCuenta = [];
    console.log(">_ Movimientos:", movimientos)
    console.log(">_ Movimientos:", movimientos.length)

    for (let i = 0; i < movimientos.length; i++) {
        movimientosCuenta = movimientos[i];
        if (movimientosCuenta.numeroCuenta == numeroCuenta) {
            cuentaValidad.push(movimientosCuenta);
        }
    }
    mostrarMovimientos(cuentaValidad);
}

mostrarMovimientos = function (misMovimientos) {
    let montoTipo;
    let cmpTabla = document.getElementById("tablaMovimientos");
    let contenidoTabla = "<table><tr>" +
        "<th>NUMERO DE CUENTA</th>" +
        "<th>MONTO</th>" +
        "<th>TIPO</th>" +
        "</tr>";
    let elementoMovimiento;

    for (let i = 0; i < misMovimientos.length; i++) {
        elementoMovimiento = misMovimientos[i];
        if (elementoMovimiento.tipo == "C") {
            montoTipo = elementoMovimiento.monto * 1;
        } else if (elementoMovimiento.tipo == "D") {
            montoTipo = elementoMovimiento.monto * -1;
        }
        contenidoTabla +=
            "<tr><td>" + elementoMovimiento.numeroCuenta + "</td>"
            + "<td>" + montoTipo + "</td>"
            + "<td>" + elementoMovimiento.tipo + "</td>"
            + "</tr>"
    }
    contenidoTabla += "</table>"
    cmpTabla.innerHTML = contenidoTabla;
}
