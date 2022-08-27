# Authentication-App

Desarrollado en el frontend con html, css y **vanilla js**, aplicando conocimientos aprendidos hasta el momento sobre desarrollo web.

Integrando [Google Identity Services](https://developers.google.com/identity) para el registro de usuarios.

## Iconveniente

**Imagen del usuario de google:** Al asignar La url que se obtiene con **Google Sign in** al atributo ``src`` de la etiqueta ``<img>`` en ciertas ocación no mostraba la imagen y arrojaba el siguiente error en la consola del navegador.

```sh
Failed to load resource: the server responded with a status of 403 ()
```
Este error lo pude solucionar agreganto el atributo ``referrerpolicy="no-referrer"`` a las etiquetas ``<img>``, este atributo lo que hace es indica que nunca se envie información del origen del documento.

**Desencadenar el evento click:** Un error que surgía en los elementos con los que se interactua al dar click o tap. Le asignaba el evento click a nodo html, pero este nodo al tener otros nodos hijos dentro hacia que el evento no funcionara correctamente  ya que el evento solo funcionaba en ciertas partes donde los nodos hijos no cubrian a su nodo padre.

Este problema lo solucione desencadenando el evento haciendo que todos los nodos hijos de un nodo realizaran la misma acción que su nodo padre.
```js
 // Se indica ambas condiciones ya que "#parentNode *" hace que solo los nodos hijos ejecuten la funcion some()

 if(e.target.matches("#parentNode") || e.target.matches("#parenNode *")){
    some();
 }
```


## Pendiente
- Agregar alertas al login, registro y home con los mensajes de respusta del rest-server.
- Crear ruta y controlador upload.
- Integrar el la actualizacipon de imagen del usuario luego de crear el api upload.
