# Authentication-App

Rest-server desarrollado con node js y del lado del frontend con html, css y **vanilla js**, aplicando conocimientos aprendidos hasta el momento sobre desarrollo web.

Integrando [Google Identity Services](https://developers.google.com/identity) para el registro de usuarios.

Integrando el [SDK de Cloudinary](https://www.npmjs.com/package/cloudinary) que permite fácilmente la carga y administración de activos en la nube.
<br></br>
## Iconvenientes

**Imagen del usuario de google:** Al asignar la url que se obtiene con **Google Sign in** al atributo ``src`` de la etiqueta ``<img>`` en ciertas ocación no mostraba la imagen y arrojaba el siguiente error en la consola del navegador: **Failed to load resource: the server responded with a status of 403 ()**.

Este error lo pude solucionar agregando el atributo ``referrerpolicy="no-referrer"`` a las etiquetas ``<img>``, este atributo lo que hace es que indica que nunca se envie información de origen del documento.
<br></br>
**Desencadenar el evento click:** Un error que surgía en los elementos con los que se interactua al dar click o tap.

Le asignaba el evento click a  un nodo html, pero este nodo al tener otros nodos hijos dentro hacia que el evento no funcionara correctamente  ya que el evento solo funcionaba en ciertas partes donde los nodos hijos no cubrían a su nodo padre.

Este problema lo solucione desencadenando el evento haciendo que todos los nodos hijos de un nodo realizaran la misma acción que su nodo padre.
```js
 // Se indica ambas condiciones ya que "#parentNode *" hace que solo los nodos hijos ejecuten la funcion some()

 if(e.target.matches("#parentNode") || e.target.matches("#parenNode *")){
    some();
 }
```
<br></br>

## Pendiente
- ❌ Agregar alertas al login, registro y home con los mensajes de respuesta del rest-server.
- ✅ Crear ruta y controlador upload.
- ❌ Integrar el la actualizacipon de imagen del usuario luego de crear el api upload.
